<?php
// saveFlashcard.php

// Define o cabeçalho para permitir o acesso ao recurso
header("Access-Control-Allow-Origin: *"); // Ajuste isso conforme necessário
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

// Verifica se a requisição é POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados JSON enviados
    $data = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados foram recebidos corretamente
    if (isset($data['disciplina'], $data['pergunta'], $data['resposta'])) {
        $disciplina = $data['disciplina'];
        $pergunta = $data['pergunta'];
        $resposta = $data['resposta'];

        // Aqui você pode adicionar o código para inserir no banco de dados
        // Exemplo: inserirFlashcard($disciplina, $pergunta, $resposta);

        echo json_encode(['message' => 'Flashcard cadastrado com sucesso!']);
    } else {
        echo json_encode(['message' => 'Dados incompletos.']);
    }
} else {
    // Método não permitido
    http_response_code(405); // 405 Method Not Allowed
    echo json_encode(['message' => 'Método não permitido.']);
}
?>
