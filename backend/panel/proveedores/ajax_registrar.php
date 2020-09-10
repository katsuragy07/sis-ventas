<?php

    require_once "../../connect.php";

    $idsubcat = $_POST['id'];

    $ruc = $_POST['inputRUC'];
    $nombre = $_POST['inputNOM'];

    $responsable = $_POST['inputRESP'];
    $direccion = $_POST['inputDIR'];
    $email = $_POST['inputEMAIL'];
    $telefono = $_POST['inputTEL'];
    $celular = $_POST['inputCEL'];
    $banco1 = $_POST['input_BN1'];
    $banco2 = $_POST['input_BN2'];
    $banco3 = $_POST['input_BN3'];
    $banco4 = $_POST['input_BN4'];
    $cuenta1 = $_POST['input_NRO1'];
    $cuenta2 = $_POST['input_NRO2'];
    $cuenta3 = $_POST['input_NRO3'];
    $cuenta4 = $_POST['input_NRO4'];

    $observaciones = $_POST['inputCOM'];
    

    
    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    //Modo de uso 
    $observaciones = saltoLinea($observaciones);
    

    $resultadoBD = false;
    
   
    $query = "INSERT INTO proveedores(ruc,nombre_prov,responsable,direccion,correo,telefono,celular,banco1,banco2,banco3,banco4,cuenta1,cuenta2,cuenta3,cuenta4,observaciones,proveedor_subcategoria_idsubcat_prov) VALUES ('$ruc','$nombre','$responsable','$direccion','$email','$telefono','$celular','$banco1','$banco2','$banco3','$banco4','$cuenta1','$cuenta2','$cuenta3','$cuenta4','$observaciones','$idsubcat');";   
    
        
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