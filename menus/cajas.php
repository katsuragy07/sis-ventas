<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."../intranet.php"); 
    }else{
        require_once("../includes/rutas.php");
    }
    

    if(substr($accesos['cajas'],0,1) == 0){
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
                                <h3><span class="badge badge-info">CREAR / VER CAJA</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='../caja.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='../index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add_caja("CREAR");'>Añadir <i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                    <br>
                
                    <div class="container-fluid">
                        <div class="row justify-content-end">

                            <div class="col-12 mb-1">
                                <form class="row">
                                    <div class="col-md-2 col-sm-4 mb-2">
                                        <select class="form-control">
                                            <option value="NOMBRE" selected>CAJA</option>
                                        </select>
                                    </div>
                                    <div class="col-md-8 col-sm-8 mb-2">
                                        <input class="form-control" type="search" placeholder="Buscar Caja" aria-label="Search">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success" type="submit"><i class="fas fa-search"></i> Buscar</button>
                                    </div>         
                                </form>
                            </div>

                            <div class="col-12 mb-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Capital</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Operaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_cajas">
                                            <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary"><i class="fas fa-edit"></i> Editar</button>
                                                        <button style="width:110px;" type="button" class="btn btn-danger"><i class="fas fa-times-circle"></i> Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td>Jacob</td>
                                                <td>Thornton</td>
                                                <td></td>
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary"><i class="fas fa-edit"></i> Editar</button>
                                                        <button style="width:110px;" type="button" class="btn btn-danger"><i class="fas fa-times-circle"></i> Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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


        

        


        <!-- MODAL ADD -->
        <!-- MODAL ADD -->
        <div class="modal fade bd-example-modal-sm" id="modal-add" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                                                        <div class="container-fluid" style="padding:15px;">
                                                            <div class="row"> 
                                                                <div class="col-md-12">
                                                                    <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                                                                    <h4>Nueva Caja</h4>
                                                                    <br>
                                                                    <form id="formulario-caja" enctype="multipart/form-data">
                                                                        <div class="form-row">
                                                                            <div class="form-group col-sm-12">
                                                                                <label for="caja_nombre">Nombre*</label>
                                                                                <input type="text" class="form-control" id="caja_nombre" name="caja_nombre" placeholder="Nombre de la Caja" required>
                                                                            </div>
                                                                            <div class="form-group col-sm-12">
                                                                                <label for="caja_capital">Capital Inicial*</label>
                                                                                <input type="number" step="any" class="form-control" id="caja_capital" name="caja_capital" placeholder="Monto inicial de la caja" required>
                                                                            </div>
                                                                        </div>

                                                                        <div class="w-100" style="height:8px;"></div>
                                                                        <div id="msg-ajax-result"></div>



                                                                        <div class="row justify-content-around">
                                                                            <div class="col-sm-6 col-12 mb-2 modal-btn-cont">
                                                                                <button type="submit" class="btn btn-success btn-block btn_modals"><i class="far fa-lg fa-save"></i> Registrar</button>
                                                                            </div>
                                                                            <div class="col-sm-6 col-12 mb-2">
                                                                                <button type="button" class="btn btn-warning btn-block btn_modals" onclick="$('#modal-add').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cerrar</button>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                   
                                                                        
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>

                </div>
            </div>
        </div>





        <!-- MODAL ADD EDIT -->
        <!-- MODAL ADD EDIT -->
        <div class="modal fade bd-example-modal-sm" id="modal-add-edt" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                                                        <div class="container-fluid" style="padding:15px;">
                                                            <div class="row"> 
                                                                <div class="col-md-12">
                                                                    <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add-edt').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                                                                    <h4>Modificar Caja</h4>
                                                                    <br>
                                                                    <form id="formulario-caja-edt" enctype="multipart/form-data">
                                                                        <div class="form-row">
                                                                            <div class="form-group col-sm-12">
                                                                                <label for="caja_nombre-edt">Nombre*</label>
                                                                                <input type="text" class="form-control" id="caja_nombre-edt" name="caja_nombre-edt" placeholder="Nombre de la Caja" required>
                                                                            </div>
                                                                            <div class="form-group col-sm-12">
                                                                                <label for="caja_capital-edt">Capital*</label>
                                                                                <input type="number" class="form-control" id="caja_capital-edt" name="caja_capital-edt" placeholder="Monto inicial de la caja" required readonly>
                                                                            </div>
                                                                        </div>

                                                                        <div class="w-100" style="height:8px;"></div>
                                                                        <div id="msg-ajax-result-edt"></div>



                                                                        <div class="row justify-content-around">
                                                                            <div class="col-sm-4 col-12 mb-2">
                                                                                <button type="submit" class="btn btn-success btn-block btn_modals mb-2"><i class="far fa-lg fa-save"></i> Actualizar</button>
                                                                            </div>
                                                                            <div class="col-sm-4 col-12 mb-2 modal-btn-cont-edt">
                                                                                
                                                                            </div>
                                                                            <div class="col-sm-4 col-12 mb-2">
                                                                                <button type="button" class="btn btn-warning btn-block btn_modals mb-2" onclick="$('#modal-add-edt').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cerrar</button>
                                                                            </div>
                                                                        </div>

                                                                        
                                                                        
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>

                </div>
            </div>
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