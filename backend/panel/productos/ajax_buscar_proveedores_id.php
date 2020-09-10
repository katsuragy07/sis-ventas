<?php

    require_once "../../connect.php";

    $id = $_GET['idprov'];


    $query = "SELECT * FROM proveedores WHERE idproveedor = '$id';";
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