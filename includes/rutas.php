<?php
    $menu;
    $accesos;
    $privilegios = $_SESSION['privilegios'];

    if(!isset($_SESSION['privilegios'])){
        session_start();
        session_destroy();
        header('Location: '."intranet.php"); 
    }

    switch($privilegios){
        case 'ROOT':    
                        $menu = ["usuarios"=>1,"clientes"=>1,"productos"=>1,"proveedores"=>1,"ventas"=>1,"cajas"=>1,"reportes"=>1];
                        $accesos = [
                            "usuarios" => '1',
                            "clientes" => '1',
                            "productos" => '1',
                            "proveedores" => '1',
                            "ventas" => '11',
                            "cajas"    => '111',
                            "reportes"=> '1'
                        ];
                        break;


        case 'COTIZADOR':  
                        $menu = ["usuarios"=>0,"clientes"=>1,"productos"=>0,"proveedores"=>0,"ventas"=>1,"cajas"=>0,"reportes"=>1];
                        $accesos = [
                            "usuarios" => '0',
                            "clientes" => '1',
                            "productos" => '0',
                            "proveedores" => '0',
                            "ventas" => '10',
                            "cajas"    => '000',
                            "reportes"=> '0'
                        ];
                        break;


        case 'CAJA':    
                        $menu = ["usuarios"=>0,"clientes"=>0,"productos"=>0,"proveedores"=>0,"ventas"=>1,"cajas"=>1,"reportes"=>1];
                        $accesos = [
                            "usuarios" => '0',
                            "clientes" => '0',
                            "productos" => '0',
                            "proveedores" => '0',
                            "ventas" => '01',
                            "cajas"    => '011',
                            "reportes"=> '1'
                        ];
                        break;
    }




?>
