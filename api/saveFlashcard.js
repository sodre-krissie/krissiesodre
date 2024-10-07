// /api/saveFlashcard.js

import { Client } from 'pg'; // ou o driver que você está utilizando

const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        try {
            await client.connect(); // Conectando ao banco de dados

            const query = 'INSERT INTO cad_flashcard (disciplina, pergunta, resposta) VALUES ($1, $2, $3)';
            const values = [disciplina, pergunta, resposta];

            await client.query(query, values); // Executando a query
            await client.end(); // Encerrando a conexão

            res.status(200).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Error inserting flashcard:', error);
            res.status(500).json({ message: 'Erro ao cadastrar flashcard' });
        }
    } else {
        // Método não permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
