// /medcard/assets/js/cadastroCard.js
document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('cadastro-form');

   form.addEventListener('submit', async (event) => {
       event.preventDefault(); // Previne o comportamento padrão do formulário

       const formData = new FormData(form);
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
               throw new Error('Erro ao cadastrar os dados');
           }

           alert('Dados cadastrados com sucesso!');
           form.reset(); // Reseta o formulário após o envio

       } catch (error) {
           console.error(error);
           alert('Erro ao cadastrar os dados.');
       }
   });
});
