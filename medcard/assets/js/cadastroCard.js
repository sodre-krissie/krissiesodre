document.getElementById('cadastro-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário
 
    const disciplina = document.querySelector('select[name="disciplina"]').value;
    const pergunta = document.querySelector('input[name="pergunta"]').value;
    const resposta = document.querySelector('input[name="resposta"]').value;
 
    const data = { disciplina, pergunta, resposta };
 
    try {
       const response = await fetch('/api/saveData', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
       });
 
       if (!response.ok) {
          throw new Error('Erro na requisição: ' + response.statusText);
       }
 
       const result = await response.json();
       console.log('Success:', result);
    } catch (error) {
       console.error('Error:', error);
    }
 });
 