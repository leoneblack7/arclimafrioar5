<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$data = json_decode(file_get_contents("php://input"));
$productsFile = __DIR__ . '/../../data/products.json';

if (!empty($data->id)) {
    $products = json_decode(file_get_contents($productsFile), true);
    
    $index = array_search($data->id, array_column($products, 'id'));
    
    if ($index !== false) {
        // Handle image upload if present
        if (!empty($data->image) && strpos($data->image, 'data:image') === 0) {
            $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $data->image));
            $imageName = uniqid() . '.png';
            $imagePath = __DIR__ . '/../../public/lovable-uploads/' . $imageName;
            file_put_contents($imagePath, $imageData);
            $data->image = '/lovable-uploads/' . $imageName;
        }

        // Handle multiple images
        if (!empty($data->images)) {
            $processedImages = [];
            foreach ($data->images as $image) {
                if (strpos($image, 'data:image') === 0) {
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $image));
                    $imageName = uniqid() . '.png';
                    $imagePath = __DIR__ . '/../../public/lovable-uploads/' . $imageName;
                    file_put_contents($imagePath, $imageData);
                    $processedImages[] = '/lovable-uploads/' . $imageName;
                } else {
                    $processedImages[] = $image;
                }
            }
            $data->images = $processedImages;
        }

        $products[$index] = array_merge($products[$index], (array)$data);
        
        if (file_put_contents($productsFile, json_encode($products, JSON_PRETTY_PRINT))) {
            http_response_code(200);
            echo json_encode(["message" => "Product updated successfully."]);
        } else {
            http_response_code(503);
            echo json_encode(["message" => "Unable to update product."]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["message" => "Product not found."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Unable to update product. No ID provided."]);
}
?>