<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar': $query = "SELECT proveedor_categoria.idcat_prov, proveedor_categoria.nombre_cat, proveedor_categoria.descripcion, count(proveedor_subcategoria.idsubcat_prov) AS nro_contenidos 
                                FROM proveedor_categoria LEFT JOIN proveedor_subcategoria 
                                ON proveedor_categoria.idcat_prov = proveedor_subcategoria.proveedor_categoria_idcat_prov GROUP BY proveedor_categoria.idcat_prov;"; break;
    case 'editar': $id = $_GET['id'];
                   $query = "SELECT * FROM proveedor_categoria; WHERE idcat_prov='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'id' => $row['idcat_prov'],
        'nombre_cat' => $row['nombre_cat'],
        'descripcion' => $row['descripcion'],
        'nro_contenidos' => $row['nro_contenidos']
    );
    
   
}

echo json_encode($json);



?>