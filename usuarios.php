<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."intranet.php"); 
    }else{
        require_once("includes/rutas.php");
    }
    
    if($menu['usuarios'] == 0){
        header('Location: '."index.php"); 
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
                              
                            </div><!-- /.col -->
                        </div><!-- /.row -->
                    </div><!-- /.container-fluid -->
                </div>

                <section class="content pl-0 pr-0">
                
                    <div class="container-fluid">
                        <div class="row justify-content-between">
                            <div class="col-sm-12 text-center mb-3">
                                <h3><span class="badge badge-info">ADMINISTRACIÓN DE USUARIOS</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='index.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add("usuarios");'>Añadir <i class="fas fa-plus"></i></button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="container-fluid">
                        <div class="row justify-content-end">

                            <div class="col-12 mb-1">                 
                                <form class="row">
                                    <div class="col-md-2 col-sm-4 mb-2">
                                        <select class="form-control" id="usuarios_buscar_tipo">
                                            <option value="NOMBRE" selected>NOMBRE</option>
                                            <option value="DNI">DNI</option>
                                        </select>
                                    </div>
                                    <div class="col-md-8 col-sm-8 mb-2">
                                        <input class="form-control" id="usuarios_buscar" type="search" placeholder="Buscar Usuarios" aria-label="Search" oninput="user.buscar_usuario($(this).val());">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success " type="button" onClick="user.buscar_usuario($('#usuarios_buscar').val());"><i class="fas fa-search"></i> Buscar</button>
                                    </div>
                                </form>
                            </div>

                            <div class="col-12 mb-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered text-center" >
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">DNI</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Permisos</th>
                                            <th scope="col">HABILITADO</th>
                                            <th scope="col">Operaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_usuarios">
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div id="load_table_usuarios"></div>
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
    


        



        
        <!-- MODAL ADD -->
        <!-- MODAL ADD -->
        <div class="modal fade bd-example-modal-sm" id="modal-add" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="container-fluid modal-body">
                        <div class="row justify-content-center"> 
                            <div class="col-md-12">
                                <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add').modal('hide'); user.editURLimg = 0;"><i class="fas fa-lg fa-times"></i></button>
                                <form id="formulario-usuarios" class="formulario-modal" enctype="multipart/form-data">
                                    <h4 style="margin-bottom:18px;width:80%;">REGISTRAR USUARIO</h4>
                                                                        
                                    <nav>
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a class="nav-item nav-link active" id="nav-general-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="true">General</a>

                                        </div>
                                    </nav>

                                    <div class="row justify-content-center">   
                                        <div class="tab-content row justify-content-center col-12" id="nav-tabContent">


                                            <div class="col-md-9 col-12 tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
                                                <br>
                                                <div class="row justify-content-center">
                                                    <div class="col-12">
                                                        <div class="modal_foto_perfil" id="load_foto_modal">
                                                            <img src="img/user.png" width="100%">
                                                        </div>
                                                        <center>
                                                            <input type="file" class="" id="inputIMG" name="inputIMG">
                                                        </center>                                                                                            
                                                    </div>
                                                </div>
                                                <br>
                                                <div class="form-group row">
                                                    <label for="inputPRIV" class="col-sm-3 col-form-label">*Privilegios / Cargo</label>
                                                    <div class="col-sm-9">
                                                        <select type="text" class="form-control" id="inputPRIV" name="inputPRIV" placeholder="Apellido Paterno" required>
                                                            <option value="" selected disabled>--Seleccionar--</option>
                                                            <option value="ROOT">Administrador</option>
                                                            <option value="COTIZADOR">Cotizador</option>
                                                            <option value="CAJA">Cajero</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputAP" class="col-sm-3 col-form-label">*Apellido Paterno</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputAP" name="inputAP" placeholder="Apellido Paterno" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputAM" class="col-sm-3 col-form-label">*Apellido Materno</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputAM" name="inputAM" placeholder="Apellido Materno" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputNOM" class="col-sm-3 col-form-label">*Nombres</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputNOM" name="inputNOM" placeholder="Nombres" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputDNI" class="col-sm-3 col-form-label">*DNI</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputDNI" name="inputDNI" placeholder="Número de DNI" required>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="inputUSER" class="col-sm-3 col-form-label">*Usuario</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputUSER" name="inputUSER" placeholder="Usuario de acceso al sistema" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputPASS" class="col-sm-3 col-form-label">*Contraseña</label>
                                                    <div class="col-sm-9">
                                                        <input type="password" class="form-control" id="inputPASS" name="inputPASS" placeholder="Contraseña" required>
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="inputTEL" class="col-sm-3 col-form-label">*Teléfono</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputTEL" name="inputTEL" placeholder="Número telefónico" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputDIR" class="col-sm-3 col-form-label">*Dirección</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputDIR" name="inputDIR" placeholder="Dirección" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputEMAIL" class="col-sm-3 col-form-label">Correo</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputEMAIL" name="inputEMAIL" placeholder="Correo Electrónico">
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                 

                                    <div class="w-100" style="height:8px;"></div>
                                    <div class="modal_msg_ajax" id="msg-ajax-result"></div>
                                    
                                    
                                    <div class="row justify-content-around">
                                        <div class="col-sm-4 col-12 mb-2">
                                            <button type="submit" class="btn btn-block btn-success btn_modals"><i class="far fa-lg fa-save"></i> Guardar</button>
                                        </div>
                                        <div class="col-sm-4 col-12 mb-2 modal-btn-cont">
                                           
                                        </div>
                                        <div class="col-sm-4 col-12 mb-2">
                                            <button type="button" class="btn btn-block btn-warning btn_modals" onclick="$('#modal-add').modal('hide'); user.editURLimg = 0;"><i class="fas fa-lg fa-ban"></i> Cancelar</button>
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