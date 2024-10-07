// /medcard/assets/js/cadastroCard.js
// /medcard/assets/js/cadastroCard.js
document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const formData = new FormData(event.target);
    const data = {
        disciplina: formData.get('disciplina'),
        pergunta: formData.get('pergunta'),
        resposta: formData.get('resposta'),
    };

    try {
        const response = await fetch('/api/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Enviar os dados como JSON
        });

        const result = await response.json();
        alert(result.message); // Mostrar mensagem de sucesso ou erro
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao cadastrar flashcard');
    }
});
