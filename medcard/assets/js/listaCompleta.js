// // /medcard/assets/js/listaCompleta.js
// document.addEventListener('DOMContentLoaded', async () => {
//    const listaDados = document.getElementById('lista-dados');

//    try {
//        const response = await fetch('/api/getData'); // Faz uma requisição GET para a API
//        if (!response.ok) throw new Error('Erro ao buscar os dados.');

//        const dados = await response.json();

//        listaDados.innerHTML = ''; // Limpa a lista antes de adicionar novos dados

//        if (dados.length > 0) {
//            dados.forEach(item => {
//                const li = document.createElement('li');
//                li.textContent = `Disciplina: ${item.disciplina}, Pergunta: ${item.pergunta}, Resposta: ${item.resposta}`;
//                listaDados.appendChild(li);
//            });
//        } else {
//            listaDados.innerHTML = '<li>Nenhum dado cadastrado.</li>'; // Mensagem caso não haja dados
//        }
//    } catch (error) {
//        console.error('Erro:', error);
//        listaDados.innerHTML = '<li>Erro ao carregar os dados.</li>'; // Mensagem de erro
//    }
// });

// /medcard/assets/js/listaCompleta.js
document.addEventListener('DOMContentLoaded', async () => {
   const listaDados = document.getElementById('lista-dados');

   // Função para carregar dados na tabela
   async function loadData() {
       try {
           const response = await fetch('/api/getData'); // Faz uma requisição GET para a API
           if (!response.ok) throw new Error('Erro ao buscar os dados.');

           const dados = await response.json();

           listaDados.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

           if (dados.length > 0) {
               dados.forEach((item, index) => {
                   const tr = document.createElement('tr');

                   tr.innerHTML = `
                       <td>${item.disciplina}</td>
                       <td>${item.pergunta}</td>
                       <td>${item.resposta}</td>
                       <td>
                           <button class="btn-delete" data-index="${index}">Excluir</button>
                       </td>
                   `;

                   listaDados.appendChild(tr);
               });
           } else {
               listaDados.innerHTML = '<tr><td colspan="4">Nenhum dado cadastrado.</td></tr>'; // Mensagem caso não haja dados
           }
       } catch (error) {
           console.error('Erro:', error);
           listaDados.innerHTML = '<tr><td colspan="4">Erro ao carregar os dados.</td></tr>'; // Mensagem de erro
       }
   }

   // Função para excluir um dado
   async function deleteData(index) {
       try {
           const response = await fetch('/api/getData', {
               method: 'DELETE',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ index }), // Envia o índice do item a ser excluído
           });

           if (!response.ok) throw new Error('Erro ao excluir os dados.');

           await loadData(); // Recarrega os dados após a exclusão
       } catch (error) {
           console.error('Erro:', error);
       }
   }

   // Adiciona evento de clique para os botões de exclusão
   listaDados.addEventListener('click', (event) => {
       if (event.target.classList.contains('btn-delete')) {
           const index = event.target.dataset.index; // Obtém o índice do botão clicado
           deleteData(index); // Chama a função de exclusão
       }
   });

   loadData(); // Carrega os dados inicialmente
});
