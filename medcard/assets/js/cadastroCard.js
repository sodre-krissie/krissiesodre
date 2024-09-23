// /medcard/assets/js/cadastroCard.js
document.addEventListener('DOMContentLoaded', () => {
   const form = document.getElementById('cadastro-form');

   form.addEventListener('submit', async (event) => {
       event.preventDefault(); // Impede o comportamento padrão do formulário

       const formData = new FormData(form);
       const data = {
           disciplina: formData.get('disciplina'),
           nova_disciplina: formData.get('nova_disciplina'),
           pergunta: formData.get('pergunta'),
           resposta: formData.get('resposta')
       };

       try {
           const response = await fetch('/api/saveData', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(data),
           });

           if (response.ok) {
               alert('Dados cadastrados com sucesso!');
               form.reset(); // Reseta o formulário após o sucesso
           } else {
               alert('Erro ao cadastrar os dados.');
           }
       } catch (error) {
           console.error('Erro:', error);
           alert('Erro na requisição. Veja o console para mais detalhes.');
       }
   });
});
