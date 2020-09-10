<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "SELECT * FROM procesos WHERE productos_idproducto = '$id' ORDER BY idproceso DESC;"; break;
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
        'idproceso' => $row['idproceso'],
        'material_proc' => $row['material_proc'],
        'precio_proc' => $row['precio_proc']
    );
    
   
}

echo json_encode($json);



?>