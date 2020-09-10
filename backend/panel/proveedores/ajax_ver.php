<?php

require_once "../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "SELECT * FROM proveedores WHERE proveedor_subcategoria_idsubcat_prov = '$id' ORDER BY idproveedor DESC;"; break;
    case 'editar':  $id = $_GET['id'];
                    $query = "SELECT * FROM proveedores WHERE idproveedor = '$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'idproveedor' => $row['idproveedor'],
        'ruc' => $row['ruc'],
        'nombre_prov' => $row['nombre_prov'],
        'responsable' => $row['responsable'],
        'direccion' => $row['direccion'],
        'correo' => $row['correo'],
        'telefono' => $row['telefono'],
        'celular' => $row['celular'],
        'banco1' => $row['banco1'],
        'banco2' => $row['banco2'],
        'banco3' => $row['banco3'],
        'banco4' => $row['banco4'],
        'cuenta1' => $row['cuenta1'],
        'cuenta2' => $row['cuenta2'],
        'cuenta3' => $row['cuenta3'],
        'cuenta4' => $row['cuenta4'],
        'observaciones' => $row['observaciones']
    );
    
   
}

echo json_encode($json);



?>