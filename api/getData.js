import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'medcard', 'assets', 'json', 'dados.json');

// Função para ler os dados do arquivo JSON
async function lerDados() {
    const dadosJson = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(dadosJson);
}

// Função para escrever os dados no arquivo JSON
async function escreverDados(dados) {
    await fs.writeFile(filePath, JSON.stringify(dados, null, 2), 'utf-8');
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;
        const dados = await lerDados();

        dados.push({ disciplina, pergunta, resposta });
        await escreverDados(dados);

        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else if (req.method === 'GET') {
        const dados = await lerDados();
        res.status(200).json(dados); // Retorna todos os dados cadastrados
    } else if (req.method === 'DELETE') {
        const { index } = req.body;
        const dados = await lerDados();

        if (dados[index]) {
            dados.splice(index, 1);
            await escreverDados(dados);
            res.status(200).json({ message: 'Dados excluídos com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else if (req.method === 'PUT') {
        const { index, updatedData } = req.body; // Obtém o índice e os dados atualizados
        const dados = await lerDados();

        if (dados[index]) {
            dados[index] = updatedData; // Atualiza o item no array
            await escreverDados(dados);
            res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
