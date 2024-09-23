// /api/getData.js
let dados = []; // Esse array deve ser compartilhado com saveData.js, se possível

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(dados); // Retorna os dados cadastrados
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
