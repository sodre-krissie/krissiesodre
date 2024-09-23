// /api/getData.js
let dados = []; // Simulação de um banco de dados em memória

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;
        dados.push({
            disciplina,
            pergunta,
            resposta
        });
        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else if (req.method === 'GET') {
        res.status(200).json(dados); // Retorna todos os dados cadastrados
    } else if (req.method === 'DELETE') {
        const { index } = req.body;
        if (dados[index]) {
            dados.splice(index, 1);
            res.status(200).json({ message: 'Dados excluídos com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else if (req.method === 'PUT') {
        const { index, updatedData } = req.body; // Obtém o índice e os dados atualizados
        if (dados[index]) {
            dados[index] = updatedData; // Atualiza o item no array
            res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
