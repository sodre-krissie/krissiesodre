// /medcard/assets/js/listaCompleta.js
document.addEventListener('DOMContentLoaded', async () => {
   const listaDados = document.getElementById('lista-dados');

   try {
       const response = await fetch('/api/getData');
       if (!response.ok) throw new Error('Erro ao buscar os dados.');

       const dados = await response.json();

       if (dados.length > 0) {
           dados.forEach(item => {
               const li = document.createElement('li');
               li.textContent = `Disciplina: ${item.disciplina}, Pergunta: ${item.pergunta}, Resposta: ${item.resposta}`;
               listaDados.appendChild(li);
           });
       } else {
           listaDados.innerHTML = '<li>Nenhum dado cadastrado.</li>';
       }
   } catch (error) {
       console.error('Erro:', error);
       listaDados.innerHTML = '<li>Erro ao carregar os dados.</li>';
   }
});
