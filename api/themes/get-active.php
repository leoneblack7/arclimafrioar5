<?php
header('Content-Type: application/json');
require_once '../config/database.php';

try {
    $conn = getConnection();
    
    $stmt = $conn->prepare("SELECT * FROM themes WHERE is_active = TRUE LIMIT 1");
    $stmt->execute();
    
    $theme = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($theme) {
        $theme['colors'] = json_decode($theme['colors'], true);
    }
    
    echo json_encode($theme);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}