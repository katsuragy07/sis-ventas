<?php

require_once "../../connect.php";

switch($_GET['consulta']){
    case 'buscar':  $id = $_GET['id'];
                    $query = "SELECT * FROM productos WHERE producto_subcategoria_idsubcat_prod = '$id' ORDER BY idproducto DESC;"; break;
    case 'editar':  $id = $_GET['id'];
                    $query = "SELECT * FROM productos WHERE idproducto = '$id';"; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'idproducto' => $row['idproducto'],
        'codigo_prod' => $row['codigo_prod'],
        'nombre_prod' => $row['nombre_prod'],
        'caracteristicas' => $row['caracteristicas'],
        'stock' => $row['stock'],
        'rentabilidad' => $row['rentabilidad'],
        'proceso_des' => $row['proceso_des'],
        'idprov01' => $row['proveedores_idproveedor'],
        'idprov02' => $row['proveedores_idproveedor1'],
        'idprov03' => $row['proveedores_idproveedor2'],
        
        'precio_prov_unidad' => $row['precio_prov_uni'],
        
        'precio_vent_unidad' => $row['precio_vent_uni'],

        'habilitado' => $row['habilitado'],
        'url_foto' => $row['url_foto']
    );
    
   
}

echo json_encode($json);



?>