<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';

$conn = getConnection();

$sql = "SELECT id, username, role, active, created_at FROM users WHERE active = 1 ORDER BY created_at DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $users = array();
    while($row = $result->fetch_assoc()) {
        array_push($users, $row);
    }
    echo json_encode($users);
} else {
    echo json_encode([]);
}

$conn->close();