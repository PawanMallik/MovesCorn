<?php
require 'db_connect.php';
require '../vendor/autoload.php'; // Ensure this path is correct
 // Ensure PHPMailer is installed via Composer

error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json'); // Ensure the output is JSON

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json'); // Make sure it's JSON

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'] ?? null;

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Email is required"]);
        exit();
    }

    // Ensure this email exists in the database
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "Email not registered"]);
        exit();
    }

    // Generate OTP
    $otp = rand(100000, 999999);
    session_start();
    $_SESSION['forgot_otp'] = $otp;
    $_SESSION['forgot_email'] = $email;

    // Send OTP using PHPMailer
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'whitedevil5531@gmail.com';
        $mail->Password = 'tkxl frub vphm nfak'; // Use App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('whitedevil5531@gmail.com', 'Movie Request System');
        $mail->addAddress($email);
        $mail->Subject = "Your OTP for Password Reset";
        $mail->Body = "Your OTP code is: $otp";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "OTP sent"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Failed to send OTP: " . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
}
?>
