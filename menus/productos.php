<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."../intranet.php"); 
    }else{
        require_once("../includes/rutas.php");
    }
    
    if($menu['productos'] == 0){
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
                                <h3><span class="badge badge-info">PRODUCTOS</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='../productos_categoria.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='../index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add("productos");'><i class="fas fa-plus"></i> Nuevo Producto</button>
                            </div>
                        </div>
                    </div>

                    <br>

                    <div class="container-fluid">
                        <div class="row justify-content-end">

                            <div class="col-12 mb-1">
                                <form class="row">
                                    <div class="col-md-2 col-sm-4 mb-2">
                                        <select class="form-control" id="productos_buscar_tipo">
                                            <option value="NOMBRE" selected>NOMBRE</option>
                                            <option value="CODIGO">CODIGO</option>
                                        </select>
                                    </div>
                                    <div class="col-md-8 col-sm-8 mb-2">
                                        <input class="form-control " id="productos_buscar" type="text" placeholder="Buscar Productos" aria-label="Search" oninput="producto.buscar_producto($(this).val());">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success" type="button" onClick="producto.buscar_producto($('#productos_buscar').val());"><i class="fas fa-search"></i> Buscar</button>
                                    </div>                  
                                </form>
                            </div>

                            <div class="col-12 mb-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered text-center">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Codigo</th>
                                            <th scope="col">Nombre</th>
                                            <!--<th scope="col">STOCK</th>-->
                                            <!--<th scope="col">Proveedor</th>-->
                                            <th scope="col">Precio (Proveedor)<br>Unidad</th>
                                            <th scope="col">Precio (Venta)<br>Unidad</th>
                                            <th scope="col">Operaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_productos">
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div id="load_table_productos"></div>
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
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">

                    <div class="container-fluid modal-body" style="padding:15px;">
                        <div class="row justify-content-center"> 
                            <div class="col-md-12">
                                <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add').modal('hide'); user.editURLimg = 0;"><i class="fas fa-lg fa-times"></i></button>
                                <form id="formulario-productos" class="formulario-modal" enctype="multipart/form-data">
                                    <h4 style="margin-bottom:18px;width:80%;">NUEVO PRODUCTO</h4>
                                                                        
                                    <nav>
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a class="nav-item nav-link active" id="nav-general-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="true">General</a>
                                            <a class="nav-item nav-link" id="nav-procesos-tab" data-toggle="tab" href="#nav-procesos" role="tab" aria-controls="nav-procesos" aria-selected="true">Procesos</a>
                                        </div>
                                    </nav>

                                    <div class="row justify-content-center">   
                                        <div class="tab-content row justify-content-center col-12" id="nav-tabContent">

                                            <div class="col-md-9 col-12 tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
                                                <br>
                                                <div class="row justify-content-center">
                                                    <div class="col-12">
                                                        <div class="modal_foto_perfil" id="load_foto_modal">
                                                            <img src="../img/producto.png" width="100%">
                                                        </div>
                                                        <center>
                                                            <input type="file" class="" id="inputIMG" name="inputIMG">
                                                        </center>                                                                                            
                                                    </div>
                                                </div>
                                                <br>
                                                <div id="delete_img">
                                                    <center><button type="button" class="btn btn-warning" style="position:relative;" onclick=""><i class="fas fa-times"></i> Eliminar Imagen</button></center>
                                                </div>
                                                <br>
                                                <div class="form-group row">
                                                    <label for="inputCOD" class="col-sm-3 col-form-label">*Codigo de Producto</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputCOD" name="inputCOD" placeholder="Codigo del Producto" required>    
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputNOM" class="col-sm-3 col-form-label">*Nombre del Producto</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputNOM" name="inputNOM" placeholder="Nombres" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputCOM" class="col-sm-3 col-form-label">Características</label>
                                                    <div class="col-sm-9">
                                                        <textarea type="text" class="form-control" id="inputCOM" name="inputCOM" placeholder="Características del Producto" rows="5"></textarea>
                                                    </div>
                                                </div>

                                                <div class="form-group row" style="display:none">
                                                    <label for="inputSTOCK" class="col-sm-3 col-form-label">*STOCK</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputSTOCK" name="inputSTOCK" placeholder="STOCK del Producto">
                                                    </div>
                                                </div>

                                                <div class="form-group row">
                                                    <label for="inputPROV1" class="col-sm-3 col-form-label">Proveedor N° 1</label>
                                                    <div class="col-sm-9">
                                                        <input list="proveedores1" type="text" class="form-control form-control-sm" id="inputPROV1" name="inputPROV1" placeholder="Nombre del Proveedor" autocomplete="off" onKeyUp="producto.buscarProveedor(this.value,1);">
                                                        <input type="hidden" name="inputPROV1-hidden" id="inputPROV1-hidden">
                                                        <datalist id="proveedores1">
                                                            
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputPROV2" class="col-sm-3 col-form-label">Proveedor N° 2</label>
                                                    <div class="col-sm-9">
                                                        <input list="proveedores2" type="text" class="form-control form-control-sm" id="inputPROV2" name="inputPROV2" placeholder="Nombre del Proveedor" autocomplete="off" onKeyUp="producto.buscarProveedor(this.value,2);">
                                                        <input type="hidden" name="inputPROV2-hidden" id="inputPROV2-hidden">
                                                        <datalist id="proveedores2">
                                                            
                                                        </datalist>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputPROV3" class="col-sm-3 col-form-label">Proveedor N° 3</label>
                                                    <div class="col-sm-9">
                                                        <input list="proveedores3" type="text" class="form-control form-control-sm" id="inputPROV3" name="inputPROV3" placeholder="Nombre del Proveedor" autocomplete="off" onKeyUp="producto.buscarProveedor(this.value,3);">
                                                        <input type="hidden" name="inputPROV3-hidden" id="inputPROV3-hidden">
                                                        <datalist id="proveedores3">
                                                            
                                                        </datalist>
                                                    </div>
                                                </div>


                                                <br>
                                     
                                         

                                                <div class="form-group row" style="margin-bottom:0.5em;">
                                                    <div class="col-sm-4"></div>
                                                   
                                                    <div class="col-sm-2 text-center"><span class="badge badge-success">Precio Unidad</span></div>
                                                    <!--<div class="col-sm-2 text-center"><span class="badge badge-success">Millar</span></div>-->
                                                </div>
                                                <div class="form-group row" style="margin-bottom:0.5em;">
                                                    <label for="input_PRECIO_PROV_UNIDAD" class="col-sm-4 col-form-label">Precio (Proveedor)</label>    
                                                    <div class="col-md-3 col-sm-3 " style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="input_PRECIO_PROV_UNIDAD" name="input_PRECIO_PROV_UNIDAD" placeholder="S/.">
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="input_PRECIO_PROV_MILLAR" name="input_PRECIO_PROV_MILLAR" placeholder="S/."  required>
                                                    </div>
                                                    -->
                                                </div>
                                                <div class="form-group row" style="margin-bottom:0.5em;">
                                                    <label for="input_PRECIO_VENT_UNIDAD" class="col-sm-4 col-form-label">*Precio (Venta)</label>
                                                    <div class="col-md-3 col-sm-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="input_PRECIO_VENT_UNIDAD" name="input_PRECIO_VENT_UNIDAD" placeholder="S/." required>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="input_PRECIO_VENT_MILLAR" name="input_PRECIO_VENT_MILLAR" placeholder="S/." required>
                                                    </div>
                                                    -->
                                                </div>
                                            </div>

                                            <div class="col-12 tab-pane fade" id="nav-procesos" role="tabpanel" aria-labelledby="nav-procesos-tab">
                                                <div class="table-responsive mt-1">
                                                    <table class="table table-striped table-bordered text-center">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                            <th scope="col">N°</th>
                                                            <th scope="col">MATERIAL</th>
                                                            <th scope="col">COSTO DEL MATERIAL</th>
                                                            <!--<th scope="col">SUB TOTAL</th>-->
                                                            <th scope="col"><button type="button" class="btn btn-block btn-success" style="float:right;" data-toggle="modal" data-target="#modal-add-procesos" onclick='btn_add("procesos");'>Añadir <i class="fas fa-plus"></i></button></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="load_data_procesos">
                                                            
                                                        </tbody>
                                                    </table>
                                                </div>

                                                <table class="table table-striped table-bordered text-center mt-2">
                                                    <tbody id="load_data_procesos_suma">
                                                        <tr>
                                                            <td style="font-size:1.2em;"><b>SUB TOTAL</b></td>
                                                            <td style="font-size:1.2em;" id="sum_proc_precio">S/. </td>
                                                        </tr>    
                                                        <tr>
                                                            <td style="font-size:1.2em;"><b>RENTABILIDAD</b></td>
                                                            <td style="font-size:1.2em;"><b><input class="w-100 text-center" type="number" step="any" name="sum_proc_rentabilidad" id="sum_proc_rentabilidad" value="" oninput="$('#sum_proc_total').html('S/. ' + Math.ceil10($(this).val() * $('#sum_proc_precio').html(),-1));"></b></td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-size:1.2em;"><b>TOTAL</b></td>
                                                            <td style="font-size:1.2em; font-weight:bold;" id="sum_proc_total"><b>S/. </b></td>
                                                        </tr>

                                            
                                                    </tbody>
                                                </table>

                                                <br>
                                                <hr>
                                                <div class="form-group row">
                                                    <label for="inputPROC_COM" class="col-sm-3 col-form-label"><b>Comentarios</b></label>
                                                    <div class="col-sm-9">
                                                        <textarea type="text" class="form-control" id="inputPROC_COM" name="inputPROC_COM" placeholder="Comentarios" rows="4"></textarea>
                                                    </div>
                                                </div>
                                                <hr>
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
                                            <button type="button" class="btn btn-block btn-warning btn_modals" onclick="$('#modal-add').modal('hide'); producto.editURLimg = 0;"><i class="fas fa-lg fa-ban"></i> Cancelar</button>
                                        </div>
                                    </div>

                                    

                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>




        <!-- MODAL ADD PROCESOS -->
        <!-- MODAL ADD PROCESOS -->
        <div class="modal fade bd-example-modal-sm" id="modal-add-procesos" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
    
                        <div class="container-fluid" style="padding:15px;">
                            <div class="row justify-content-center"> 
                                <div class="col-md-12">
                                    <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add-procesos').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                                    <form id="formulario-procesos" class="formulario-modal" enctype="multipart/form-data">
                                        <h4 style="margin-bottom:18px;width:80%;">REGISTRAR PROCESO</h4>
                                        <br>
                                        <div class="form-group row">
                                            <label for="proc_MATERIAL" class="col-sm-3 col-form-label">*Material</label>
                                            <div class="col-sm-9">
                                                <input type="text" class="form-control" id="proc_MATERIAL" name="proc_MATERIAL" placeholder="Insumo para el producto" required>
                                            </div>
                                        </div>
                                        <!--
                                        <div class="form-group row">
                                            <label for="proc_CANTIDAD" class="col-sm-3 col-form-label">*Cantidad</label>
                                            <div class="col-sm-9">
                                                <input type="number" step="any" class="form-control" id="proc_CANTIDAD" name="proc_CANTIDAD" placeholder="Cantidad" required>
                                            </div>
                                        </div>
                                        -->
                                        <div class="form-group row">
                                            <label for="proc_PRECIO" class="col-sm-3 col-form-label">*Costo del material</label>
                                            <div class="col-sm-9">
                                                <input type="number" step="any" class="form-control" id="proc_PRECIO" name="proc_PRECIO" placeholder="Precio del insumo S/." required>
                                            </div>
                                        </div>
                                        
                                        <!--
                                        <div class="form-group row">
                                            <label for="proc_ST" class="col-sm-3 col-form-label">*Sub Total</label>
                                            <div class="col-sm-9">
                                                <input type="number" step="any" class="form-control" id="proc_ST" name="proc_ST" placeholder="Sub Total" readonly>
                                            </div>
                                        </div>
                                        -->
                                       
    
                                        <div class="w-100" style="height:8px;"></div>
                                        <div id="procesos-ajax-result"></div>



                                        <div class="row justify-content-around">
                                            <div class="col-sm-4 col-12 mb-2">
                                                <button type="submit" class="btn btn-block btn-success btn_modals"><i class="far fa-lg fa-save"></i> Guardar</button>
                                            </div>
                                            <div class="col-sm-4 col-12 mb-2 modal-btn-cont-2">
                                            
                                            </div>
                                            <div class="col-sm-4 col-12 mb-2">
                                                <button type="button" class="btn btn-block btn-warning btn_modals" onclick="$('#modal-add-procesos').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cancelar</button>
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