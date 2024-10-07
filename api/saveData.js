import { Client } from 'pg';

export default async function handler(req, res) {
    // Verifica se a requisição é do tipo POST
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        // Validação básica
        if (!disciplina || !pergunta || !resposta) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Configuração do cliente PostgreSQL usando variáveis de ambiente
        const client = new Client({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT, 10), // Garante que a porta seja um número
        });

        try {
            // Conecta ao banco de dados
            await client.connect();

            // Insere os dados na tabela 'flashcards'
            await client.query(
                'INSERT INTO flashcards (disciplina, pergunta, resposta) VALUES ($1, $2, $3)',
                [disciplina, pergunta, resposta]
            );

            // Retorna uma resposta de sucesso
            res.status(201).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            // Log do erro no console
            console.error('Erro na função API:', error);
            // Retorna uma resposta de erro
            res.status(500).json({ message: 'Erro ao cadastrar flashcard', error: error.message });
        } finally {
            // Garante que a conexão seja encerrada
            await client.end();
        }
    } else {
        // Responde com um erro se o método não for permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
