document.addEventListener("DOMContentLoaded", function() {
   var disciplinaSelect = document.getElementById('disciplina');
   var novaDisciplinaInput = document.getElementById('nova_disciplina');
   
   // Garante que os elementos existam antes de manipulá-los
   if (disciplinaSelect && novaDisciplinaInput) {
       disciplinaSelect.addEventListener('change', function() {
           // Se "Outro" for selecionado, habilita o campo de nova disciplina
           if (disciplinaSelect.value === '0') {
               novaDisciplinaInput.disabled = false;
           } else {
               novaDisciplinaInput.disabled = true;
               novaDisciplinaInput.value = ''; // Limpa o campo
           }
       });
   } else {
       console.error('Erro ao encontrar os elementos HTML.');
   }
});
