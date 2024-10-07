// api/saveData.js
import { Client } from 'pg'; // Importar o cliente do PostgreSQL

export default async function handler(req, res) {
    // Verifique se o método é POST
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body; // Extrair dados do corpo da requisição

        // Configuração da conexão com o banco de dados
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        try {
            await client.connect(); // Conectar ao banco de dados

            // Inserir dados na tabela flashcards
            const result = await client.query(
                'INSERT INTO flashcards (disciplina, pergunta, resposta) VALUES ($1, $2, $3)',
                [disciplina, pergunta, resposta]
            );

            res.status(200).json({ message: 'Flashcard cadastrado com sucesso!' }); // Retornar sucesso
        } catch (error) {
            console.error('Erro ao cadastrar flashcard:', error);
            res.status(500).json({ message: 'Erro ao cadastrar flashcard' }); // Retornar erro
        } finally {
            await client.end(); // Fechar a conexão
        }
    } else {
        res.setHeader('Allow', ['POST']); // Definir os métodos permitidos
        res.status(405).end(`Method ${req.method} Not Allowed`); // Retornar método não permitido
    }
}
