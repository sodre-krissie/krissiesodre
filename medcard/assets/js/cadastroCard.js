// /medcard/assets/js/cadastroCard.js

document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const disciplina = document.getElementById('disciplina').value;
    const pergunta = document.getElementById('pergunta').value;
    const resposta = document.getElementById('resposta').value;

    try {
        const response = await fetch('/api/saveFlashcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ disciplina, pergunta, resposta }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            document.getElementById('cadastro-form').reset();
        } else {
            alert(result.message || 'Erro ao cadastrar flashcard');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Erro ao enviar os dados para o servidor.');
    }
});
