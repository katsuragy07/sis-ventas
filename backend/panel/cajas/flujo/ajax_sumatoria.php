<?php

require_once "../../../connect.php";

$inicio = $_GET['inicio'];
$fin = $_GET['fin'];

switch($_GET['consulta']){ 
    case 'buscar':
                if($inicio==0){
                    $inicio = date("Y-m-d");
                }
               
                $query = "
                            SELECT tipo, sum(monto) AS sumatoria
                            FROM movimientos 
                            WHERE (DATE(fecha_mov) >= '$inicio') AND (DATE(fecha_mov) <= '$fin') GROUP BY movimientos.tipo ORDER BY fecha_mov DESC;
                            "; break;
}


$result = $mysqli->query($query);


if(!$result){
    die("Query error " . mysqli_error($mysqli));
}

$json = array();

while($row = $result->fetch_array()){
    
    $json[] = array(
        'tipo_mov' => $row['tipo'],
        'sumatoria' => $row['sumatoria']
    );
    
   
}

echo json_encode($json);



?>