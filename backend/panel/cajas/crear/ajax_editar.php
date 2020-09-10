<?php

    require_once "../../../connect.php";

    $idcaja = $_POST['id'];
    $caja_nombre = $_POST['caja_nombre-edt'];
    $caja_capital = $_POST['caja_capital-edt'];


    $resultadoBD = false;


    $query = "UPDATE `cajas` SET `nombre`='$caja_nombre' WHERE idcaja = '$idcaja';";
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