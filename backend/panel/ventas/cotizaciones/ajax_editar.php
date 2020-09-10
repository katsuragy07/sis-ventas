<?php

    require_once "../../../connect.php";

    $idcotizacion = $_POST['id'];

    $total = $_POST['cot_TOTAL'];
    $idusuario = $_POST['inputUSER-hidden'];
    $idcliente = $_POST['inputCLIENT-hidden'];

    $igv = $_POST['cot_IGV'];
    $validez = $_POST['inputVALIDEZ'];
    $entrega = $_POST['inputENTREGA'];
    $comprobante = $_POST['inputCOMPROBANTE'];


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


    $resultadoBD = false;


    $query = "";
    $query .= "UPDATE cotizaciones SET total='$total',clientes_idcliente='$idcliente',usuarios_idusuario='$idusuario',igv='$igv',validez_prof='$validez',entrega_prof='$entrega',comprobante_prof='$comprobante',p1_cant='$cant1',p1_pu='$pu1',p1_st='$st1',p2_cant='$cant2',p2_pu='$pu2',p2_st='$st2',p3_cant='$cant3',p3_pu='$pu3',p3_st='$st3',p4_cant='$cant4',p4_pu='$pu4',p4_st='$st4',p5_cant='$cant5',p5_pu='$pu5',p5_st='$st5'";  

    if($prod1!=""){
        $query .= ",productos_idproducto='$prod1'";
    }else{
        $query .= ",productos_idproducto=NULL";
    }
    if($prod2!=""){
        $query .= ",productos_idproducto1='$prod2'";
    }else{
        $query .= ",productos_idproducto1=NULL";
    }
    if($prod3!=""){
        $query .= ",productos_idproducto2='$prod3'";
    }else{
        $query .= ",productos_idproducto2=NULL";
    }
    if($prod4!=""){
        $query .= ",productos_idproducto3='$prod4'";
    }else{
        $query .= ",productos_idproducto3=NULL";
    }
    if($prod5!=""){
        $query .= ",productos_idproducto4='$prod5'";
    }else{
        $query .= ",productos_idproducto4=NULL";
    }

    $query .= " WHERE idcotizacion='$idcotizacion';";  
     
 
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