export default function handler(req, res) {
   if (req.method === 'POST') {
      const { disciplina, pergunta, resposta } = req.body;
      
      // Aqui você pode conectar a um banco de dados ou simplesmente armazenar os dados
      // Por enquanto, vamos apenas enviar de volta o que foi recebido

      console.log('Dados recebidos:', { disciplina, pergunta, resposta });
      
      // Resposta de sucesso
      res.status(200).json({ message: 'Dados recebidos com sucesso!', data: { disciplina, pergunta, resposta } });
   } else {
      res.status(405).json({ message: 'Método não permitido' });
   }
}
