<?php
session_start();
require 'db_connect.php';  // Ensure this file exists in the same folder

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $full_name = $_POST["full_name"] ?? "";
    $email = $_POST["email"] ?? "";
    $movie_name = $_POST["movie_name"] ?? "";
    $note = $_POST["note"] ?? "";

    if (empty($full_name) || empty($email) || empty($movie_name)) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    $stmt = $conn->prepare("INSERT INTO movie_requests (full_name, email, movie_name, note) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $full_name, $email, $movie_name, $note);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }

    $stmt->close();
    $conn->close();
}
?>
