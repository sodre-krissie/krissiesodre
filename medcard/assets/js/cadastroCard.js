         // Função para habilitar campo "nova disciplina" caso a opção "Outro" seja selecionada
         document.addEventListener('DOMContentLoaded', () => {
            const selectDisciplina = document.getElementById('disciplina');
            const inputNovaDisciplina = document.getElementById('nova_disciplina');

            selectDisciplina.addEventListener('change', () => {
               if (selectDisciplina.value === '0') {
                  inputNovaDisciplina.disabled = false;
               } else {
                  inputNovaDisciplina.disabled = true;
                  inputNovaDisciplina.value = '';  // Limpar o campo
               }
            });

            // Lógica de envio do formulário
            const form = document.getElementById('cadastro-form');
            form.addEventListener('submit', async (event) => {
               event.preventDefault(); // Impede o comportamento padrão de enviar o formulário
               
               const formData = new FormData(form);
               const data = {
                  disciplina: formData.get('disciplina') === '0' ? formData.get('nova_disciplina') : formData.get('disciplina'),
                  pergunta: formData.get('pergunta'),
                  resposta: formData.get('resposta')
               };

               try {
                  const response = await fetch('/medcard/api/saveData', {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json'
                     },
                     body: JSON.stringify(data)
                  });

                  if (response.ok) {
                     alert('Cadastro realizado com sucesso!');
                     form.reset(); // Limpar o formulário após envio bem-sucedido
                  } else {
                     alert('Erro ao realizar o cadastro');
                  }
               } catch (error) {
                  console.error('Erro ao enviar dados:', error);
                  alert('Erro na comunicação com o servidor');
               }
            });
         });