<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar': $query = "SELECT producto_categoria.idcat_prod, producto_categoria.nombre_cat, producto_categoria.descripcion, count(producto_subcategoria.idsubcat_prod) AS nro_contenidos 
                                FROM producto_categoria LEFT JOIN producto_subcategoria 
                                ON producto_categoria.idcat_prod = producto_subcategoria.producto_categoria_idcat_prod GROUP BY producto_categoria.idcat_prod;"; break;
    case 'editar': $id = $_GET['id'];
                   $query = "SELECT * FROM producto_categoria; WHERE idcat_prod='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'id' => $row['idcat_prod'],
        'nombre_cat' => $row['nombre_cat'],
        'descripcion' => $row['descripcion'],
        'nro_contenidos' => $row['nro_contenidos']
    );
    
   
}

echo json_encode($json);



?>