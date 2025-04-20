<?php
session_start();
require 'db_connect.php'; // Make sure db_connect.php is correct

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $password = $_POST['password'] ?? null;
    $otp = $_POST['otp'] ?? null;

    if (!$username || !$email || !$password || !$otp) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    // Check OTP from session
    if (!isset($_SESSION['otp']) || $_SESSION['otp'] != $otp) {
        echo json_encode(["status" => "error", "message" => "Invalid OTP"]);
        exit();
    }

    // Hash password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into the database
    $sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Signup successful"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
