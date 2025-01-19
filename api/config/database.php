<?php
function getConnection() {
    $envFile = __DIR__ . '/../../.env';
    $config = [
        'host' => 'localhost',
        'port' => '3306',
        'database' => 'arclimafrio',
        'username' => 'root',
        'password' => ''
    ];

    if (file_exists($envFile)) {
        $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos($line, 'DB_HOST=') === 0) {
                $config['host'] = trim(substr($line, 8));
            }
            if (strpos($line, 'DB_PORT=') === 0) {
                $config['port'] = trim(substr($line, 8));
            }
            if (strpos($line, 'DB_DATABASE=') === 0) {
                $config['database'] = trim(substr($line, 12));
            }
            if (strpos($line, 'DB_USERNAME=') === 0) {
                $config['username'] = trim(substr($line, 12));
            }
            if (strpos($line, 'DB_PASSWORD=') === 0) {
                $config['password'] = trim(substr($line, 12));
            }
        }
    }

    try {
        $dsn = "mysql:host={$config['host']};port={$config['port']};dbname={$config['database']};charset=utf8mb4";
        $conn = new PDO($dsn, $config['username'], $config['password']);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $conn;
    } catch (PDOException $e) {
        throw new Exception("Erro na conexão com o banco de dados: " . $e->getMessage());
    }
}