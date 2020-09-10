<?php
    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."intranet.php"); 
    }else{
        require_once("includes/rutas.php");
    }
?>


<!DOCTYPE HTML>
<html lang="es">
	<head>
		<meta charset="utf-8">
    	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<title>Creative E.I.R.L</title>
		<link rel="shortcut icon" href="img/logo.png">
        

        <!-- Tell the browser to be responsive to screen width -->
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="includes/plugins/fontawesome-free/css/all.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Tempusdominus Bbootstrap 4 -->
        <link rel="stylesheet" href="includes/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css">
        <!-- iCheck -->
        <link rel="stylesheet" href="includes/plugins/icheck-bootstrap/icheck-bootstrap.min.css">
        <!-- JQVMap -->
        <link rel="stylesheet" href="includes/plugins/jqvmap/jqvmap.min.css">
        <!-- Theme style -->
        <link rel="stylesheet" href="includes/dist/css/adminlte.min.css">
        <!-- overlayScrollbars -->
        <link rel="stylesheet" href="includes/plugins/overlayScrollbars/css/OverlayScrollbars.min.css">
        <!-- Daterange picker -->
        <link rel="stylesheet" href="includes/plugins/daterangepicker/daterangepicker.css">
        <!-- summernote -->
        <link rel="stylesheet" href="includes/plugins/summernote/summernote-bs4.css">
        <!-- Google Font: Source Sans Pro -->
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">


        <link rel="stylesheet" href="css/panel.css">
        <!--
		<script src="js/jquery.js"></script>
        <script src="js/popper.js"></script>
        <script src="js/bootstrap.js"></script>
        -->
        
        <!--<script src="js/font-awesome.js"></script>-->
	</head>
    <body class="hold-transition sidebar-mini layout-fixed">

        <div class="wrapper">

            <?php
                require_once("includes/header.php");
                require_once("includes/menus.php");
            ?>



            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">

                <div class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                        <div class="col-sm-6">
                        
                        </div><!-- /.col -->
                        <div class="col-sm-6">
                          
                        </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>
                

                <section class="content">

                    <div class="container-fluid">
                        <div class="row justify-content-center">


                            <?php
                                if($menu["usuarios"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="usuarios.php" role="button"><i class="fas fa-2x fa-user-tie"></i><br>USUARIOS</a>
                                        </div>
                                    ';
                                }
                                if($menu["clientes"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="clientes.php" role="button"><i class="fas fa-2x fa-users"></i><br>CLIENTES</a>
                                        </div>
                                    ';
                                }
                                if($menu["productos"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="productos_categoria.php" role="button"><i class="fas fa-2x fa-boxes"></i><br>PRODUCTOS</a>
                                        </div>
                                    ';
                                }
                                if($menu["proveedores"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="proveedores_categoria.php" role="button"><i class="fas fa-2x fa-shipping-fast"></i><br>PROVEEDORES</a>
                                        </div>
                                    ';
                                }
                                if($menu["ventas"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="ventas.php" role="button"><i class="fas fa-2x fa-hand-holding-usd"></i><br>VENTAS</a>
                                        </div>
                                    ';
                                }
                                if($menu["cajas"]){
                                    echo '
                                        <div class="col mt-3 mb-2">
                                            <a class="btn btn-primary btn-lg menu_btn" href="caja.php" role="button"><i class="fas fa-2x fa-cash-register"></i><br>CAJA</a>
                                        </div>
                                    ';
                                }
                            
                                if($menu["reportes"]){
                                    echo '
                                        <div class="col mt-3 mb-4">
                                            <a class="btn btn-primary btn-lg menu_btn" href="reportes.php" role="button"><i class="fas fa-2x fa-clipboard"></i><br>REPORTES</a>
                                        </div>
                                    ';
                                }
                            ?>
                                

                        </div>
                    </div>

                </section>
            
            </div>
            <!-- /.content-wrapper -->




            <?php
                require_once("includes/footer.php");
            ?>

        </div>




        <!-- jQuery -->
        <script src="includes/plugins/jquery/jquery.min.js"></script>
        <!-- jQuery UI 1.11.4 -->
        <script src="includes/plugins/jquery-ui/jquery-ui.min.js"></script>
        <!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
        <script>
        $.widget.bridge('uibutton', $.ui.button)
        </script>
        <!-- Bootstrap 4 -->
        <script src="includes/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>




        <!-- overlayScrollbars -->
        <script src="includes/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js"></script>
        <!-- AdminLTE App -->
        <script src="includes/dist/js/adminlte.js"></script>

	<script src="js/panel.js"></script>

    </body>
</html>
