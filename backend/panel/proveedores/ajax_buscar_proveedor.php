<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];
    $tipo = $_GET['tipo'];
    $subcat = $_GET['id'];

    if($tipo=="NOMBRE"){
        $query = "SELECT * FROM proveedores INNER JOIN proveedor_subcategoria ON proveedores.proveedor_subcategoria_idsubcat_prov = proveedor_subcategoria.idsubcat_prov WHERE idsubcat_prov = '$subcat' AND proveedores.nombre_prov LIKE '%$clave%';";
    }else{
        $query = "SELECT * FROM proveedores INNER JOIN proveedor_subcategoria ON proveedores.proveedor_subcategoria_idsubcat_prov = proveedor_subcategoria.idsubcat_prov WHERE idsubcat_prov = '$subcat' AND proveedores.ruc LIKE '$clave%';";
    }
    

    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'idproveedor' => $row['idproveedor'],
            'ruc' => $row['ruc'],
            'nombre_prov' => $row['nombre_prov'],
            'responsable' => $row['responsable'],
            'direccion' => $row['direccion'],
            'correo' => $row['correo'],
            'telefono' => $row['telefono'],
            'celular' => $row['celular'],
            'banco1' => $row['banco1'],
            'banco2' => $row['banco2'],
            'banco3' => $row['banco3'],
            'banco4' => $row['banco4'],
            'cuenta1' => $row['cuenta1'],
            'cuenta2' => $row['cuenta2'],
            'cuenta3' => $row['cuenta3'],
            'cuenta4' => $row['cuenta4'],
            'observaciones' => $row['observaciones']
        );
        
       
    }
    
    echo json_encode($json);





?>