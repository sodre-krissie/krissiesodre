// /medcard/assets/js/listaCompleta.js
document.addEventListener('DOMContentLoaded', async () => {
   const listaDados = document.getElementById('lista-dados');

   try {
       const response = await fetch('/api/getData'); // Faz uma requisição GET para a API
       if (!response.ok) throw new Error('Erro ao buscar os dados.');

       const dados = await response.json();

       listaDados.innerHTML = ''; // Limpa a lista antes de adicionar novos dados

       if (dados.length > 0) {
           dados.forEach(item => {
               const li = document.createElement('li');
               li.textContent = `Disciplina: ${item.disciplina}, Pergunta: ${item.pergunta}, Resposta: ${item.resposta}`;
               listaDados.appendChild(li);
           });
       } else {
           listaDados.innerHTML = '<li>Nenhum dado cadastrado.</li>'; // Mensagem caso não haja dados
       }
   } catch (error) {
       console.error('Erro:', error);
       listaDados.innerHTML = '<li>Erro ao carregar os dados.</li>'; // Mensagem de erro
   }
});
