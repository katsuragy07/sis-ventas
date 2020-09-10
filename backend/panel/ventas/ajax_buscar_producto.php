<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];


    $query = "SELECT * FROM productos WHERE nombre_prod LIKE '%$clave%';";
    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'id' => $row['idproducto'],
            'nombre_prod' => $row['nombre_prod']
        );
        
       
    }
    
    echo json_encode($json);





?>