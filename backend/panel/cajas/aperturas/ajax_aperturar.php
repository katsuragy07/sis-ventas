<?php

    require_once "../../../connect.php";
    date_default_timezone_set("America/Lima");

    $idcaja = $_POST['idcaja']; 
    $idusuario = $_POST['idusuario'];
    $operacion = $_POST['operacion'];

    $monto = $_POST['monto'];


    if($operacion){
        $query = "UPDATE `cajas` SET `estado`='ABIERTO', `capital`='$monto' WHERE `idcaja`='$idcaja';";
        $query .= "INSERT INTO aperturas(fecha_apertura,monto_apertura,cajas_idcaja,usuarios_idusuario) VALUES (now(),'$monto','$idcaja','$idusuario');";
    }else{
        $query = "UPDATE `cajas` SET `estado`='CERRADO', `capital`='$monto' WHERE `idcaja`='$idcaja';";
        $query .= "UPDATE `aperturas` SET `fecha_cierre` = now(), `monto_cierre`='$monto' WHERE `idapertura` = (SELECT idapertura FROM (SELECT * FROM aperturas WHERE cajas_idcaja = '$idcaja' ORDER BY idapertura DESC LIMIT 1) as x);";
    }
    
   
    $result = $mysqli->multi_query($query);

    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }else{
        echo '200';
    }
 

?>