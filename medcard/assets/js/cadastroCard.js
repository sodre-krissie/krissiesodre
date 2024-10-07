document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault();

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
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Pegue o texto da resposta
            throw new Error(errorText); // Lançar um erro se a resposta não for ok
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao cadastrar flashcard: ' + error.message); // Mostre a mensagem do erro
    }
});
