<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];


    $query = "SELECT * FROM proveedores WHERE nombre_prov LIKE '$clave%';";
    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'id' => $row['idproveedor'],
            'nombre_prov' => $row['nombre_prov']
        );
        
       
    }
    
    echo json_encode($json);





?>