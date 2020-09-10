<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "SELECT ifnull(sum(precio_proc),0) AS suma_precio FROM procesos WHERE productos_idproducto = '$id';"; break;
    case 'editar':  $id = $_GET['id'];
                    $query = "SELECT * FROM procesos WHERE idproceso = '$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'suma_precio' => $row['suma_precio']
    );
    
   
}

echo json_encode($json);



?>