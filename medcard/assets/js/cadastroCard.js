document.getElementById('cadastro-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const disciplina = document.getElementById('disciplina').value;
    const pergunta = document.getElementById('pergunta').value;
    const resposta = document.getElementById('resposta').value;

    try {
        const response = await fetch('/api/saveData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ disciplina, pergunta, resposta }), // Certifique-se de enviar um objeto JSON
        });

        if (!response.ok) {
            throw new Error(`Erro ao enviar dados: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Dados enviados com sucesso:', data);
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
    }
});
