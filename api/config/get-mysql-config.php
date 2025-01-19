<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$envFile = "../../.env";
$config = [
    "host" => "localhost",
    "port" => "3306",
    "database" => "arclimafrio",
    "username" => "root",
    "password" => ""
];

if (file_exists($envFile)) {
    $envContent = file_get_contents($envFile);
    $lines = explode("\n", $envContent);
    
    foreach ($lines as $line) {
        if (strpos($line, "DB_HOST=") !== false) {
            $config["host"] = trim(str_replace("DB_HOST=", "", $line));
        }
        if (strpos($line, "DB_PORT=") !== false) {
            $config["port"] = trim(str_replace("DB_PORT=", "", $line));
        }
        if (strpos($line, "DB_DATABASE=") !== false) {
            $config["database"] = trim(str_replace("DB_DATABASE=", "", $line));
        }
        if (strpos($line, "DB_USERNAME=") !== false) {
            $config["username"] = trim(str_replace("DB_USERNAME=", "", $line));
        }
        if (strpos($line, "DB_PASSWORD=") !== false) {
            $config["password"] = trim(str_replace("DB_PASSWORD=", "", $line));
        }
    }
}

echo json_encode($config);