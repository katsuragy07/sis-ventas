<?php

    require_once "../../connect.php";

    $id = $_POST['id']; 
    $editURL = $_POST['editURLimg'];

    $url = $_POST['url_img'];
    $file = '../../../img/upload/productos/'.$url;

    $codigo = $_POST['inputCOD'];
    $nombre = $_POST['inputNOM'];
    $caracteristicas = $_POST['inputCOM'];
    $stock = $_POST['inputSTOCK'];

    $rentabilidad = $_POST['sum_proc_rentabilidad'];
    $proc_caracteristicas = $_POST['inputPROC_COM'];

    $prov01 = $_POST['inputPROV1-hidden'];
    $prov02 = $_POST['inputPROV2-hidden'];
    $prov03 = $_POST['inputPROV3-hidden'];
   
    

    $prec_prov_unidad = $_POST['input_PRECIO_PROV_UNIDAD'];
 
    $prec_vent_unidad = $_POST['input_PRECIO_VENT_UNIDAD'];



    function saltoLinea($str) { 
        return str_replace(array("\r\n", "\r", "\n"), "<br />", $str); 
    }  
    $caracteristicas = saltoLinea($caracteristicas);

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
                $targetPath = "../../../img/upload/productos/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $resultadoUP = true;
                }
            }
        }
        
        if($resultadoUP){
            $query = "UPDATE `productos` SET `codigo_prod`='$codigo',`nombre_prod`='$nombre',`caracteristicas`='$caracteristicas',`rentabilidad`='$rentabilidad',`proceso_des`='$proc_caracteristicas',`stock`='$stock',`precio_prov_uni`='$prec_prov_unidad',`precio_vent_uni`='$prec_vent_unidad',`url_foto`='$uploadedFile' ";
            if(is_file($file)){
                unlink($file); //elimino el fichero
            }
        }
    }else{
        $query = "UPDATE `productos` SET `codigo_prod`='$codigo',`nombre_prod`='$nombre',`caracteristicas`='$caracteristicas',`rentabilidad`='$rentabilidad',`proceso_des`='$proc_caracteristicas',`stock`='$stock',`precio_prov_uni`='$prec_prov_unidad',`precio_vent_uni`='$prec_vent_unidad'";
            $resultadoUP = true;
    }


    if($prov01!=null && $prov01!=""){
        $query .= ",`proveedores_idproveedor`='$prov01' ";
    }else{
        $query .= ",`proveedores_idproveedor`= NULL ";
    }
    if($prov02!=null && $prov02!=""){
        $query .= ",`proveedores_idproveedor1`='$prov02' ";
    }else{
        $query .= ",`proveedores_idproveedor1`= NULL ";
    }
    if($prov03!=null && $prov03!=""){
        $query .= ",`proveedores_idproveedor2`='$prov03' ";
    }else{
        $query .= ",`proveedores_idproveedor2`= NULL ";
    }

    $query .= "WHERE `idproducto`='$id';";


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