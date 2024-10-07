<?php
// saveFlashcard.php

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
        echo json_encode(['message' => 'Dados incompletos.'], JSON_PRETTY_PRINT);
    }
} else {
    // Método não permitido
    header("HTTP/1.1 405 Method Not Allowed");
    echo json_encode(['message' => 'Método não permitido.']);
}
?>
