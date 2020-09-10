<?php

    require_once "../../connect.php";

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
    //Modo de uso 
    $comentario = saltoLinea($comentario);
    

    
    $resultadoUP = false;
    $resultadoBD = false;

    
    $uploadedFile = '';


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
                $targetPath = "../../../img/upload/clientes/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $resultadoUP = true;
                }
            }
        }   
    }
    

    if($editURL){
        $query = "INSERT INTO clientes(tipo_doc,nro_doc,empresa,apellido_pat,apellido_mat,nombre,direccion,comentario,telefono,correo,habilitado,url_foto) VALUES ('$tipo_doc','$nro_doc','$empresa','$apellido_pat','$apellido_mat','$nombres','$direccion','$comentario','$telefono','$email','SI','$uploadedFile');";  
    }else{
        $query = "INSERT INTO clientes(tipo_doc,nro_doc,empresa,apellido_pat,apellido_mat,nombre,direccion,comentario,telefono,correo,habilitado) VALUES ('$tipo_doc','$nro_doc','$empresa','$apellido_pat','$apellido_mat','$nombres','$direccion','$comentario','$telefono','$email','SI');";  
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