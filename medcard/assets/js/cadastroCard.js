// /medcard/assets/js/cadastroCard.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
    const messageBox = document.getElementById('message-box'); // Para mensagens de feedback

    // Função para exibir mensagens de sucesso ou erro
    function showMessage(message, isError = false) {
        messageBox.textContent = message;
        messageBox.style.color = isError ? 'red' : 'green';
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário

        const formData = new FormData(form);
        const data = {
            disciplina: formData.get('disciplina').trim(),
            pergunta: formData.get('pergunta').trim(),
            resposta: formData.get('resposta').trim(),
        };

        // Validação de dados no frontend
        if (!data.disciplina || !data.pergunta || !data.resposta) {
            showMessage('Todos os campos são obrigatórios.', true);
            return;
        }

        try {
            const response = await fetch('/api/getData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Erro ao cadastrar os dados.');

            form.reset(); // Limpa o formulário
            showMessage('Dados cadastrados com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            showMessage('Erro ao cadastrar os dados.', true);
        }
        if (!response.ok) {
            console.error('Erro ao cadastrar os dados:', await response.text());
            throw new Error('Erro ao cadastrar os dados.');
        }
    });
});
