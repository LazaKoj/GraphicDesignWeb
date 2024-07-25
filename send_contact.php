<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $secretKey = "YOUR_SECRET_KEY";
    $captchaResponse = $_POST['g-recaptcha-response'];

    // Verify the reCAPTCHA response
    $verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($verifyUrl . '?secret=' . $secretKey . '&response=' . $captchaResponse);
    $responseData = json_decode($response);

    if (!$responseData->success) {
        echo "reCAPTCHA verification failed. Please try again.";
        exit;
    }

    $firstName = htmlspecialchars(trim($_POST['first-name']));
    $lastName = htmlspecialchars(trim($_POST['last-name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Construct the email
    $to = "kojiclazar89@gmail.com";
    $subject = "New Contact Form Submission";
    $body = "First Name: $firstName\nLast Name: $lastName\nEmail: $email\nMessage:\n$message";

    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email
    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message.";
    }
} else {
    echo "Invalid request method.";
}
?>
