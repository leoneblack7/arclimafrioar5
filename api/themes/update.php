<?php
header('Content-Type: application/json');
require_once '../config/database.php';

try {
    $conn = getConnection();
    
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Desativa todos os temas primeiro
    $stmt = $conn->prepare("UPDATE themes SET is_active = FALSE");
    $stmt->execute();
    
    // Verifica se o tema já existe
    $stmt = $conn->prepare("SELECT id FROM themes WHERE id = ?");
    $stmt->execute([$data['id']]);
    
    if ($stmt->rowCount() > 0) {
        // Atualiza o tema existente
        $stmt = $conn->prepare("UPDATE themes SET name = ?, colors = ?, gradient = ?, is_active = ? WHERE id = ?");
        $stmt->execute([
            $data['name'],
            json_encode($data['colors']),
            $data['gradient'] ?? null,
            $data['is_active'],
            $data['id']
        ]);
    } else {
        // Insere novo tema
        $stmt = $conn->prepare("INSERT INTO themes (id, name, colors, gradient, is_active) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $data['id'],
            $data['name'],
            json_encode($data['colors']),
            $data['gradient'] ?? null,
            $data['is_active']
        ]);
    }
    
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}