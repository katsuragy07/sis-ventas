<?php

    require_once "../../../connect.php";

    $idproducto = $_POST['id'];
    
    $material = $_POST['proc_MATERIAL'];
    $precio = $_POST['proc_PRECIO'];



    
    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    //Modo de uso 
    //$caracteristicas = saltoLinea($caracteristicas);
    

    $resultadoBD = false;
    
 
    $query = "INSERT INTO procesos(material_proc,precio_proc,productos_idproducto) VALUES('$material','$precio','$idproducto');";   
     

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