<?php

    require_once "../../connect.php";

    $tipo = $_POST['inputCOT'];
    $con_cot = false;

    if($tipo=="SI"){
        $con_cot = true;
        $nro_cot = $_POST['inputNRO_COT'];
    }else{
        $con_cot = false;
    }

    $adelanto = $_POST['cot_adelanto'];
    $total = $_POST['cot_TOTAL'];
    $idusuario = $_POST['inputUSER-hidden'];
    $idcliente = $_POST['inputCLIENT-hidden'];
    $idcaja = $_POST['movimiento_caja'];

    $igv = $_POST['cot_IGV'];
    $entrega = $_POST['inputENTREGA'];
    $comprobante = $_POST['inputCOMPROBANTE'];
    $tipo_pago = $_POST['cot_tipo_pago1'];


    $cant1 = $_POST['cot_CANT1'];
    $prod1 = $_POST['cot_PROD1-hidden'];
 
    $pu1 = $_POST['cot_PU1'];
    $st1 = $_POST['cot_ST1'];

    $cant2 = $_POST['cot_CANT2'];
    $prod2 = $_POST['cot_PROD2-hidden'];

    $pu2 = $_POST['cot_PU2'];
    $st2 = $_POST['cot_ST2'];

    $cant3 = $_POST['cot_CANT3'];
    $prod3 = $_POST['cot_PROD3-hidden'];
   
    $pu3 = $_POST['cot_PU3'];
    $st3 = $_POST['cot_ST3'];

    $cant4 = $_POST['cot_CANT4'];
    $prod4 = $_POST['cot_PROD4-hidden'];

    $pu4 = $_POST['cot_PU4'];
    $st4 = $_POST['cot_ST4'];

    $cant5 = $_POST['cot_CANT5'];
    $prod5 = $_POST['cot_PROD5-hidden'];
    
    $pu5 = $_POST['cot_PU5'];
    $st5 = $_POST['cot_ST5'];


    $rs = $mysqli->query("SELECT cajas.capital FROM cajas WHERE idcaja = '$idcaja'");
    if ($row = $rs->fetch_array()) {
        $capital_act = trim($row['capital']);
        $capital_act = floatval($capital_act);
    }
    if(!$rs){
        die("Hubo un problema al buscar la Caja");
    }


    $query = "";
    $query .= "INSERT INTO ventas(fecha_reg,estado,total,clientes_idcliente,usuarios_idusuario,igv,entrega_vent,comprobante_vent,adelanto,tipo_pago_adelanto,p1_cant,p1_pu,p1_st,p2_cant,p2_pu,p2_st,p3_cant,p3_pu,p3_st,p4_cant,p4_pu,p4_st,p5_cant,p5_pu,p5_st";  

    if($prod1!=""){
        $query .= ",productos_idproducto";
    }
    if($prod2!=""){
        $query .= ",productos_idproducto1";
    }
    if($prod3!=""){
        $query .= ",productos_idproducto2";
    }
    if($prod4!=""){
        $query .= ",productos_idproducto3";
    }
    if($prod5!=""){
        $query .= ",productos_idproducto4";
    }

    $query .= ") VALUES (now(),'CONTRATADO','$total','$idcliente','$idusuario','$igv','$entrega','$comprobante','$adelanto','$tipo_pago','$cant1','$pu1','$st1','$cant2','$pu2','$st2','$cant3','$pu3','$st3','$cant4','$pu4','$st4','$cant5','$pu5','$st5'";  

    if($prod1!=""){
        $query .= ",$prod1";  
    }
    if($prod2!=""){
        $query .= ",$prod2";
    }
    if($prod3!=""){
        $query .= ",$prod3";
    }
    if($prod4!=""){
        $query .= ",$prod4";
    }
    if($prod5!=""){
        $query .= ",$prod5";
    }

    $query .= ");";

    
    
    if($con_cot){
        $query .= "UPDATE cotizaciones SET estado='ATENDIDO' WHERE idcotizacion='$nro_cot';";
    }


    $query_operacion = $capital_act + $adelanto;
    $query .= "INSERT INTO movimientos(tipo,monto,concepto,detalle,autoriza,fecha_mov,tipo_comprobante,nro_comprobante,cajas_idcaja,usuarios_idusuario) VALUES ('INGRESO','$adelanto','VENTA CONTRATA','$tipo_pago','CAJERO',now(),'VOUCHER','','$idcaja','$idusuario');"; 
    $query .= "UPDATE `cajas` SET `capital`='$query_operacion' WHERE `idcaja` = '$idcaja';";


    
    $resultadoBD = false;

 
    //$query = "INSERT INTO cotizaciones(fecha_reg,estado,total,clientes_idcliente,usuarios_idusuario,p1_cant,p1_pu,p1_pc,p1_pm,p1_st,p2_cant,p2_pu,p2_pc,p2_pm,p2_st,p3_cant,p3_pu,p3_pc,p3_pm,p3_st,p4_cant,p4_pu,p4_pc,p4_pm,p4_st,p5_cant,p5_pu,p5_pc,p5_pm,p5_st,productos_idproducto,productos_idproducto1,productos_idproducto2,productos_idproducto3,productos_idproducto4) VALUES (now(),'EMITIDO','$total','$idcliente','$idusuario','$cant1','$pu1','$pc1','$pm1','$st1','$cant2','$pu2','$pc2','$pm2','$st2','$cant3','$pu3','$pc3','$pm3','$st3','$cant4','$pu4','$pc4','$pm4','$st4','$cant5','$pu5','$pc5','$pm5','$st5',$prod1,$prod2,null,null,null);";  
     

    $result = $mysqli->multi_query($query);

    
    if(!$result){
        //echo $query;
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