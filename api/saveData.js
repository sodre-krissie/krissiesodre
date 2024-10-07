import { Client } from 'pg';

export default async function handler(req, res) {
    console.log('Recebendo dados:', req.body);

    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        // Validação básica
        if (!disciplina || !pergunta || !resposta) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Configuração do cliente PostgreSQL com dados reais
        const client = new Client({
            user: 'postgres',          // Substitua pelo seu usuário do PostgreSQL
            host: 'possessively-glad-sponge.data-1.use1.tembo.io',              // Substitua pelo host do seu banco de dados (ex: 'localhost' ou um IP)
            database: 'flashcardMed', // Substitua pelo nome do seu banco de dados
            password: 'Dz12t2WDnl5rY3ji',         // Substitua pela sua senha do PostgreSQL
            port: 5432,                    // A porta padrão do PostgreSQL é 5432
        });

        try {
            await client.connect();
            console.log('Conexão com o banco de dados estabelecida.');

            console.log('Dados recebidos para inserção:', { disciplina, pergunta, resposta });
            
            await client.query(
                'INSERT INTO flashcards (disciplina, pergunta, resposta) VALUES ($1, $2, $3)',
                [disciplina, pergunta, resposta]
            );

            res.status(201).json({ message: 'Flashcard cadastrado com sucesso!' });
        } catch (error) {
            console.error('Erro na função API:', error.message);
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
