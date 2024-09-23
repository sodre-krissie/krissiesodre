// /assets/js/listaCompleta.js
document.addEventListener('DOMContentLoaded', async () => {
   try {
      const response = await fetch('/api/getData');
      if (!response.ok) {
         throw new Error('Erro ao buscar dados: ' + response.statusText);
      }

      const dados = await response.json();
      const lista = document.getElementById('lista-cadastrados');

      // Verifique se dados não estão vazios
      if (dados.length === 0) {
         const li = document.createElement('li');
         li.textContent = 'Nenhum dado cadastrado.';
         lista.appendChild(li);
         return;
      }

      dados.forEach(item => {
         const li = document.createElement('li');
         li.textContent = `Disciplina: ${item.disciplina}, Pergunta: ${item.pergunta}, Resposta: ${item.resposta}`;
         lista.appendChild(li);
      });
   } catch (error) {
      console.error('Erro:', error);
   }
});
