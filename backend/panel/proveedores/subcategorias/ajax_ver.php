<?php

require_once "../../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "
                        SELECT proveedor_subcategoria.idsubcat_prov, proveedor_subcategoria.nombre_subcat, proveedor_subcategoria.descripcion, count(proveedores.idproveedor) AS nro_contenidos  
                        FROM proveedor_subcategoria LEFT JOIN proveedores ON proveedores.proveedor_subcategoria_idsubcat_prov = proveedor_subcategoria.idsubcat_prov
                        WHERE proveedor_subcategoria.proveedor_categoria_idcat_prov = '$id' GROUP BY proveedor_subcategoria.idsubcat_prov;
                        "; break;

    case 'editar':  $id = $_GET['id'];
                    $query = "SELECT * FROM proveedor_subcategoria; WHERE idsubcat_prov='$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'id' => $row['idsubcat_prov'],
        'nombre_subcat' => $row['nombre_subcat'],
        'descripcion' => $row['descripcion'],
        'nro_contenidos' => $row['nro_contenidos']
    );
    
   
}

echo json_encode($json);



?>