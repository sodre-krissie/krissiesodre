// /api/getData.js
import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'medcard', 'assets', 'json', 'dados.json');

// Função para ler os dados do arquivo JSON com tratamento de erro
async function lerDados() {
    const dadosJson = await fs.readFile(filePath, 'utf-8');
    console.log('Dados lidos do arquivo JSON:', dadosJson); // Debug
    return JSON.parse(dadosJson);
}

// Função para escrever os dados no arquivo JSON
async function escreverDados(dados) {
    console.log('Escrevendo dados no arquivo JSON:', dados); // Debug
    await fs.writeFile(filePath, JSON.stringify(dados, null, 2), 'utf-8');
    console.log('Dados escritos com sucesso!'); // Debug
}

// Centralização de tratamento de erros
async function handleErrors(func, res) {
    try {
        await func();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;

        // Valida se todos os campos estão presentes
        if (!disciplina || !pergunta || !resposta) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        await handleErrors(async () => {
            const dados = await lerDados();
            dados.push({ disciplina, pergunta, resposta });
            await escreverDados(dados);
            res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
        }, res);

    } else if (req.method === 'GET') {
        await handleErrors(async () => {
            const dados = await lerDados();
            res.status(200).json(dados);
        }, res);

    } else if (req.method === 'DELETE') {
        const { index } = req.body;

        await handleErrors(async () => {
            const dados = await lerDados();
            if (dados[index]) {
                dados.splice(index, 1);
                await escreverDados(dados);
                res.status(200).json({ message: 'Dados excluídos com sucesso!' });
            } else {
                res.status(404).json({ message: 'Dado não encontrado.' });
            }
        }, res);

    } else if (req.method === 'PUT') {
        const { index, updatedData } = req.body;

        await handleErrors(async () => {
            const dados = await lerDados();
            if (dados[index]) {
                dados[index] = updatedData;
                await escreverDados(dados);
                res.status(200).json({ message: 'Dados atualizados com sucesso!' });
            } else {
                res.status(404).json({ message: 'Dado não encontrado.' });
            }
        }, res);

    } else {
        res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
