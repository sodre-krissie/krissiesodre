// /assets/js/cadastroCard.js
document.getElementById('cadastro-form').addEventListener('submit', async (event) => {
   event.preventDefault(); // Impede o envio padrão do formulário

   const formData = new FormData(event.target);
   const data = Object.fromEntries(formData.entries());

   try {
       const response = await fetch('/api/saveData', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(data),
       });

       if (!response.ok) {
           throw new Error('Erro ao cadastrar dados: ' + response.statusText);
       }

       alert('Dados cadastrados com sucesso!');
       event.target.reset(); // Limpa o formulário após o envio
   } catch (error) {
       console.error('Erro:', error);
   }
});
