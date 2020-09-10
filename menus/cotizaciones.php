<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."../intranet.php"); 
    }else{
        require_once("../includes/rutas.php");
    }
    
    if(substr($accesos['ventas'],0,1) == 0){
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
                                <h3><span class="badge badge-info">COTIZACIONES</span></h3>
                            </div>
                            <div class="col-sm-4 col-6">
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <a onClick="window.location.href='../ventas.php';" class="btn btn-secondary" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option2" autocomplete="off"><i class="fas fa-lg fa-arrow-alt-circle-left"></i>
                                    </a>
                                    <a onClick="window.location.href='../index.php';" class="btn btn-secondary active" style="color:white; cursor:pointer;">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked><i class="fas fa-home"></i> Inicio
                                    </a> 
                                </div>
                            </div>
                            <div class="col-sm-4 col-6">
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add("cotizacion");'><i class="fas fa-plus"></i> Nueva Cotización</button>
                            </div>
                        </div>
                    </div>
            
                    <br>
    
                    <div class="container-fluid">
                        <div class="row justify-content-end">
                            <div class="col-12 mb-1">
                                <form class="row">
                                    <div class="col-md-2 col-sm-4 mb-2">
                                        <select class="form-control" id="cotizaciones_buscar_tipo">
                                            <option value="CLIENTE" selected>CLIENTE</option>
                                            <option value="NRO">NRO</option>
                                        </select>
                                    </div>
                                    <div class="col-md-8 col-sm-8 mb-2">
                                        <input class="form-control" id="cotizaciones_buscar" type="search" placeholder="Buscar Cotizaciones" aria-label="Search" oninput="venta.buscar_cotizacion($(this).val());">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success" type="button" onClick="venta.buscar_cotizacion($('#cotizaciones_buscar').val());"><i class="fas fa-search"></i> Buscar</button>
                                    </div>     
                                </form>
                            </div>
    
                         
                            <div class="col-12 mb-2">
                                <div class="table-responsive">
                                    <table class="table table-striped table-bordered text-center">
                                        <thead class="thead-dark">
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Nro COT</th>
                                            <th scope="col">Cliente</th>
                                            <th scope="col">Teléfono</th>
                                            <th scope="col">Monto de Cotización</th>
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Estado</th>
                                            <th scope="col">Operaciones</th>
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_cotizaciones">
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <div id="load_table_cotizaciones"></div>
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
            <div class="modal-dialog modal-lg">
                <div class="modal-content">

                    <div class="container-fluid modal-body" style="padding:15px;">
                        <div class="row justify-content-center"> 
                            <div class="col-md-12">
                                <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add').modal('hide'); user.editURLimg = 0;"><i class="fas fa-lg fa-times"></i></button>
                                <form id="formulario-cotizaciones" class="formulario-modal" enctype="multipart/form-data">
                                    <h4 style="margin-bottom:18px;width:80%;">NUEVA COTIZACIÓN</h4>
                                                                        
                                    <nav>
                                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                            <a class="nav-item nav-link active" id="nav-general-tab" data-toggle="tab" href="#nav-general" role="tab" aria-controls="nav-general" aria-selected="true">General</a>
                                        </div>
                                    </nav>
                                    <div class="row justify-content-center">   
                                        <div class="tab-content row justify-content-center col-12" id="nav-tabContent">

                                            <div class="col-12 tab-pane fade show active" id="nav-general" role="tabpanel" aria-labelledby="nav-general-tab">
                                                <br>
                                               
                                                <div class="form-group row">
                                                    <label for="inputUSER" class="col-sm-3 col-form-label">*Usuario</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputUSER" name="inputUSER" placeholder="Nombre del Usuario" readonly>
                                                        <input type="hidden" name="inputUSER-hidden" id="inputUSER-hidden" readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <label for="inputCLIENT" class="col-sm-3 col-form-label">*Cliente</label>
                                                    <div class="col-sm-9">
                                                        <input list="clientes" type="text" class="form-control form-control-sm" id="inputCLIENT" name="inputCLIENT" placeholder="Nombre del Cliente" autocomplete="off" onKeyUp="venta.buscarCliente(this.value);" required>
                                                        <input type="hidden" name="inputCLIENT-hidden" id="inputCLIENT-hidden" readonly>
                                                        <datalist id="clientes">
                                                            
                                                        </datalist>
                                                    </div>
                                                </div>

                                                <div class="form-group row" style="margin-bottom:7px;">
                                                    <label for="inputDOC" class="col-sm-3 col-form-label">*Tipo de Documento</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputDOC" name="inputDOC" placeholder="Tipo de Documento" required readonly>    
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:7px;">
                                                    <label for="inputDOCNRO" class="col-sm-3 col-form-label">*Número de Documento</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputDOCNRO" name="inputDOCNRO" placeholder="Nro de Documento" required readonly>    
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:7px;">
                                                    <label for="inputDIR" class="col-sm-3 col-form-label">*Dirección</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputDIR" name="inputDIR" placeholder="Dirección" required readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:7px;">
                                                    <label for="inputTEL" class="col-sm-3 col-form-label">*Teléfono</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputTEL" name="inputTEL" placeholder="Teléfono" required readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:7px;">
                                                    <label for="inputEMAIL" class="col-sm-3 col-form-label">*Correo</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control form-control-sm" id="inputEMAIL" name="inputEMAIL" placeholder="Correo Electrónico" readonly required>
                                                    </div>
                                                </div>


                                                <div class="form-group row" style="margin-top:20px; margin-bottom:8px;">
                                                    <label for="inputVALIDEZ" class="col-sm-3 col-form-label">*Tiempo de validez</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputVALIDEZ" name="inputVALIDEZ" placeholder="Validez de la proforma" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:8px;">
                                                    <label for="inputENTREGA" class="col-sm-3 col-form-label">*Tiempo de entrega</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputENTREGA" name="inputENTREGA" placeholder="Tiempo estimado de la entrega" required>
                                                    </div>
                                                </div>
                                                <div class="form-group row" style="margin-bottom:8px;">
                                                    <label for="inputCOMPROBANTE" class="col-sm-3 col-form-label">*Tipo de comprobante de pago a emitir</label>
                                                    <div class="col-sm-9">
                                                        <input type="text" class="form-control" id="inputCOMPROBANTE" name="inputCOMPROBANTE" placeholder="Tipo de comprobante de pago" required>
                                                    </div>
                                                </div>


                                                
                                                <br>
                                                <span class="badge badge-info" style="font-size:1em;">Productos</span>
                                                <hr style="margin-top: 6px;">
                                         

                                                <div class="form-group row" style="margin-bottom:0.5em;margin-left:-10px;">
                                                    <div class="col-md-1 col-12 col-12 text-center" style="margin-left:-5px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2 text-center" style="margin-left:-5px;"><span class="badge badge-success">Cantidad</span></div>
                                                    <div class="col-md-4 col-sm-5 col-5 text-center" style="margin-left:-2px;"><span class="badge badge-success">Producto</span></div>
                                                    <!--<div class="col-sm-2 text-center" style="margin-left:-1px;"><span class="badge badge-success">STOCK</span></div>-->
                                                    <div class="col-md-2 col-sm-2 col-2 text-center" style="margin-left: 4px;"><span class="badge badge-success">Unidad</span></div>
                                                    <!--<div class="col-sm-1 text-center" style="margin-left:-1px;"><span class="badge badge-success">Millar</span></div>-->
                                                    <div class="col-md-2 col-sm-3 col-3 text-center" style="margin-left:-1px;"><span class="badge badge-success">Sub Total</span></div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-md-1 col-12 col-12" style="padding:0px 1px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_CANT1" name="cot_CANT1" placeholder="Cantidad" oninput="venta.calcularSubTotal(1);">
                                                    </div>
                                                    <div class="col-md-4 col-sm-5 col-5" style="padding:0px 1px;">
                                                        <input list="ls_prod1" type="text" step="any" class="form-control form-control-sm" id="cot_PROD1" name="cot_PROD1" placeholder="Nombre de Producto" autocomplete="off" onKeyUp="venta.buscarProducto(this.value,1);">
                                                        <input type="hidden" name="cot_PROD1-hidden" id="cot_PROD1-hidden">
                                                        <datalist id="ls_prod1">
                                                            
                                                        </datalist>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_STOCK1" name="cot_STOCK1" placeholder="STOCK" readonly>
                                                    </div>
                                                    -->
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_PU1" name="cot_PU1" style="letter-spacing: -1px;" placeholder="S/. Precio" oninput="venta.calcularSubTotal(1);">
                                                    </div>
                                                    <div class="col-md-2 col-sm-3 col-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_ST1" name="cot_ST1" placeholder="Sub Total S/."  readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-md-1 col-12 col-12" style="padding:0px 1px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_CANT2" name="cot_CANT2" placeholder="Cantidad" oninput="venta.calcularSubTotal(2);">
                                                    </div>
                                                    <div class="col-md-4 col-sm-5 col-5" style="padding:0px 1px;">
                                                        <input list="ls_prod2" type="text" step="any" class="form-control form-control-sm" id="cot_PROD2" name="cot_PROD2" placeholder="Nombre de Producto" autocomplete="off" onKeyUp="venta.buscarProducto(this.value,2);">
                                                        <input type="hidden" name="cot_PROD2-hidden" id="cot_PROD2-hidden">
                                                        <datalist id="ls_prod2">
                                                            
                                                        </datalist>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_STOCK2" name="cot_STOCK2" placeholder="STOCK" readonly>
                                                    </div>
                                                    -->
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_PU2" name="cot_PU2" style="letter-spacing: -1px;" placeholder="S/. Precio" oninput="venta.calcularSubTotal(2);">
                                                    </div>
                                                    <div class="col-md-2 col-sm-3 col-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_ST2" name="cot_ST2" placeholder="Sub Total S/."  readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-md-1 col-12 col-12" style="padding:0px 1px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_CANT3" name="cot_CANT3" placeholder="Cantidad" oninput="venta.calcularSubTotal(3);">
                                                    </div>
                                                    <div class="col-md-4 col-sm-5 col-5" style="padding:0px 1px;">
                                                        <input list="ls_prod3" type="text" step="any" class="form-control form-control-sm" id="cot_PROD3" name="cot_PROD3" placeholder="Nombre de Producto" autocomplete="off" onKeyUp="venta.buscarProducto(this.value,3);">
                                                        <input type="hidden" name="cot_PROD3-hidden" id="cot_PROD3-hidden">
                                                        <datalist id="ls_prod3">
                                                            
                                                        </datalist>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_STOCK3" name="cot_STOCK3" placeholder="STOCK" readonly>
                                                    </div>
                                                    -->
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_PU3" name="cot_PU3" style="letter-spacing: -1px;" placeholder="S/. Precio" oninput="venta.calcularSubTotal(3);">
                                                    </div>
                                                    <div class="col-md-2 col-sm-3 col-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_ST3" name="cot_ST3" placeholder="Sub Total S/."  readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-md-1 col-12 col-12" style="padding:0px 1px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_CANT4" name="cot_CANT4" placeholder="Cantidad" oninput="venta.calcularSubTotal(4);">
                                                    </div>
                                                    <div class="col-md-4 col-sm-5 col-5" style="padding:0px 1px;">
                                                        <input list="ls_prod4" type="text" step="any" class="form-control form-control-sm" id="cot_PROD4" name="cot_PROD4" placeholder="Nombre de Producto" autocomplete="off" onKeyUp="venta.buscarProducto(this.value,4);">
                                                        <input type="hidden" name="cot_PROD4-hidden" id="cot_PROD4-hidden">
                                                        <datalist id="ls_prod4">
                                                            
                                                        </datalist>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_STOCK4" name="cot_STOCK4" placeholder="STOCK" readonly>
                                                    </div>
                                                    -->
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_PU4" name="cot_PU4" style="letter-spacing: -1px;" placeholder="S/. Precio" oninput="venta.calcularSubTotal(4);">
                                                    </div>
                                                    <div class="col-md-2 col-sm-3 col-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_ST4" name="cot_ST4" placeholder="Sub Total S/."  readonly>
                                                    </div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-md-1 col-12 col-12" style="padding:0px 1px;"></div>
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_CANT5" name="cot_CANT5" placeholder="Cantidad" oninput="venta.calcularSubTotal(5);">
                                                    </div>
                                                    <div class="col-md-4 col-sm-5 col-5" style="padding:0px 1px;">
                                                        <input list="ls_prod5" type="text" step="any" class="form-control form-control-sm" id="cot_PROD5" name="cot_PROD5" placeholder="Nombre de Producto" autocomplete="off" onKeyUp="venta.buscarProducto(this.value,5);">
                                                        <input type="hidden" name="cot_PROD5-hidden" id="cot_PROD5-hidden">
                                                        <datalist id="ls_prod5">
                                                            
                                                        </datalist>
                                                    </div>
                                                    <!--
                                                    <div class="col-sm-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_STOCK5" name="cot_STOCK5" placeholder="STOCK" readonly>
                                                    </div>
                                                    -->
                                                    <div class="col-md-2 col-sm-2 col-2" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_PU5" name="cot_PU5" style="letter-spacing: -1px;" placeholder="S/. Precio" oninput="venta.calcularSubTotal(5);">
                                                    </div>
                                                    <div class="col-md-2 col-sm-3 col-3" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_ST5" name="cot_ST5" placeholder="Sub Total S/."  readonly>
                                                    </div>
                                                </div>

                                                
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-lg-6 col-md-5 col-sm-5 col-12"></div>
                                                    <div class="col-lg-2 col-md-3 col-sm-3 col-4"><span style="width:100%;float:right; margin-top:1px; padding:9px; font-size: 11px;" class="badge badge-secondary">SUB TOTAL</span></div>
                                                    <div class="col-lg-3 col-md-3 col-sm-4 col-8" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_SUBTOTAL" name="cot_SUBTOTAL" placeholder="Monto S/."  readonly required>
                                                    </div>
                                                </div>
                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-lg-6 col-md-5 col-sm-5 col-12"></div>
                                                    <div class="col-lg-2 col-md-3 col-sm-3 col-4"><span style="width:100%;float:right; margin-top:1px; padding:9px; font-size: 11px;" class="badge badge-secondary">IMPUESTO (%)</span></div>
                                                    <div class="col-lg-3 col-md-3 col-sm-4 col-8" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control form-control-sm" id="cot_IGV" name="cot_IGV" placeholder="Impuesto %"  required oninput="venta.calcularSubTotal(1);">
                                                    </div>
                                                </div>

                                                <div class="form-group row cotizacion-form" style="margin-bottom:0.5em;">
                                                    <div class="col-lg-6 col-md-5 col-sm-5 col-12"></div>
                                                    <div class="col-lg-2 col-md-3 col-sm-3 col-4"><span style="width:100%;float:right; margin-top:1px; padding:9px; font-size: 14px;" class="badge badge-danger">TOTAL</span></div>
                                                    <div class="col-lg-3 col-md-3 col-sm-4 col-8" style="padding:0px 1px;">
                                                        <input type="number" step="any" class="form-control" id="cot_TOTAL" name="cot_TOTAL" placeholder="Monto Total S/."  readonly required>
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


        

        <!-- MODAL ADD IMP-->
        <!-- MODAL ADD IMP-->
        <div class="modal fade bd-example-modal-sm" id="modal-add-print" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-scrollable">
                <div class="modal-content">

                    <div class="container-fluid modal-body" id="modal-add-print-top">


                        <div class="row">
                            <div class="col">
                                <div class="modal_head_loading">
                                    
                                </div>
                                <button type="button" class="btn btn-danger modal_head_close" style="position:relative;float:right;padding:3px 11px;margin-top:5px;" onclick="$('#modal-add-print').modal('hide');"><i class="fas fa-lg fa-times"></i></button>    
                            </div>
                        </div>


                        <div class="row">

                            <div class="col-12 mt-1">
                                <!--<hr style="margin-top:5px; margin-bottom:3px;">-->
                                <nav>
                                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                        <a class="nav-item nav-link active" id="nav-creative-tab" data-toggle="tab" href="#nav-creative" role="tab" aria-controls="nav-creative" aria-selected="true">Creative</a>
                                        <a class="nav-item nav-link" id="nav-free-tab" data-toggle="tab" href="#nav-free" role="tab" aria-controls="nav-free" aria-selected="true">Free Innovation</a>
                                    </div>
                                </nav>
                            </div>


                            <div class="col-12" id="print-cotizacion" style="font-size:1em; background:white; overflow: hidden;">
                                <br>
                                <div class="tab-content row justify-content-center col-12" id="nav-tabContent">

                                    <div class="col-12 tab-pane fade show active" id="nav-creative" role="tabpanel" aria-labelledby="nav-creative-tab">

                                        <div class="row">
                                            <div class="col-12">
                                                <center><img src="../img/logoticket.jpg"></center>
                                            </div>
                                            <div class="col-12">
                                                <table style="font-family:arial; font-size:14px; float:right; margin-right:15px; margin-top:4px;" id="cotizacion-datos01">
                                                    <tr>
                                                        <td>RUC:</td>
                                                        <td>:</td>
                                                        <td>20487099822</td>
                                                    </tr>
                                                    <tr>
                                                        <td>FECHA</td>
                                                        <td>:</td>
                                                        <td></td>
                                                    </tr>
                                                </table>     
                                            </div>
                                            <div class="col-12">
                                                <center><h5 style="margin-top:10px; font-size:1.3em;" id="cotizacion-datos02" class="cotizacion-letra">PROFORMA N°</h5></center>
                                            </div>
                                        </div>

                                        <div class="row">  
                                            <div class="col-12">
                                                <div style="display:block;position:relative;padding:14px 12px;">
                                                    <table class="cotizacion-letra" style="font-family:arial;float:left;" id="cotizacion-datos03">        
                                                        <tr>
                                                            <th>ESTIMADOS(AS): </th>
                                                            <th class="font-weight-normal pl-2"> UNCP GESTION DE LA CALIDAD</th>
                                                        </tr>     
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <br>           

                                        <div class="row" style="">
                                            <div class="col-12 cont_imp_tabla">
                                                <div class="table-responsive">
                                                    <table class="table table-sm table-striped table-bordered text-center cotizacion-letra">
                                                        <thead class="thead-dark">
                                                            <tr>
                                                                <th scope="col" style="width:110px">CANTIDAD</th>
                                                                <th scope="col" style="width:110px">DESCRIPCIÓN / ESPECIFICACIONES TÉCNICAS</th>
                                                                <th scope="col" style="width:110px">PRECIO UNITARIO</th>
                                                                <th scope="col" style="width:110px">TOTAL</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id="cotizacion-datos04">
                                                            <tr>
                                                                <th scope="row"></th>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"></th><td></td><td></td><td></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"></th><td></td><td></td><td></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"></th><td></td><td></td><td></td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"></th><td></td><td></td><td></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row" style="">
                                            <div class="col-12 cont_imp_tabla cotizacion-letra" id="cotizacion-datos05" style="text-transform: uppercase;">
                                                <!--
                                                <table class="cotizacion-letra">
                                                    <tbody >
                                                        <tr>
                                                            <th scope="row"></th><td></td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row"></th><td></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                                -->
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row" style="position:relative;">
                                            <div class="col-12">
                                                <center><img src="../img/firma.png" width="300"><center>
                                            </div>
                                        </div>
                                           
                                        <br>

                                        <div class="row justify-content-center" style="position:relative; bottom:10px; right:10px;">
                                            <div class="col-12 cont_imp_tabla cotizacion-letra" style="font-family:arial; float:right; font-size:0.8em;text-align:right;" id="cotizacion-datos06">

                                                    <h4 style="color:#89EE14; font-size:1.6em; font-family: sans-serif; letter-spacing: 1px;">www.<span style="color:black;font-size:1.3em;">creative-btl</span>.com</h4>

                                                    <span style="display:block;margin-top:-5px;"><b>Móbil: </b>
                                                    964 660 482<br></span>
                                                    
                                                    <span style="display:block;margin-top:-5px;"><b style="margin-top:-3px;">Fijo:</b>
                                                    (064) 201773<br></span>
                                                
                                                    <span style="display:block;margin-top:-5px;"><b style="margin-top:-3px;">Home:</b>
                                                    Jr. Ancash N° 149 - Huancayo<br></span>
                                                
                                                    <span style="display:block;margin-top:-5px;"><b></b>
                                                    creative@creative-btl.com<br></span>
                                                
                                            </div>
                                        </div>

                                    </div>

                                    <div class="col-12 tab-pane fade" id="nav-free" role="tabpanel" aria-labelledby="nav-free-tab">


                                        <div class="row justify-content-between">
                                            <div class="col-6">
                                                <div style="position:absolute; background: #FAB14A; transform: skewX(-45deg) translateX(-50%); height: 100px; width: 50%; border-radius: 0px 10px 7px 0px; z-index: 2000;">
                                                    <div style="position:absolute; background: #EFBD31; transform: translate(-25%,-15px); height: 130px; width: 100%; z-index: 2200;">
                                                        <div style="position:absolute; background: rgb(43, 43, 43); left:70%; transform: translateX(-100%); height: 130px; width: 20%; z-index: 2200;">
                                                        </div>
                                                    </div>
                                                    <div style="width:200%; position:relative; top:50%; transform: translateY(-50%) translateX(25%); background: rgb(43, 43, 43); z-index: 1900;">
                                                        <div  style="transform: skewX(45deg);">
                                                            <h5 style="color:white; text-align:center; padding-left:20px;">PROFORMA N° 001</h5>
                                                        </div>
                                                    </div> 
                                                </div>
                                            </div>
                                            <div class="col-4" style="text-align: right;">
                                                <img src="../img/free.png" width="100%" style="max-width:190px; margin-top: -10px;">
                                            </div>
                                        </div>

                                        <br><br>

                                        <div class="row">
                                            <div class="col-sm-7" style="margin-top: 12px;">
                                                <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Cliente</span>
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px;">asdasdsadsadsa asdasdad sadasd</div>
                                            </div>
                                            <div class="col-sm-5" style="margin-top: 12px;">
                                                <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Fecha</span>
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px;">12/08/2020</div>
                                            </div>
                                            <div class="col-sm-12" style="margin-top: 12px;">
                                                <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Tiempo de entrega</span>
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px;">12/08/2020</div>
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div style="width:100%; text-align:center; display:flex; background: rgb(255, 236, 143); border-radius: 6px; padding: 2px 6px;">
                                                <div class="col-2">
                                                    Cant.
                                                </div>
                                                <div class="col-7">
                                                    Descripción
                                                </div>
                                                <div class="col-3">
                                                    P. Unitario
                                                </div>
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div class="col-2">
                                                <div style="background: rgb(255, 236, 143); border-radius: 150px; text-align:center; padding: 8px 6px;">
                                                    asda<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                </div>
                                            </div>
                                            <div class="col-7">
                                                <div style="border: 5px solid rgb(255, 236, 143); border-radius: 3px; text-align:center; padding: 8px 6px;">
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div style="background: rgb(255, 236, 143); border-radius: 150px; text-align:center; padding: 8px 6px;">
                                                    asdasda<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                    a<br>
                                                </div> 
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div class="col-2">
                                               
                                            </div>
                                            <div class="col-7">
                                                <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                                a
                                                </div> 
                                            </div>
                                            <div class="col-3">
                                                <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                                a
                                                </div> 
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div style="width:100%; display:flex; border: 7px solid rgb(250, 235, 162); border-radius: 6px; font-size:0.8em;">
                                                <div class="col-4">
                                                    <img src="../img/icons/fb.png" width="25"> Free innovation
                                                    <br>
                                                    <img src="../img/icons/ph.png" width="20"><img src="../img/icons/ws.png" width="25"> 988386004 – 971830227
                                                </div>
                                                <div class="col-4">
                                                    <b>Dirección:</b> Jr. Ancash N°149 - Huancayo
                                                    <br>
                                                    <img src="../img/icons/gm.png" width="25"> freeinnovationeirl@gmail.com
                                                </div>
                                                <div class="col-4" style="text-align: center;">
                                                    <b>RUC:</b> 20604189455
                                                </div>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                            </div>

                        </div>


                        <div class="row">
                            <div class="col-12">

                                <hr>
                                <div class="row justify-content-around">
                                    <div class="col-md-3 col-sm-4 col-12 mb-2">
                                        <button type="button" class="btn btn-block btn-success btn_actions_cot btn_actions_imp" onclick="printDiv('print-cotizacion')"><i class="fas fa-file-alt"></i> Imprimir</button>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-12 mb-2">
                                        <button type="button" class="btn btn-block btn-primary btn_actions_cot" onclick="downloadDiv('print-cotizacion','cotizacion')"><i class="fas fa-download"></i> Descargar</button>
                                    </div>
                                    <div class="col-md-3 col-sm-4 col-12 mb-2">
                                        <button type="button" class="btn btn-block btn-info btn_actions_cot btn_actions_email" data-toggle="modal" data-target="#modal-add-email" onclick='document.getElementById("formulario-email").reset();'><i class="fas fa-envelope"></i> Correo</button>
                                        <!--<button type="button" class="btn btn-block btn-info btn_actions_cot btn_actions_email" onclick="emailDiv('print-cotizacion','cotizacion')"><i class="fas fa-envelope"></i> Correo</button>-->
                                    </div>
                                    <div class="col-md-3 col-sm-12 col-12 mb-2">
                                        <button type="button" class="btn btn-block btn-warning btn_modals" onclick="$('#modal-add-print').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cerrar</button>
                                    </div> 
                                </div>
                                <br>

                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>





        <!-- MODAL ADD CORREO -->
        <!-- MODAL ADD CORREO -->
        <div class="modal fade bd-example-modal-sm" id="modal-add-email" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">

                                                        <div class="container-fluid" style="padding:15px;">
                                                            <div class="row"> 
                                                                <div class="col-md-12">
                                                                    <button type="button" class="btn btn-danger" style="position:absolute;right:13px;padding:6px 15px;" onclick="$('#modal-add-email').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                                                                    <h4>Enviar por Correo</h4>
                                                                    <br>
                                                                    <form id="formulario-email" enctype="multipart/form-data">
                                                                        <div class="form-row">
                                                                            <div class="form-group col-sm-12">
                                                                                <label for="caja_nombre">Correo*</label>
                                                                                <input type="email" class="form-control" id="correo_post" data-tipo="cotizacion" name="correo_post" autocomplete="on" placeholder="Receptor" required>
                                                                            </div>
                                                                        </div>

                                                                        <div class="w-100" style="height:8px;"></div>
                                                                        <div id="msg-ajax-result-email"></div>



                                                                        <div class="row justify-content-around">
                                                                            <div class="col-sm-6 col-12 mb-2 modal-btn-cont">
                                                                                <button type="submit" class="btn btn-block btn-success btn_actions_cot btn_actions_email"><i class="fas fa-envelope"></i> Enviar</button>
                                                                            </div>
                                                                            <div class="col-sm-6 col-12 mb-2">
                                                                                <button type="button" class="btn btn-warning btn-block btn_modals" onclick="$('#modal-add-email').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cerrar</button>
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

        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>

    </body>
</html>