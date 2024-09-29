<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data)) {
        $email = $data['email'];
        $password = $data['password'];

        // Database connection details
        $servername = "localhost";
        $username = "root";
        $password_db = ""; 
        $dbname = "project";

        $conn = new mysqli($servername, $username, $password_db, $dbname);

        if ($conn->connect_error) {
            throw new Exception('Database connection failed: ' . $conn->connect_error);
        }

        // Prepare the SQL statement to retrieve the hashed password
        $stmt = $conn->prepare("SELECT password FROM autorisation WHERE email = ?");
        $stmt->bind_param("s", $email);

        // Execute the statement
        $stmt->execute();

        // Get the result
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Fetch the hashed password from the database
            $row = $result->fetch_assoc();
            $hashed_password = $row['password'];

            // Verify the provided password against the stored hashed password
            if (password_verify($password, $hashed_password)) {
                echo json_encode(['status' => 'success', 'message' => 'Password is correct']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Invalid password']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'No user found with that email']);
        }

        // Close the statement and connection
        $stmt->close();
        $conn->close();
    } else {
        throw new Exception('Invalid request');
    }
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>
