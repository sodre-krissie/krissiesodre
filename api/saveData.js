// api/saveData.js
import { Client } from 'pg';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: process.env.DB_PORT,
        });

        try {
            await client.connect();
            await client.query(
                'INSERT INTO flashcards (disciplina, pergunta, resposta) VALUES ($1, $2, $3)',
                [disciplina, pergunta, resposta]
            );

            res.status(200).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro na função API:', error);
            res.status(500).json({ message: 'Erro ao cadastrar flashcard', error: error.message });
        } finally {
            await client.end();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
