let racas = [];
let racaAtual = null;

fetch('/wow/classes.json')
    .then(response => response.json())
    .then(data => {
        racas = data;
    })
    .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
    });

function sortearRaca() {
    if (racas.length === 0) {
        console.error('O JSON ainda não foi carregado.');
        return;
    }
    
    racaAtual = racas[Math.floor(Math.random() * racas.length)];
    document.getElementById('faccao').innerText = racaAtual.faccao;
    document.getElementById('raca').innerText = racaAtual.raca;
    
    const classesList = document.getElementById('classes');
    classesList.innerHTML = '';
    racaAtual.classe.forEach(classe => {
        const li = document.createElement('li');
        li.innerText = classe;
        classesList.appendChild(li);
    });
    
    document.getElementById('imagem').src = racaAtual.imagem;
    document.getElementById('classe-sorteada').innerText = ''; // Limpa a classe sorteada anterior
}

function sortearClasse() {
    if (!racaAtual) {
        console.error('Nenhuma raça foi sorteada.');
        return;
    }

    const classeSorteada = racaAtual.classe[Math.floor(Math.random() * racaAtual.classe.length)];
    document.getElementById('classe-sorteada').innerText = classeSorteada;
}
