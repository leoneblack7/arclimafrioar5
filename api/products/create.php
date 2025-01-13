<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$conn = getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !empty($data->title) &&
    !empty($data->price)
) {
    $title = $conn->real_escape_string($data->title);
    $price = $conn->real_escape_string($data->price);
    $image = $conn->real_escape_string($data->image ?? '');
    $images = $conn->real_escape_string(json_encode($data->images ?? []));
    $description = $conn->real_escape_string($data->description ?? '');
    $specifications = $conn->real_escape_string($data->specifications ?? '');
    $is_description_active = $data->isDescriptionActive ? 1 : 0;
    $is_images_active = $data->isImagesActive ? 1 : 0;
    $is_specifications_active = $data->isSpecificationsActive ? 1 : 0;
    
    $sql = "INSERT INTO products (
        title, 
        price, 
        image, 
        images, 
        description, 
        specifications,
        is_description_active,
        is_images_active,
        is_specifications_active
    ) VALUES (
        '$title', 
        $price, 
        '$image', 
        '$images', 
        '$description', 
        '$specifications',
        $is_description_active,
        $is_images_active,
        $is_specifications_active
    )";
    
    if ($conn->query($sql)) {
        http_response_code(201);
        echo json_encode(array("message" => "Product created successfully."));
    } else {
        http_response_code(503);
        echo json_encode(array("message" => "Unable to create product."));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Unable to create product. Data is incomplete."));
}

$conn->close();