<?php

    require_once "../../../connect.php";

    $clave = $_GET['clave'];
    $tipo = $_GET['tipo'];

    if($tipo=="CLIENTE"){
        $query = "SELECT * FROM cotizaciones INNER JOIN clientes ON cotizaciones.clientes_idcliente = clientes.idcliente WHERE concat(clientes.nombre,clientes.apellido_pat,clientes.apellido_mat) LIKE '%$clave%' ORDER BY idcotizacion DESC;";
    }else{
        $query = "SELECT * FROM cotizaciones INNER JOIN clientes ON cotizaciones.clientes_idcliente = clientes.idcliente WHERE idcotizacion LIKE '$clave%' ORDER BY idcotizacion DESC;";
    }
    

    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
        'id' => $row['idcotizacion'],
        'fecha_reg' => date("d-m-Y H:i:s",strtotime($row['fecha_reg'])),
        'estado' => $row['estado'],
        'total' => $row['total'],

        'idcliente' => $row['idcliente'],
        'nombre' => $row['nombre'],
        'apellido_pat' => $row['apellido_pat'],
        'apellido_mat' => $row['apellido_mat'],
        'telefono' => $row['telefono'],
        'tipo_doc' => $row['tipo_doc'],
        'nro_doc' => $row['nro_doc'],
        'direccion' => $row['direccion'],
        'telefono' => $row['telefono'],
        'correo' => $row['correo'],

        'igv' => $row['igv'],

        'p1_cant' => $row['p1_cant'],
        'p1_pu' => $row['p1_pu'],
        'p1_st' => $row['p1_st'],
        
        'p2_cant' => $row['p2_cant'],
        'p2_pu' => $row['p2_pu'],
        'p2_st' => $row['p2_st'],

        'p3_cant' => $row['p3_cant'],
        'p3_pu' => $row['p3_pu'],
        'p3_st' => $row['p3_st'],

        'p4_cant' => $row['p4_cant'],
        'p4_pu' => $row['p4_pu'],
        'p4_st' => $row['p4_st'],

        'p5_cant' => $row['p5_cant'],
        'p5_pu' => $row['p5_pu'],
        'p5_st' => $row['p5_st'],
      
        'idprod1' => $row['productos_idproducto'],
        'idprod2' => $row['productos_idproducto1'],
        'idprod3' => $row['productos_idproducto2'],
        'idprod4' => $row['productos_idproducto3'],
        'idprod5' => $row['productos_idproducto4'],
        'idcliente' => $row['clientes_idcliente'],
        'idusuario' => $row['usuarios_idusuario']
        );
        
       
    }
    
    echo json_encode($json);





?>