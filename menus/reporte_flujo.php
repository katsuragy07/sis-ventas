<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."../intranet.php"); 
    }else{
        require_once("../includes/rutas.php");
    }
    

    if($menu['cajas'] == 0){
        header('Location: '."../index.php"); 
    }
?>




<!DOCTYPE HTML>
<html lang="es">
	<head>
		<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Creative E.I.R.L</title>
		<link rel="shortcut icon" href="../img/logo.png">


        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="../includes/plugins/fontawesome-free/css/all.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Tempusdominus Bbootstrap 4 -->
        <link rel="stylesheet" href="../includes/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="../includes/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
        <!-- JQVMap -->
        <link rel="stylesheet" href="../includes/plugins/jqvmap/jqvmap.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="../includes/dist/css/adminlte.min.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="../includes/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="../includes/plugins/daterangepicker/daterangepicker.css">
        <!-- summernote -->
        <link rel="stylesheet" href="../includes/plugins/summernote/summernote-bs4.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">

        <link rel="stylesheet" href="../css/panel.css">

	</head>
    <body class="hold-transition sidebar-mini layout-fixed">

        <div class="wrapper">

            <?php
                require_once("../includes/header-sub.php");
                require_once("../includes/menus-sub.php");
            ?>



            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">

                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-1">
                            <div class="col-sm-6">
                            
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                             
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>

                <section class="content pl-0 pr-0">

                    <div class="container-fluid">
                        <div class="row justify-content-between">
                            <div class="col-sm-12 text-center mb-3">
                                <h3><span class="badge badge-info">FLUJOS DE CAJA</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='../reportes.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='../index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" onclick="printDiv('print-flujo-caja')"><i class="fas fa-file-alt"></i> Imprimir</button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="container-fluid">
                        <div class="row justify-content-end">
                            <div class="col-12 mb-1">
                                <form class="row">
                                    <div class="col-md-5 col-sm-6 mb-2">
                                        <span class="badge badge-primary" style="font-size:1.1em;">Desde: </span>
                                        <input class="form-control mt-1" id="flujo_inicio" type="date" placeholder="Inicio de flujos de caja" aria-label="Search" oninput="caja.listarFlujo($(this).val(),$('#flujo_fin').val());">
                                    </div>
                                    <div class="col-md-5 col-sm-6 mb-2">
                                        <span class="badge badge-primary" style="font-size:1.1em;">Hasta: </span>
                                        <input class="form-control mt-1" id="flujo_fin" type="date" placeholder="Fin de flujos de caja" aria-label="Search" oninput="caja.listarFlujo($('#flujo_inicio').val(),$(this).val());">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success" style="position:relative;top:50%;transform: translateY(-50%);" type="button" onClick="caja.listarFlujo($('#flujo_inicio').val(),$('#flujo_fin').val());"><i class="fas fa-search"></i> Buscar</button>
                                    </div>             
                                </form>
                            </div>

                        
                            <div class="col-12 mb-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Caja</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Concepto</th>
                                            <th scope="col">Detalle de movimiento</th>
                                            <th scope="col">Fecha</th>
                                    
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_flujo">
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div id="load_table_flujo"></div>
                            </div>


                            <div class="w-100"></div>

                            <div class="col" id="print-flujo-caja" style="display:none;">
                                <div style="padding:15px;">
                                    <center><img src="../img/logoticket.jpg"></center>
                                    <center><h5 style="margin-top:30px; font-size:1.5em;" class="cotizacion-letra">REPORTE DE FLUJO DE CAJA</h5></center>
                                    <h4 id="reporte_fechas" style="margin-top:24px; font-size:1.2em;" class="cotizacion-letra"></h4>
                                    

                                    <table class="table table-striped table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Caja</th>
                                            <th scope="col">Tipo</th>
                                            <th scope="col">Monto</th>
                                            <th scope="col">Concepto</th>
                                            <th scope="col">Detalle de movimiento</th>
                                            <th scope="col">Fecha</th>
                                    
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_flujo2">
                                            
                                        </tbody>
                                    </table>
                                    <div id="load_table_flujo"></div>
                                </div>
                            </div>

                        </div>
                    </div>
            
                </section>

            </div>
            <!-- /.content-wrapper -->



            <?php
                require_once("../includes/footer.php");
            ?>

        </div>
 

        






        <!-- jQuery -->
        <script src="../includes/plugins/jquery/jquery.min.js"></script>
        <!-- jQuery UI 1.11.4 -->
        <script src="../includes/plugins/jquery-ui/jquery-ui.min.js"></script>
        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
        <script>
        $.widget.bridge('uibutton', $.ui.button)
        </script>
        <!-- Bootstrap 4 -->
        <script src="../includes/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>


        <!-- overlayScrollbars -->
        <script src="../includes/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
        <!-- AdminLTE App -->
        <script src="../includes/dist/js/adminlte.js"></script>

        <script src="../js/panel.js"></script>

    </body>
</html>