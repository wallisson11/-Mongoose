const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Adress = require("../backend/model/Adress.js");

// Carrega as variáveis de ambiente do arquivo .ENV
dotenv.config();

// Cria uma instância do express -> Servidor
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // permite qualquer origem para req.
    res.header("Access-Control-Allow-Methods", "GET, POST"); // permite os métodos GET e POST
    res.header("Access-Control-Allow-Headers", "Content-Type"); // permite o cabeçalho Content-Type
    next(); // Chama o próximo middleware para permitir que a requisição prossiga
});

// JSON nas requisições / Config do express
app.use(express.json());

app.get('/api/cep/:cep', async (req, res) => {
    const { cep } = req.params; // extrai o CEP

    try {
        // Requisição GET Para a API ViaCep, passando um CEP
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`); // Corrigido o link da API
        res.json(response.data); // Retorna os dados da API
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar o CEP!" }); // Em caso de erro
    }
});

// Obtém as variáveis do .ENV
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Define o link de conexão com o MongoDB Atlas
const mongoURI = `mongodb+srv://${dbUser}:${dbPassword}@clusterapi.moiy7.mongodb.net/`;

// Porta que o servidor vai rodar
const port = 3000;

mongoose
    .connect(mongoURI) // Conecta ao banco de dados com o link gerado
    .then(() => {
        // Quando a conexão for bem-sucedida
        console.log("Conectou ao banco!");
        app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });
    })
    .catch((err) => console.log("Erro ao conectar ao MongoDB", err));
