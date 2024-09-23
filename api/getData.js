// /api/getData.js
let dados = [
   { disciplina: "Nutrição", pergunta: "Qual é a importância da alimentação?", resposta: "A alimentação é essencial para a saúde." },
   { disciplina: "Educação Física", pergunta: "Qual a função do exercício?", resposta: "Manter a saúde física e mental." }
];


export default function handler(req, res) {
   if (req.method === 'GET') {
      // Retorna os dados cadastrados
      res.status(200).json(dados);
   } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Método ${req.method} não permitido`);
   }
}
