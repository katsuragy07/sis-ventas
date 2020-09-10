<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];


    $query = "SELECT * FROM clientes WHERE idcliente = '$clave';";
    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'id' => $row['idcliente'],
            'nombre' => $row['nombre'],
            'apellido_pat' => $row['apellido_pat'],
            'apellido_mat' => $row['apellido_mat'],
            'tipo_doc' => $row['tipo_doc'],
            'nro_doc' => $row['nro_doc'],
            'direccion' => $row['direccion'],
            'telefono' => $row['telefono'],
            'correo' => $row['correo']
        );
        
       
    }
    
    echo json_encode($json);





?>