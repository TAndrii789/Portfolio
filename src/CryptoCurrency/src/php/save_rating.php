<?php
session_start();

// Set headers to allow cross-origin requests, including credentials and specific methods
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request to terminate the script early if it's an OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

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

// Decode the JSON input from the request body
$input = json_decode(file_get_contents('php://input'), true);

// Encode the favoriteCoins data to JSON format
$favoriteCoins = json_encode($input['favoriteCoins']);

// Create a new MySQLi connection to the database
$conn = new mysqli('localhost', 'root', '', 'project');

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

// Prepare an SQL statement to update the rating in the 'autorisation' table where the ID matches the user ID
$sql = "UPDATE autorisation SET rating = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

// Bind the favoriteCoins and user ID parameters to the prepared SQL statement
$stmt->bind_param("si", $favoriteCoins, $user_id);

// Execute the prepared statement and check if it was successful
if ($stmt->execute()) {
    echo json_encode(['status' => 'success']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Failed to save favorite coins']);
}

$stmt->close();
$conn->close();
?>
