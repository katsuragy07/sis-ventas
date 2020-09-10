<?php

require_once "../../../connect.php";

$clave = $_GET['clave'];


switch($_GET['consulta']){ 
    case 'buscar':
                if($clave==0){
                    $clave = date("Y-m-d");
                }
               
                $query = "
                            SELECT idmovimiento, idcaja, idusuario, tipo, monto, concepto, fecha_mov, autoriza, cajas.nombre AS caja_nombre, capital, estado, privilegios, usuarios.nombre AS usu_nombre, usuarios.apellido_pat AS usu_apellido_pat, usuarios.apellido_mat AS usu_apellido_mat
                            FROM movimientos 
                            INNER JOIN  cajas ON movimientos.cajas_idcaja = cajas.idcaja
                            INNER JOIN usuarios ON usuarios.idusuario = movimientos.usuarios_idusuario
                            WHERE fecha_mov LIKE '$clave%' ORDER BY fecha_mov DESC;
                            "; break;

    case 'editar': 
                $id = $_GET['id'];
                $query = "
                            SELECT * FROM cajas WHERE cajas.idcaja='$id';
                            "; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'idmovimiento' => $row['idmovimiento'],
        'idcaja' => $row['idcaja'],
        'idusuario' => $row['idusuario'],

        'tipo_mov' => $row['tipo'],
        'monto' => $row['monto'],
        'concepto' => $row['concepto'],
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