<?php
session_start();

// Set headers to allow cross-origin requests from a specific origin and enable credentials
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

// Log the session ID and user ID for debugging purposes
error_log("Session ID: " . session_id());
error_log("User ID: " . (isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'Not Set'));

// Check if the user is authenticated by verifying the presence of 'user_id' in the session
if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not authenticated']);
    exit();
}

// Get the user ID from the session
$user_id = $_SESSION['user_id'];

$conn = new mysqli('localhost', 'root', '', 'project');

// Check if the database connection failed
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

// Prepare an SQL statement to select the rating from the 'autorisation' table where the ID matches the user ID
$sql = "SELECT rating FROM autorisation WHERE id = ?";
$stmt = $conn->prepare($sql);

// Bind the user ID parameter to the prepared SQL statement
$stmt->bind_param("i", $user_id);

// Execute the prepared statement
$stmt->execute();

// Bind the result of the query to the $favoriteCoins variable
$stmt->bind_result($favoriteCoins);

// Fetch the result from the executed statement
$stmt->fetch();

echo json_encode(['status' => 'success', 'favoriteCoins' => json_decode($favoriteCoins)]);

$stmt->close();
$conn->close();
?>
