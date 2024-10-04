import fs from 'fs';
import path from 'path';

// Função para obter o caminho do arquivo JSON
const getFilePath = () => path.join(process.cwd(), 'medcard', 'assets', 'json', 'dados.json');

// Função para ler dados do arquivo JSON
const readDataFromFile = () => {
    const filePath = getFilePath();
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        return JSON.parse(data);
    }
    return [];
};

// Função para escrever dados no arquivo JSON
const writeDataToFile = (dados) => {
    const filePath = getFilePath();
    fs.writeFileSync(filePath, JSON.stringify(dados, null, 2));
};

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { disciplina, pergunta, resposta } = req.body;
        const dados = readDataFromFile(); // Lê os dados existentes

        // Adiciona os novos dados
        dados.push({ disciplina, pergunta, resposta });
        writeDataToFile(dados); // Escreve os dados atualizados no arquivo

        res.status(201).json({ message: 'Dados cadastrados com sucesso!' });
    } else if (req.method === 'GET') {
        const dados = readDataFromFile(); // Lê os dados do arquivo
        res.status(200).json(dados); // Retorna todos os dados cadastrados
    } else if (req.method === 'DELETE') {
        const { index } = req.body;
        const dados = readDataFromFile(); // Lê os dados existentes
        if (dados[index]) {
            dados.splice(index, 1);
            writeDataToFile(dados); // Escreve os dados atualizados no arquivo
            res.status(200).json({ message: 'Dados excluídos com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else if (req.method === 'PUT') {
        const { index, updatedData } = req.body;
        const dados = readDataFromFile(); // Lê os dados existentes
        if (dados[index]) {
            dados[index] = updatedData;
            writeDataToFile(dados); // Escreve os dados atualizados no arquivo
            res.status(200).json({ message: 'Dados atualizados com sucesso!' });
        } else {
            res.status(404).json({ message: 'Dado não encontrado.' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET', 'DELETE', 'PUT']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
