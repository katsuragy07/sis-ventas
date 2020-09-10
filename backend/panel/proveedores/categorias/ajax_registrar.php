<?php

    require_once "../../../connect.php";

    
    $nombres = $_POST['inputNOM'];
    $comentarios = $_POST['inputCOM'];

    
    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    //Modo de uso 
    $comentarios = saltoLinea($comentarios);
    


    $resultadoBD = false;

    $query = "INSERT INTO proveedor_categoria(nombre_cat,descripcion) VALUES ('$nombres','$comentarios');";   
    
   
    
    $result = $mysqli->query($query);

    
    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }else{
        $resultadoBD = true;
    }
 
    if($resultadoBD){
        echo '200';
    }else{
        echo '302';
    }
 
    








?>