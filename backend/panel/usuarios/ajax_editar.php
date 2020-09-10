<?php

    require_once "../../connect.php";

    $id = $_POST['id']; 
    $editURL = $_POST['editURLimg'];

    $privilegios = $_POST['inputPRIV'];
    $apellido_pat = $_POST['inputAP'];
    $apellido_mat = $_POST['inputAM'];
    $nombres = $_POST['inputNOM'];
    $dni = $_POST['inputDNI'];
    $user = $_POST['inputUSER'];
    $pass = $_POST['inputPASS'];
    $telefono = $_POST['inputTEL'];
    $direccion = $_POST['inputDIR'];
    $correo = $_POST['inputEMAIL'];


    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    //$comentarios = saltoLinea($comentarios);

    $resultadoUP = false;
    $resultadoBD = false;


    if($editURL){
        $uploadedFile = '';
        if(!empty($_FILES["inputIMG"]["type"])){
            $fileName = uniqid();
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["inputIMG"]["name"]);
            $file_extension = strtolower(end($temporary));
            $fileName = $fileName.".".$file_extension;
            if((($_FILES["inputIMG"]["type"] == "video/mp4") || ($_FILES["inputIMG"]["type"] == "video/webm") || ($_FILES["inputIMG"]["type"] == "video/ogv") || ($_FILES["inputIMG"]["type"] == "image/png") || ($_FILES["inputIMG"]["type"] == "image/jpg") || ($_FILES["inputIMG"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['inputIMG']['tmp_name'];
                $targetPath = "../../../img/upload/usuarios/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $resultadoUP = true;
                }
            }
        }
        
        if($resultadoUP){
            $query = "UPDATE `usuarios` SET `privilegios`='$privilegios',`apellido_pat`='$apellido_pat',`apellido_mat`='$apellido_mat',`nombre`='$nombres',`doc_nro`='$dni',`usuario`='$user',`pass`='$pass',`telefono`='$telefono',`direccion`='$direccion',`correo`='$correo',`url_foto`='$uploadedFile' WHERE `idusuario`='$id';";
        }
    }else{
        $query = "UPDATE `usuarios` SET `privilegios`='$privilegios',`apellido_pat`='$apellido_pat',`apellido_mat`='$apellido_mat',`nombre`='$nombres',`doc_nro`='$dni',`usuario`='$user',`pass`='$pass',`telefono`='$telefono',`direccion`='$direccion',`correo`='$correo' WHERE `idusuario`='$id';";
            $resultadoUP = true;
    }


    if($resultadoUP){
        $result = $mysqli->query($query);
        if(!$result){
            die("Query error " . mysqli_error($mysqli));
        }else{
            $resultadoBD = true;
        }
    }


    if($resultadoUP){
        if($resultadoBD){
            echo '200';
        }else{
            echo '302';
        }
    }else{
        echo '301';
    }


?>