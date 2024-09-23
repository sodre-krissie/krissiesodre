// /api/saveData.js
let dados = []; // Simulação de um banco de dados em memória

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, nova_disciplina, pergunta, resposta } = req.body;
        
        // Adiciona os dados ao array
        dados.push({
            disciplina: nova_disciplina || disciplina,
            pergunta,
            resposta
        });

        // Adicionando o log aqui
        console.log('Dados recebidos:', { disciplina, nova_disciplina, pergunta, resposta });

        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
