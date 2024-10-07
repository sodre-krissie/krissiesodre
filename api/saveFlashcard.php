<?php
// Configurações do banco de dados
$host = getenv('DB_HOST');
$dbname = getenv('DB_NAME');
$user = getenv('DB_USER');
$password = getenv('DB_PASSWORD');

// Cria uma nova conexão PDO
try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $user, $password);
    // Define o modo de erro do PDO para exceções
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Erro na conexão: " . $e->getMessage();
    exit;
}

// Verifica se a requisição é um POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do corpo da requisição
    $data = json_decode(file_get_contents("php://input"), true);

    // Valida os dados recebidos
    if (isset($data['disciplina']) && isset($data['pergunta']) && isset($data['resposta'])) {
        $disciplina = $data['disciplina'];
        $pergunta = $data['pergunta'];
        $resposta = $data['resposta'];

        // Prepara e executa a consulta
        $stmt = $conn->prepare("INSERT INTO cad_flashcard (disciplina, pergunta, resposta) VALUES (:disciplina, :pergunta, :resposta)");
        $stmt->bindParam(':disciplina', $disciplina);
        $stmt->bindParam(':pergunta', $pergunta);
        $stmt->bindParam(':resposta', $resposta);

        try {
            $stmt->execute();
            echo json_encode(["message" => "Flashcard cadastrado com sucesso!"]);
        } catch (PDOException $e) {
            echo json_encode(["message" => "Erro ao cadastrar flashcard", "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["message" => "Dados incompletos."]);
    }
} else {
    echo json_encode(["message" => "Método não permitido."]);
}
