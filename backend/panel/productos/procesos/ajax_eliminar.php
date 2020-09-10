<?php

    require_once "../../../connect.php";

    $id = $_POST['id']; 

    $query = "DELETE FROM `procesos` WHERE `idproceso`='$id';";
   
    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }else{
        echo '200';
    }
 

?>