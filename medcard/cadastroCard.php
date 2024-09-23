<?php
// Caminho para o arquivo JSON
$jsonFilePath = './assets/json/list.json';

// Verifica se o formulário foi submetido corretamente
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Coleta os dados do formulário
    $disciplina = $_POST['disciplina'];
    $nova_disciplina = isset($_POST['nova_disciplina']) ? trim($_POST['nova_disciplina']) : '';
    $pergunta = isset($_POST['pergunta']) ? trim($_POST['pergunta']) : '';
    $resposta = isset($_POST['resposta']) ? trim($_POST['resposta']) : '';

    // Usa a nova disciplina se o valor do select for "Outro"
    if ($disciplina === '0' && !empty($nova_disciplina)) {
        $disciplina = $nova_disciplina;
    }

    // Valida os campos
    if (!empty($disciplina) && !empty($pergunta) && !empty($resposta)) {
        // Verifica se o arquivo JSON existe
        if (file_exists($jsonFilePath)) {
            // Lê o conteúdo atual do arquivo JSON
            $jsonData = file_get_contents($jsonFilePath);
            $list = json_decode($jsonData, true);

            // Verifica se o JSON é válido
            if ($list === null) {
                $list = ['perguntasRespostas' => []];
            }

            // Adiciona a nova pergunta e resposta
            $list['perguntasRespostas'][] = [
                'disciplina' => $disciplina,
                'pergunta' => $pergunta,
                'resposta' => $resposta
            ];

            // Salva o novo conteúdo no arquivo JSON
            file_put_contents($jsonFilePath, json_encode($list, JSON_PRETTY_PRINT));

            echo 'Cadastro realizado com sucesso!';
        } else {
            echo 'Erro: Arquivo JSON não encontrado.';
        }
    } else {
        echo 'Erro: Preencha todos os campos.';
    }
} else {
    echo 'Método inválido.';
}
?>
