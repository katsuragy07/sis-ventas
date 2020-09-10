<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "
                            SELECT producto_subcategoria.idsubcat_prod, producto_subcategoria.nombre_subcat, producto_subcategoria.descripcion, count(productos.idproducto) AS nro_contenidos 
                            FROM producto_subcategoria LEFT JOIN productos ON producto_subcategoria.idsubcat_prod = productos.producto_subcategoria_idsubcat_prod 
                            WHERE producto_categoria_idcat_prod='$id' GROUP BY producto_subcategoria.idsubcat_prod;
                        "; break;

    case 'editar':  $id = $_GET['id'];
                    $query = "SELECT * FROM producto_subcategoria; WHERE idsubcat_prod='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'id' => $row['idsubcat_prod'],
        'nombre_subcat' => $row['nombre_subcat'],
        'descripcion' => $row['descripcion'],
        'nro_contenidos' => $row['nro_contenidos']
    );
    
   
}

echo json_encode($json);



?>