// /medcard/assets/js/cadastroCard.js

document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const disciplina = document.getElementById('disciplina').value;
    const pergunta = document.getElementById('pergunta').value;
    const resposta = document.getElementById('resposta').value;

    const response = await fetch('/api/saveFlashcard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ disciplina, pergunta, resposta }),
    });

    const result = await response.json();

    if (response.ok) {
        alert(result.message); // Exibe uma mensagem de sucesso
        document.getElementById('cadastro-form').reset(); // Reseta o formulário
    } else {
        alert(result.message || 'Erro ao cadastrar flashcard'); // Exibe mensagem de erro
    }
});
