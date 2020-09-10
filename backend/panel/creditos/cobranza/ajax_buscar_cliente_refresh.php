<?php

    require_once "../../../connect.php";

    $clave = $_GET['clave'];


    $query = "SELECT clientes.idcliente, clientes.nombre, clientes.apellido_pat, clientes.apellido_mat, creditos.idcredito, creditos.monto_aprob, round(sum(cuota_programada),2) AS deuda, round(sum(mora),2) AS mora, round(sum(monto),2) AS pagado FROM clientes 
                INNER JOIN creditos ON clientes.idcliente = creditos.clientes_idcliente 
                INNER JOIN pagos ON creditos.idcredito = pagos.creditos_idcredito
                WHERE creditos.estado = 'DESEMBOLSADO' AND clientes.idcliente = '$clave' GROUP BY creditos.idcredito;";

    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'idcliente' => $row['idcliente'],
            'nombre' => $row['nombre'],
            'apellido_pat' => $row['apellido_pat'],
            'apellido_mat' => $row['apellido_mat'],

            'idcredito' => $row['idcredito'],
            'monto_aprob' => $row['monto_aprob'],
            'deuda' => $row['deuda'],
            'mora' => $row['mora'],
            'pagado' => $row['pagado']
        );
        
       
    }
    
    echo json_encode($json);





?>