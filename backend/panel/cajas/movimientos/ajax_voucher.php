<?php

require_once "../../../connect.php";
date_default_timezone_set("America/Lima");

switch($_GET['consulta']){
    case 'editar': $id = $_GET['id'];
                   $query = "
                        SELECT idmovimiento, idcaja, idusuario, tipo, monto, concepto,tipo_comprobante, nro_comprobante, fecha_mov, autoriza, cajas.nombre AS caja_nombre, capital, estado, privilegios, usuarios.nombre AS usu_nombre, usuarios.apellido_pat AS usu_apellido_pat, usuarios.apellido_mat AS usu_apellido_mat, usuarios.doc_nro AS usu_dni
                        FROM movimientos 
                        INNER JOIN  cajas ON movimientos.cajas_idcaja = cajas.idcaja
                        INNER JOIN usuarios ON usuarios.idusuario = movimientos.usuarios_idusuario
                        WHERE movimientos.idmovimiento = '$id';
                            "; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$fecha = date('d-m-Y H:i');
$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'fecha' => $fecha,
        'idmovimiento' => $row['idmovimiento'],
        'idcaja' => $row['idcaja'],
        'idusuario' => $row['idusuario'],

        'tipo_mov' => $row['tipo'],
        'monto' => $row['monto'],
        'concepto' => $row['concepto'],
        'tipo_comprobante' => $row['tipo_comprobante'],
        'nro_comprobante' => $row['nro_comprobante'],
        'fecha_mov' => date("d-m-Y H:i:s",strtotime($row['fecha_mov'])),
        'autoriza' => $row['autoriza'],

        'caja_nombre' => $row['caja_nombre'],

        'privilegios' => $row['privilegios'],
        'usu_nombre' => $row['usu_nombre'],
        'usu_apellido_pat' => $row['usu_apellido_pat'],
        'usu_apellido_mat' => $row['usu_apellido_mat']
    );
    
   
}

echo json_encode($json);



?>