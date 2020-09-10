<?php

    require_once "../../connect.php";

    $id = $_POST['id']; 
    $editURL = $_POST['editURLimg'];

    $tipo_doc = $_POST['inputTIPO_DOC'];
    $nro_doc = $_POST['inputNRO_DOC'];
    $empresa = $_POST['inputEMP'];
    $apellido_pat = $_POST['inputAP'];
    $apellido_mat = $_POST['inputAM'];
    $nombres = $_POST['inputNOM'];
    $direccion = $_POST['inputDIR'];
    $comentario = $_POST['inputCOM'];
    $telefono = $_POST['inputTEL'];
    $email = $_POST['inputEMAIL'];


    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    $comentario = saltoLinea($comentario);

    $resultadoUP = false;
    $resultadoBD = false;


    if($editURL){
        $uploadedFile1 = '';
        if(!empty($_FILES["inputIMG"]["type"])){
            $fileName = uniqid();
            $valid_extensions = array("jpeg", "jpg", "png");
            $temporary = explode(".", $_FILES["inputIMG"]["name"]);
            $file_extension = strtolower(end($temporary));
            $fileName = $fileName.".".$file_extension;
            if((($_FILES["inputIMG"]["type"] == "video/mp4") || ($_FILES["inputIMG"]["type"] == "video/webm") || ($_FILES["inputIMG"]["type"] == "video/ogv") || ($_FILES["inputIMG"]["type"] == "image/png") || ($_FILES["inputIMG"]["type"] == "image/jpg") || ($_FILES["inputIMG"]["type"] == "image/jpeg")) && in_array($file_extension, $valid_extensions)){
                $sourcePath = $_FILES['inputIMG']['tmp_name'];
                $targetPath = "../../../img/upload/clientes/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $resultadoUP = true;
                }
            }
        }   
    }



    if($editURL){
        $query = "UPDATE `clientes` SET `tipo_doc`='$tipo_doc',`nro_doc`='$nro_doc',`empresa`='$empresa',`apellido_pat`='$apellido_pat',`apellido_mat`='$apellido_mat',`nombre`='$nombres',`direccion`='$direccion',`comentario`='$comentario',`telefono`='$telefono',`correo`='$email',`url_foto`='$uploadedFile' WHERE `idcliente`='$id';";
    }else{
        $query = "UPDATE `clientes` SET `tipo_doc`='$tipo_doc',`nro_doc`='$nro_doc',`empresa`='$empresa',`apellido_pat`='$apellido_pat',`apellido_mat`='$apellido_mat',`nombre`='$nombres',`direccion`='$direccion',`comentario`='$comentario',`telefono`='$telefono',`correo`='$email' WHERE `idcliente`='$id';";
        $resultadoUP = true;
    }

 
    $result = $mysqli->query($query);

    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }else{
        $resultadoBD = true;
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