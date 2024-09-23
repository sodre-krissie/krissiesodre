// /api/getData.js
let dados = []; // Simulação de um banco de dados em memória

// Rota para salvar dados
export default function saveDataHandler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, nova_disciplina, pergunta, resposta } = req.body;
        dados.push({
            disciplina: nova_disciplina || disciplina,
            pergunta,
            resposta
        });
        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else if (req.method === 'GET') {
        res.status(200).json(dados); // Retorna todos os dados cadastrados
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
