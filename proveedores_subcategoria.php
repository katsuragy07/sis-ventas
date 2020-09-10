<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."intranet.php"); 
    }else{
        require_once("includes/rutas.php");
    }
    
    if($menu['proveedores'] == 0){
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
                                <h3><span class="badge badge-info">SUB-CATEGORIAS DE PRODUCTOS</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='proveedores_categoria.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add("proveedor_subcategoria");'><i class="fas fa-plus"></i> Nueva Sub-Categoria</button>  
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="container-fluid">
                        <div class="row justify-content-end">
                         
                            <div class="col-12 mb-2" id="load_data_proveedores_subcategoria">
                                <!--
                                    <div class="row justify-content-center text-white">
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Ver sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Ver sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Ver sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Ver sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                        <div class="col mt-4">
                                            <div class="btn_categorias">
                                                <h1>13</h1>
                                                <p>Categoria 1</p>
                                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                                <a href="menus/productos.php?idproducto=1"><span>Ver sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                                            </div>
                                        </div>
                                    </div>
                                -->
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
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">


                    <div class="container-fluid modal-body" style="padding:15px;">
                        <div class="row justify-content-center"> 
                            <div class="col-md-12">
                                <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                                <form id="formulario-proveedores_subcat" class="formulario-modal" enctype="multipart/form-data">
                                    <h4 style="margin-bottom:18px; width:80%;">NUEVA SUB-CATEGORIA DE PROVEEDORES</h4>
                                                                        
                                    <nav>
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a class="nav-item nav-link active" id="nav-general-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="true">General</a>
                                        </div>
                                    </nav>

                                    <div class="row justify-content-center">   
                                        <div class="tab-content row justify-content-center col-12" id="nav-tabContent">
                                               
                                            <div class="col-md-9 col-12 tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
                                                <br>
                                                <div class="form-group row">
                                                    <label for="inputNOM" class="col-sm-3 col-form-label">*Nombre</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputNOM" name="inputNOM" placeholder="Nombres" required>
                                                    </div>
                                                </div>

                                                <div class="w-100"></div>

                                                <div class="form-group row">
                                                    <label for="inputCOM" class="col-sm-3 col-form-label">Descripción</label>
                                                    <div class="col-sm-9">
                                                        <textarea type="text" class="form-control" id="inputCOM" name="inputCOM" placeholder="Descripción de la Sub-categoría" rows="4"></textarea>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                                                    
                                                                  
                                    <div class="w-100" style="height:8px;"></div>
                                    <div id="msg-ajax-result"></div>



                                    <div class="row justify-content-around">
                                        <div class="col-sm-4 col-12 mb-2">
                                            <button type="submit" class="btn btn-block btn-success btn_modals"><i class="far fa-lg fa-save"></i> Guardar</button>
                                        </div>
                                        <div class="col-sm-4 col-12 mb-2 modal-btn-cont">
                                           
                                        </div>
                                        <div class="col-sm-4 col-12 mb-2">
                                            <button type="button" class="btn btn-block btn-warning btn_modals" onclick="$('#modal-add').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cancelar</button>
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