<?php
// Replace with your actual database connection code
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "form";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = $_GET["query"];

// Replace 'your_table_name' with the actual table name
$sql = "SELECT suggestion_name FROM suggestion WHERE suggestion_name LIKE '$query%'";
$result = $conn->query($sql);

$suggestions = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $suggestions[] = $row["suggestion_name"];
    }
}

echo json_encode($suggestions);

$conn->close();
?>
