<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar': $query = "SELECT * FROM cajas WHERE estado != 'DESHABILITADO';"; break;

    case 'editar': $id = $_GET['id'];
                   $query = "SELECT * FROM cajas WHERE cajas.idcaja='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'idcaja' => $row['idcaja'],
        'nombre' => $row['nombre'],
        'capital' => $row['capital'],
        'estado' => $row['estado'],
        'fecha_creacion' => $row['fecha_creacion']
    );
    
   
}

echo json_encode($json);



?>