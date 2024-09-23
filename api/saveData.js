// /api/saveData.js
let dados = []; // Simulação de um banco de dados em memória

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        // Adiciona os dados ao array
        dados.push({
            disciplina,
            pergunta,
            resposta
        });
        console.log('Dados recebidos:', { disciplina, pergunta, resposta }); // Debug
        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else if (req.method === 'GET') {
        res.status(200).json(dados); // Retorna todos os dados cadastrados
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
