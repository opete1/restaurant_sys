<?php
$host = "localhost:3307";
$user = "root";
$password = "";
$dbname = "dbsaidu";

// Create connection
$conn = mysqli_connect($host, $user, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (!$conn->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
} else {
    $conn->character_set_name();
}

?>