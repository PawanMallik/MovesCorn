<?php
session_start();
require 'db_connect.php';


error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json'); // Ensure the output is JSON


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'] ?? null;
    $otp = $_POST['otp'] ?? null;
    $new_password = $_POST['new_password'] ?? null;

    if (!$email || !$otp || !$new_password) {
        echo json_encode(["status" => "error", "message" => "All fields are required"]);
        exit();
    }

    // Verify OTP
    if (!isset($_SESSION['forgot_otp']) || $_SESSION['forgot_otp'] != $otp || $_SESSION['forgot_email'] != $email) {
        echo json_encode(["status" => "error", "message" => "Invalid OTP"]);
        exit();
    }

    // Hash new password
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

    // Update password in database
    $sql = "UPDATE users SET password = ? WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $hashed_password, $email);

    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error: " . $stmt->error]);
    }

    // Clear OTP session
    unset($_SESSION['forgot_otp']);
    unset($_SESSION['forgot_email']);

    $stmt->close();
    $conn->close();
}
?>
