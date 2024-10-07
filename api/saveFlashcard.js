// /api/saveFlashcard.js

import pkg from 'pg';
const { Pool } = pkg;

// Cria um pool de conexões
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10),
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        console.log('Dados recebidos:', { disciplina, pergunta, resposta }); // Log dos dados recebidos

        try {
            // Conexão do pool
            const client = await pool.connect();
            console.log('Conexão com o banco de dados estabelecida.'); // Log de conexão

            const query = 'INSERT INTO cad_flashcard (disciplina, pergunta, resposta) VALUES ($1, $2, $3)';
            const values = [disciplina, pergunta, resposta];

            await client.query(query, values);
            console.log('Flashcard cadastrado com sucesso!'); // Log de sucesso

            res.status(200).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro ao inserir flashcard:', error); // Log do erro para diagnóstico
            res.status(500).json({ message: 'Erro ao cadastrar flashcard', error: error.message });
        } finally {
            // Libera a conexão de volta para o pool
            client.release();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
