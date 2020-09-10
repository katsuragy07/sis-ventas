<?php

    require_once "../../../connect.php";

    $iddesembolso = $_GET['iddesembolso'];


    $query = "SELECT * FROM pagos WHERE pagos.creditos_idcredito = (SELECT creditos_idcredito FROM desembolso WHERE iddesembolso = '$iddesembolso');";

    $result = $mysqli->query($query);


    if(!$result){
        die("Query error " . mysqli_error($mysqli));
    }


    $json = array();
    while($row = $result->fetch_array()){
    
        $json[] = array(
            'idpago' => $row['idpago'],
            'n_cuota_programada' => $row['n_cuota_programada'],
            'fecha_programada' => date("d-m-Y",strtotime($row['fecha_programada'])),
            'cuota_programada' => $row['cuota_programada'],
            'monto' => $row['monto'],
            'fecha' => date("d-m-Y H:i:s",strtotime($row['fecha'])),
            'mora' => $row['mora']
        );
        
       
    }
    
    echo json_encode($json);





?>