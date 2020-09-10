<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];
    $tipo = $_GET['tipo'];

    if($tipo=="DNI"){
        $query = "SELECT * FROM clientes WHERE nro_doc LIKE '$clave%';";
    }else{
        $query = "SELECT * FROM clientes WHERE concat(nombre,' ',apellido_pat,' ',apellido_mat) LIKE '%$clave%';";
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