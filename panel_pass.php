<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."intranet.php"); 
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
                        <div class="row mb-1">
                            <div class="col-sm-6">
                            
                            </div><!-- /.col -->
                            <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="index.php">Panel</a></li>
                                <li class="breadcrumb-item active">Inicio</li>
                                </ol>
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>

                <section class="content pl-0 pr-0">

                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-10">
                                <div class="card text-center">
                                    <div class="card-header">
                                        <h4>CAMBIAR CONTRASEÑA</h4>
                                    </div>
                                    <div class="card-body">     
                                        <form id="formulario-pass" enctype="multipart/form-data">
                                            <div class="form-row">
                                                <div class="form-group col-md-6">
                                                    <label for="inputPass01">Nueva Contraseña*</label>
                                                    <input type="password" class="form-control" id="inputPass01" name="inputPass01" placeholder="Escriba la nueva contraseña" required>
                                                </div>
                                                <div class="form-group col-md-6">
                                                    <label for="inputPass02">Repetir la Nueva Contraseña*</label>
                                                    <input type="password" class="form-control" id="inputPass02" name="inputPass02" placeholder="Repite la contraseña" required>
                                                </div>
                                                <div class="w-100" style="height:8px;"></div>       
                                            </div>


                                            <div class="w-100" style="height:8px;"></div>


                                            <div class="row">
                                                <div class="col-md-6 mt-2">
                                                    <button type="submit" class="btn btn-primary btn-block" id="btnpasssave" data-id="<?php echo $_SESSION['id'];?>"><i class="far fa-save"></i> Guardar</button>
                                                </div>
                                                <div class="col-md-6 mt-2">
                                                    <button type="reset" class="btn btn-secondary btn-block"><i class="fas fa-archive"></i> Reset</button>
                                                </div>
                                            </div>
                                
                                                         
                                        </form>
                                    </div>
                                    <div class="card-footer text-muted">
                                        <div id="pass-ajax-result"></div>
                                    </div>
                                </div>
                            </div>
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