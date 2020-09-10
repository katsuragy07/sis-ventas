<?php

    require_once "../../../connect.php";
    date_default_timezone_set("America/Lima");

    $caja_nombre = $_POST['caja_nombre'];
    $caja_capital = $_POST['caja_capital'];
    
    $resultadoBD = false;

    
    $query = "INSERT INTO cajas(nombre,capital,estado,fecha_creacion) VALUES ('$caja_nombre','$caja_capital','DESHABILITADO', NOW());"; 
    $result = $mysqli->query($query);

    

    if($result){
        $resultadoBD = true;
    }else{   
        die("Query error " . mysqli_error($mysqli));
        $resultadoBD = false;
    }


    if($resultadoBD){
        echo '200';
    }else{
        echo '302';
    }
  







?>