export default function handler(req, res) {
   if (req.method === 'POST') {
      const { disciplina, pergunta, resposta } = req.body;

      // Aqui você pode processar os dados recebidos (por exemplo, salvá-los em um banco de dados)
      console.log('Dados recebidos:', { disciplina, pergunta, resposta });

      // Resposta de sucesso
      res.status(200).json({ message: 'Dados recebidos com sucesso!' });
   } else {
      // Se o método não for POST, retorna erro 405 (Método Não Permitido)
      res.setHeader('Allow', ['POST']); // Define os métodos permitidos
      res.status(405).end(`Método ${req.method} não permitido`);
   }
}
