<?php

    require_once "../../../connect.php";

    $id = $_POST['id']; 
    $nombres = $_POST['inputNOM'];
    $comentarios = $_POST['inputCOM'];


    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    $comentarios = saltoLinea($comentarios);

   
    $resultadoBD = false;

    $query = "UPDATE `producto_categoria` SET `nombre_cat`='$nombres',`descripcion`='$comentarios' WHERE `idcat_prod`='$id';";

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