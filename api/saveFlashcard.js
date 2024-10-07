// /api/saveFlashcard.js

import pkg from 'pg';
const { Client } = pkg;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        console.log('Dados recebidos:', { disciplina, pergunta, resposta }); // Log dos dados recebidos

        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT, 10),
        });

        try {
            await client.connect();
            console.log('Conexão com o banco de dados estabelecida.'); // Log de conexão

            const query = 'INSERT INTO cad_flashcard (disciplina, pergunta, resposta) VALUES ($1, $2, $3)';
            const values = [disciplina, pergunta, resposta];

            await client.query(query, values);
            console.log('Flashcard cadastrado com sucesso!'); // Log de sucesso
            await client.end();

            res.status(200).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao inserir flashcard:', error); // Log do erro para diagnóstico
            res.status(500).json({ message: 'Erro ao cadastrar flashcard', error: error.message });
        } finally {
            await client.end(); // Assegura que o cliente será fechado
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
