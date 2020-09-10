<?php

    require_once "../../connect.php";

    $idsubcat = $_POST['id'];
    $editURL = $_POST['editURLimg'];
    

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
    //Modo de uso 
    $caracteristicas = saltoLinea($caracteristicas);
    

    
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
                $targetPath = "../../../img/upload/productos/".$fileName;
                if(move_uploaded_file($sourcePath,$targetPath)){
                    $uploadedFile = $fileName;
                    $resultadoUP = true;
                }
            }
        }
        
        if($resultadoUP){
            $query = "INSERT INTO productos(codigo_prod,nombre_prod,caracteristicas,rentabilidad,proceso_des,stock,precio_prov_uni,precio_vent_uni,habilitado,producto_subcategoria_idsubcat_prod ";   
        }
    }else{
        $query = "INSERT INTO productos(codigo_prod,nombre_prod,caracteristicas,rentabilidad,proceso_des,stock,precio_prov_uni,precio_vent_uni,habilitado,producto_subcategoria_idsubcat_prod ";   
        $resultadoUP = true;
    }

        
    if($prov01!=null && $prov01!=""){
        $query .= ",proveedores_idproveedor ";
    }
    if($prov02!=null && $prov02!=""){
        $query .= ",proveedores_idproveedor1 ";
    }
    if($prov03!=null && $prov03!=""){
        $query .= ",proveedores_idproveedor2 ";
    }

    if($editURL){
        $query .= ",url_foto) VALUES ('$codigo','$nombre','$caracteristicas','$rentabilidad','$proc_caracteristicas','$stock','$prec_prov_unidad','$prec_vent_unidad','SI','$idsubcat' ";
    }else{
        $query .= ") VALUES ('$codigo','$nombre','$caracteristicas','$rentabilidad','$proc_caracteristicas','$stock','$prec_prov_unidad','$prec_vent_unidad','SI','$idsubcat' ";
    }
    

    if($prov01!=null && $prov01!=""){
        $query .= ",'$prov01' ";
    }
    if($prov02!=null && $prov02!=""){
        $query .= ",'$prov02' ";
    }
    if($prov03!=null && $prov03!=""){
        $query .= ",'$prov03' ";
    }

    if($editURL){
        $query .= ",'$uploadedFile');";
    }else{
        $query .= ");";
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