<?php

$serverNaame = "localhost";
$dbUser = "root";
$dbPass = "";
$dbName = "dbsaidu";

$conn = mysqli_connect($serverNaame,$dbUser,$dbPass,$dbName);
$sql = "SELECT * FROM product;";
$result = mysqli_query($conn, $sql);
$json_array = array();

while($row = mysqli_fetch_assoc($result)){
    $json_array[] = $row;
};

echo json_encode($json_array);