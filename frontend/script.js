// Ao campo de CEP perder o foco, sera feito a trataviva do CEP.
document.getElementById("cep").addEventListener("blur", async function () {
    const Cep = this.value.replace(/\D/g, ""); // Remove caracteres não numéricos
 
    // Verifica se o CEP possui 8 caracteres.
    if (Cep.length !== 8) {
        alert("CEP inválido, deve ter 8 digitos!"); // Em caso de erro
        return; // Para a execução
    }
 
    try {
        // Faz uma requisição para o Backend e a consulta do CEP informado.
        const response = await fetch(`http://localhost:3000/api/cep/${Cep}`);
        if (!response.ok) { // Verifica se a resposta é OK
            throw new Error("Erro ao buscar o CEP!"); // Em caso de erro
        }
 
        const data = await response.json(); // Converte a resposta para JSON
 
        // Verifica se o CEP retornado pela API é inválido.
        if (data.erro) {
            alert("CEP não encontrado!"); // Em caso de erro
            return; // Para a execução
        }
 
        // Preenche os campos com os dados retornados pela API.
        document.getElementById("logradouro").value = data.logradouro;
        document.getElementById("bairro").value = data.bairro;
        document.getElementById("cidade").value = data.localidade;
        document.getElementById("estado").value = data.uf;
   
        // Adiciona um feedback visual, alterando a cor da borda dos campos.
        document.querySelectorAll(".form-control input").forEach((input) => {
            input.style.borderColor = "#6a11cb"; // Altera a cor da borda
        });
    } catch (error) {
        console.error("Erro ao buscar o CEP!", error); // Em caso de erro
        alert("Erro ao buscar o CEP. Verifique o console para mais detalhes"); // Em caso de erro
    }
});