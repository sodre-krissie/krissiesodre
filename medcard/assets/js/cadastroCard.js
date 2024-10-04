// /medcard/assets/js/cadastroCard.js
// /medcard/assets/js/cadastroCard.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastro-form');
 
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Previne o envio padrão do formulário
 
        const formData = new FormData(form);
        const data = {
            disciplina: formData.get('disciplina'),
            pergunta: formData.get('pergunta'),
            resposta: formData.get('resposta')
        };
 
        try {
            // Alterado para enviar dados para o endpoint correto
            const response = await fetch('/api/saveData', { // Mudança aqui
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
 
            // Verifica se a resposta é ok
            if (!response.ok) throw new Error('Erro ao cadastrar os dados.');
 
            const result = await response.json();
            alert(result.message); // Exibe a mensagem de sucesso
            form.reset(); // Reseta o formulário
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar os dados.'); // Mensagem de erro padrão
        }
    });
 });
 