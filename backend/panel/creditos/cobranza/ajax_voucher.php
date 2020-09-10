<?php

require_once "../../../connect.php";
date_default_timezone_set("America/Lima");

$idpago = $_GET['idpago'];


$query = "
            SELECT pagos.idpago, pagos.n_cuota_programada, pagos.fecha_programada, pagos.cuota_programada, pagos.mora, pagos.monto, pagos.fecha AS fecha_pagada,
            creditos.idcredito, creditos.monto_aprob, creditos.n_cuotas_aprob, creditos.frecuencia,
            clientes.idcliente, clientes.dni AS cli_dni, clientes.nombre AS cli_nombre, clientes.apellido_pat AS cli_apellido_pat, clientes.apellido_mat AS cli_apellido_mat,
            usuarios.idusuario, usuarios.privilegios AS usu_privilegios, usuarios.nombre AS usu_nombre, usuarios.apellido_pat AS usu_apellido_pat, usuarios.apellido_mat AS usu_apellido_mat
                    FROM pagos 
                    INNER JOIN creditos ON creditos.idcredito = pagos.creditos_idcredito
                    INNER JOIN clientes ON clientes.idcliente = creditos.clientes_idcliente
                    INNER JOIN usuarios ON usuarios.idusuario = pagos.usuarios_idusuario
                    WHERE pagos.idpago = '$idpago';
    ";



$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$fecha = date('d-m-Y H:i');
$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'fecha' => $fecha,
        'idpago' => $row['idpago'],
        'idcredito' => $row['idcredito'],
        'idcliente' => $row['idcliente'],
        'idusuario' => $row['idusuario'],

        'n_cuota_programada' => $row['n_cuota_programada'],
        'fecha_programada' => date("d-m-Y",strtotime($row['fecha_programada'])),
        'cuota_programada' => $row['cuota_programada'],
        'mora' => $row['mora'],
        'monto' => $row['monto'],
        'fecha_pagada' => date("d-m-Y H:i:s",strtotime($row['fecha_pagada'])),
      
        'monto_aprob' => $row['monto_aprob'],
        'n_cuotas_aprob' => $row['n_cuotas_aprob'],
        'frecuencia' => $row['frecuencia'],

        'cli_dni' => $row['cli_dni'],
        'cli_nombre' => $row['cli_nombre'],
        'cli_apellido_pat' => $row['cli_apellido_pat'],
        'cli_apellido_mat' => $row['cli_apellido_mat'],

        'usu_privilegios' => $row['usu_privilegios'],
        'usu_nombre' => $row['usu_nombre'],
        'usu_apellido_pat' => $row['usu_apellido_pat'],
        'usu_apellido_mat' => $row['usu_apellido_mat']
        
    );
    
   
}

echo json_encode($json);



?>