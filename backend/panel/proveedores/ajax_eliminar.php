<?php

    require_once "../../connect.php";

    $id = $_POST['id']; 


    $query = "DELETE FROM `proveedores` WHERE `idproveedor`='$id';";
    
   
    $result = $mysqli->query($query);

    /*
    if(is_file($file)){
        unlink($file); //elimino el fichero
    }
    */


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }else{
        echo '200';
    }
 

?>