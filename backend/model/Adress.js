const mongoose = require('mongoose')
// Define o modelo

const addressSchema = mongoose.Schema({
    cep: {
        type: String,
        required: true,
        unique: true,   // Garente que o Cep seja unico registro
    },
    logadouro: {
        type: String,
        required: true

    },

    bairro: {
        type: String,
        required: true
    },

    cidade: {
        type: String,
        required: true,
        MaxLength: 2,
    },

    estado: {
        type: String,
        required: true,
        MaxLength: 2, //Estado de ter no Ma
    },

}, {

    timeStamp: true // Adiciona Hora da Criação e edição
}

);

// Cria o modelo
const Address = mongoose.model("Address", addressSchema);

// exporta o modelo para ser usado
module.exports = Address;
