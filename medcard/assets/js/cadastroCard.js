document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

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
            throw new Error('Erro ao enviar dados');
        }

        const result = await response.json();
        alert(result.message); // Exibir mensagem de sucesso
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao enviar dados: ' + error.message); // Exibir mensagem de erro
    }
});
