<?php

    require_once "../../../connect.php";
    date_default_timezone_set("America/Lima");
    
    $idapago = $_POST['id'];

    $monto = $_POST['pago_total'];
    $idcajero = $_POST['inputCAJA-hidden'];
    $idcaja = $_POST['movimiento_caja'];


    $resultadoBD = false;

    $rs = $mysqli->query("SELECT cajas.capital FROM cajas WHERE idcaja = '$idcaja'");
    if ($row = $rs->fetch_array()) {
        $capital_act = trim($row['capital']);
        $capital_act = floatval($capital_act);
    }

    $query_operacion = $capital_act + $monto;
    $query = "INSERT INTO movimientos(tipo,monto,concepto,autoriza,fecha_mov,tipo_comprobante,nro_comprobante,cajas_idcaja,usuarios_idusuario) VALUES ('INGRESO','$monto','PAGO DE CUOTA DE CREDITO','CAJERO',now(),'VOUCHER','$idapago','$idcaja','$idcajero');"; 
    $query .= "UPDATE `cajas` SET `capital`='$query_operacion' WHERE `idcaja` = '$idcaja';";
    $query .= "UPDATE `pagos` SET `monto`='$monto',`fecha`=now(), `usuarios_idusuario`='$idcajero' WHERE `idpago`='$idapago';";
    
    $result = $mysqli->multi_query($query);
   


    if($result){
        echo '200';
    }else{
        die("Query error " . mysqli_error($mysqli));
    }


?>