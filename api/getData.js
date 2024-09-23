// /api/getData.js
let dados = []; // Aqui deve ser o mesmo array que você usa em saveData.js

export default function handler(req, res) {
    if (req.method === 'GET') {
        res.status(200).json(dados); // Retorna os dados cadastrados
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
