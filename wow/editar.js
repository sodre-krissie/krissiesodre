let racas = [];
let racaAtual = null;

fetch('classes.json')
    .then(response => response.json())
    .then(data => {
        racas = data;
        const racaSelect = document.getElementById('racaSelect');
        racas.forEach((raca, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.innerText = raca.raca;
            racaSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
    });

document.getElementById('racaSelect').addEventListener('change', function() {
    const selectedIndex = this.value;
    racaAtual = racas[selectedIndex];
    document.getElementById('faccao').value = racaAtual.faccao;
    document.getElementById('raca').value = racaAtual.raca;
    document.getElementById('imagem').value = racaAtual.imagem;
    
    const classesCheckboxes = document.querySelectorAll('#classes input[type="checkbox"]');
    classesCheckboxes.forEach(checkbox => {
        checkbox.checked = racaAtual.classe.includes(checkbox.value);
    });
});

document.getElementById('editarForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const faccao = document.getElementById('faccao').value;
    const raca = document.getElementById('raca').value;
    
    const classesCheckboxes = document.querySelectorAll('#classes input[type="checkbox"]');
    const classes = Array.from(classesCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    
    const imagem = document.getElementById('imagem').value;

    const racaEditada = {
        faccao: faccao,
        raca: raca,
        classe: classes,
        imagem: imagem
    };

    const selectedIndex = document.getElementById('racaSelect').value;
    racas[selectedIndex] = racaEditada;

    fetch('save_json.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(racas)
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById('mensagem').innerText = 'Alterações salvas com sucesso!';
        document.getElementById('editarForm').reset();
    })
    .catch(error => {
        console.error('Erro ao salvar alterações:', error);
        document.getElementById('mensagem').innerText = 'Erro ao salvar as alterações.';
    });
});
