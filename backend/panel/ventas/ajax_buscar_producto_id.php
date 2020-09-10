<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];


    $query = "SELECT * FROM productos WHERE idproducto = '$clave';";
    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'id' => $row['idproducto'],
            'codigo_prod' => $row['codigo_prod'],
            'nombre_prod' => $row['nombre_prod'],
            'caracteristicas' => $row['caracteristicas'],
            'stock' => $row['stock'],
            'url_img' => $row['url_foto'],
            'precio_vent_unidad' => $row['precio_vent_uni']
        );
        
       
    }
    
    echo json_encode($json);





?>