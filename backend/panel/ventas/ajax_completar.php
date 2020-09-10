<?php
    session_start();

    require_once "../../connect.php";

    $idusuario = $_SESSION['id'];
    $idventa = $_POST['id'];
    $idcaja = $_POST['movimiento_caja'];

    $adelanto = $_POST['cot_adelanto'];
    $resto = $_POST['cot_resto'];
    $total = $_POST['cot_TOTAL'];

    $tipo_pago = $_POST['cot_tipo_pago2'];


    $rs = $mysqli->query("SELECT cajas.capital FROM cajas WHERE idcaja = '$idcaja'");
    if ($row = $rs->fetch_array()) {
        $capital_act = trim($row['capital']);
        $capital_act = floatval($capital_act);
    }
    if(!$rs){
        die("Hubo un problema al buscar la Caja");
    }


   

    $resultadoBD = false;


    $query = "";
    $query .= "UPDATE ventas SET estado = 'COMPLETADO' WHERE idventa='$idventa';";  
     
 
    $query_operacion = $capital_act + $resto;

    $query .= "INSERT INTO movimientos(tipo,monto,concepto,detalle,autoriza,fecha_mov,tipo_comprobante,nro_comprobante,cajas_idcaja,usuarios_idusuario) VALUES ('INGRESO','$resto','VENTA FINALIZADA','$tipo_pago','CAJERO',now(),'VOUCHER','','$idcaja','$idusuario');"; 
    $query .= "UPDATE `cajas` SET `capital`='$query_operacion' WHERE `idcaja` = '$idcaja';";


    $result = $mysqli->multi_query($query);


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