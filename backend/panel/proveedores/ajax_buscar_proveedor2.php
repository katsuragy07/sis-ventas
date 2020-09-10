<?php

    require_once "../../connect.php";

    $clave = $_GET['clave'];
    $tipo = $_GET['tipo'];

    if($tipo=="PRODUCTO"){
        $query = "SELECT * FROM productos INNER JOIN proveedores ON 
                    proveedores.idproveedor = productos.proveedores_idproveedor OR 
                    proveedores.idproveedor = productos.proveedores_idproveedor1 OR 
                    proveedores.idproveedor = productos.proveedores_idproveedor2
                    WHERE productos.nombre_prod LIKE '%$clave%';";
    }else{
        $query = "SELECT * FROM productos RIGHT JOIN proveedores ON 
                    proveedores.idproveedor = productos.proveedores_idproveedor OR 
                    proveedores.idproveedor = productos.proveedores_idproveedor1 OR 
                    proveedores.idproveedor = productos.proveedores_idproveedor2
                    WHERE proveedores.nombre_prov LIKE '%$clave%';";
    }
    

    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'nombre_prod' => $row['nombre_prod'],
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