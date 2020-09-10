<?php

require_once "../../connect.php";

switch($_GET['consulta']){
    case 'buscar': $query = 'SELECT * FROM clientes ORDER BY idcliente DESC;'; break;
    case 'editar': $id = $_GET['id'];
                   $query = "SELECT * FROM clientes WHERE idcliente='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'id' => $row['idcliente'],
        'tipo_doc' => $row['tipo_doc'],
        'nro_doc' => $row['nro_doc'],
        'empresa' => $row['empresa'],
        'apellido_pat' => $row['apellido_pat'],
        'apellido_mat' => $row['apellido_mat'],
        'nombre' => $row['nombre'],
        'direccion' => $row['direccion'],
        'comentario' => $row['comentario'],     
        'url_foto' => $row['url_foto'],   
        'telefono' => $row['telefono'],
        'habilitado' => $row['habilitado'],
        'correo' => $row['correo']  
    );
    
   
}

echo json_encode($json);



?>