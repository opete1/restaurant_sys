<?php
require_once "connect.php";

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

//==================================== PRODUCTS
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['products'])){
    $sql = "SELECT p.prd_id, p.prdname, p.cat_id, format(prm.price,2) AS priceM,format(prl.price,2) AS priceL
FROM   dbsaidu.product p  
        LEFT JOIN     dbsaidu.productsprice prm ON prm.prd_id = p.prd_id
        LEFT JOIN     dbsaidu.productsprice prl ON prl.prd_id = p.prd_id
WHERE   prm.attr_id = 1 AND prl.attr_id = 2  
 order by 
    p.prd_id,p.prdname,p.cat_id,priceM,priceL";
    $result = mysqli_query($conn, $sql);
    
    $data = array();
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
              $data[] = $row;
        }
    }
    
   echo json_encode($data);

}

// CATEGORIES ROUTE
if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['categories'])){
    $sql = "SELECT * FROM productscategorie WHERE catimage IS NOT NULL order by cat_id";
    $result = mysqli_query($conn, $sql);
    
    $data = array();
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $encoded_data = base64_encode($row['catimage']);
            $row['catimage'] = $encoded_data;
            $data[] = $row;
        }
    }
    
   echo json_encode($data);

}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['extras'])){
    $sql = "SELECT pe.prdext_id,
    pe.cat_id,
    prdname,
    extprice
    FROM dbsaidu.productsextra pe;";
    $result = mysqli_query($conn, $sql);
    
    $data = array();
    
    if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
    }
    
   echo json_encode($data);

}

mysqli_close($conn);


?>