import { Client } from 'pg';

export default async function handler(req, res) {
    console.log('Recebendo dados:', req.body);

    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        if (!disciplina || !pergunta || !resposta) {
            console.error('Erro: Campos obrigatórios não preenchidos.');
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT, 10),
        });

        try {
            await client.connect();
            console.log('Conexão com o banco de dados estabelecida.');

            // Teste de conexão
            const nowResult = await client.query('SELECT NOW()');
            console.log('Hora atual do banco de dados:', nowResult.rows[0]);

            await client.query(
                'INSERT INTO flashcards (disciplina, pergunta, resposta) VALUES ($1, $2, $3)',
                [disciplina, pergunta, resposta]
            );

            console.log('Flashcard cadastrado com sucesso.');
            res.status(201).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro na função API:', error.message, error.stack);
            res.status(500).json({ message: 'Erro ao cadastrar flashcard', error: error.toString() });
        } finally {
            await client.end();
            console.log('Conexão com o banco de dados encerrada.');
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
