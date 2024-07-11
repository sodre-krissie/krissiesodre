let racas = [];
let classes = {};
let racaSorteada = null;
let classeSorteada = null;

fetch('classes.json')
    .then(response => response.json())
    .then(data => {
        classes = data.classes;
        racas = data.racas;
    })
    .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
    });

document.getElementById('sortearRaca').addEventListener('click', function() {
    const randomIndex = Math.floor(Math.random() * racas.length);
    racaSorteada = racas[randomIndex];
    classeSorteada = null; // Resetar a classe sorteada
    document.getElementById('resultado').innerHTML = `
         <h1>Sua aventura será ao lado da ${racaSorteada.faccao}</h1>
        <h2>${racaSorteada.raca}</h2>
        <img src="${racaSorteada.imagem}" alt="${racaSorteada.raca}">
    `;
    document.getElementById('sortearClasse').disabled = false;
});

document.getElementById('sortearClasse').addEventListener('click', function() {
    if (racaSorteada) {
        const randomIndex = Math.floor(Math.random() * racaSorteada.classe.length);
        const classeNome = racaSorteada.classe[randomIndex];
        const classeImagem = classes[classeNome];
        document.getElementById('resultado2').innerHTML += `
            <div class="class-container">
                <div class="class-item">
                    <img src="${classeImagem}" alt="${classeNome}">
                    <h3>Sua função será: ${classeNome}</h3>
                </div>
            </div>
        `;
    }
});
