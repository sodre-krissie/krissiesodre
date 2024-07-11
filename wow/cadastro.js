document.getElementById('cadastroForm').addEventListener('submit', function(event) {
   event.preventDefault();

   const faccao = document.getElementById('faccao').value;
   const raca = document.getElementById('raca').value;
   
   const classesCheckboxes = document.querySelectorAll('#classes input[type="checkbox"]');
   const classes = Array.from(classesCheckboxes)
       .filter(checkbox => checkbox.checked)
       .map(checkbox => checkbox.value);
   
   const imagem = document.getElementById('imagem').value;

   const novaRaca = {
       faccao: faccao,
       raca: raca,
       classe: classes,
       imagem: imagem
   };

   fetch('classes.json')
       .then(response => response.json())
       .then(data => {
           data.push(novaRaca);
           return fetch('save_json.php', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify(data)
           });
       })
       .then(response => response.json())
       .then(result => {
           document.getElementById('mensagem').innerText = 'Cadastro realizado com sucesso!';
           document.getElementById('cadastroForm').reset();
       })
       .catch(error => {
           console.error('Erro ao cadastrar:', error);
           document.getElementById('mensagem').innerText = 'Erro ao realizar o cadastro.';
       });
});
