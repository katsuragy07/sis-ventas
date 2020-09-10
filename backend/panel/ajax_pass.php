<?php

session_start();
require_once "../connect.php";

$id =  $_SESSION['id'];
$pass =  $_POST['pass'];


$query1 = "SELECT * FROM usuarios WHERE idusuario = '$id';";
$result1 = $mysqli->query($query1);


if(!$result1){
    die("Query error " . mysqli_error($mysqli));
}else{
    $query2 = "UPDATE usuarios SET `pass`='$pass' WHERE `idusuario` = '$id';";
    $result2 = $mysqli->query($query2);

    if(!$result2){
        die("Query error " . mysqli_error($mysqli));
    }else{
        echo '200';
    }
}




?>