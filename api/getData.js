// /api/getData.js
const dados = []; // Simulação de um banco de dados em memória

export default function handler(req, res) {
   if (req.method === 'GET') {
      // Retorna os dados cadastrados
      res.status(200).json(dados);
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Método ${req.method} não permitido`);
   }
}
