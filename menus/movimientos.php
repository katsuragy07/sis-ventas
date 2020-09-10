<?php

    session_start();
    if(!isset($_SESSION['user'])){
        header('Location: '."../intranet.php"); 
    }else{
        require_once("../includes/rutas.php");
    }
    

    if(substr($accesos['cajas'],2,1) == 0){
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
                                <h3><span class="badge badge-info">MOVIMIENTOS DE CAJA</span></h3>
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
                                <button type="button" class="btn btn-block btn-success" data-toggle="modal" data-target="#modal-add" onclick='btn_add_movimientos();'>Añadir <i class="fas fa-plus"></i></button>
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
                                            <option value="FECHA" selected>FECHA</option>
                                        </select>
                                    </div>
                                    <div class="col-md-8 col-sm-8 mb-2">
                                        <input class="form-control" id="movimientos_buscar" type="date" placeholder="Buscar movimientos de caja" aria-label="Search" oninput="caja.listarMovimientos($(this).val());">
                                    </div>
                                    <div class="col-md-2 col-sm-12 mb-2">
                                        <button class="btn btn-block btn-success" type="button" onClick="caja.listarMovimientos($('#movimientos_buscar').val());">Buscar</button>
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
                                            <th scope="col">Fecha</th>
                                            <th scope="col">Voucher</th>
                                            </tr>
                                        </thead>
                                        <tbody id="load_data_movimientos">
                                        
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
                                <h4 style="width:80%;">Nueva Caja</h4>
                                <br>
                                <form id="formulario-movimientos" enctype="multipart/form-data">
                                    <div class="form-row">
                                        <div class="form-group col-sm-5">
                                            <label for="movimiento_tipo">Tipo de movimiento*</label>
                                            <select class="form-control" id="movimiento_tipo" name="movimiento_tipo" placeholder="Tipo de movimiento" required>
                                                <option value="" selected disabled>--Seleccionar--</option>
                                                <option value="INGRESO">Ingreso</option>
                                                <option value="EGRESO">Egreso</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-sm-7">
                                            <label for="movimiento_caja">Caja*</label>
                                            <select class="form-control" id="movimiento_caja" name="movimiento_caja" placeholder="Caja" required>
                                                <option value="" selected disabled>--Seleccionar--</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-sm-12">
                                            <label for="movimiento_monto">Monto*</label>
                                            <input type="number" step="0.01" class="form-control" id="movimiento_monto" name="movimiento_monto" placeholder="Monto del movimiento" required>
                                        </div>
                                        <div class="form-group col-sm-12">
                                            <label for="movimiento_concepto">Concepto*</label>
                                            <input type="text" class="form-control" id="movimiento_concepto" name="movimiento_concepto" placeholder="Concepto del movimiento" required>
                                        </div>
                                        
                                        <!--
                                        <div class="form-group col-sm-6">
                                            <label for="movimiento_tipo_comprobante">Tipo comprobante*</label>
                                            <input type="text" class="form-control" id="movimiento_tipo_comprobante" name="movimiento_tipo_comprobante" placeholder="Tipo de comprobante" required>
                                        </div>
                                        <div class="form-group col-sm-6">
                                            <label for="movimiento_nro_comprobante">N° de comprobante*</label>
                                            <input type="text" class="form-control" id="movimiento_nro_comprobante" name="movimiento_nro_comprobante" placeholder="Número del comprobante" required>
                                        </div>
                                        -->
                                        <div class="form-group col-sm-12">
                                            <label for="movimiento_detalle">Detalle de movimiento</label>
                                            <textarea type="text" class="form-control" id="movimiento_detalle" name="movimiento_detalle" placeholder="Detalle del movimiento" cols="12" rows="3"></textarea>
                                        </div>

                                        <!--
                                        <div class="form-group col-sm-12">
                                            <label for="movimiento_autoriza">Autorización</label>
                                            <input type="text" class="form-control" id="movimiento_autoriza" name="movimiento_autoriza" placeholder="Quien autoriza">
                                        </div>
                                        -->

                                        <div class="form-group col-6">
                                            <label for="caja_fecha">Fecha*</label>
                                            <input type="date" class="form-control" id="caja_fecha" name="caja_fecha" required readonly>
                                        </div>
                                        <div class="form-group col-6">
                                            <label for="caja_hora">Hora*</label>
                                            <input type="text" class="form-control" id="caja_hora" name="caja_hora" placeholder="Hora de la operación" required readonly>
                                        </div>
                                        <div class="form-group col-sm-12">
                                            <label for="caja_resp">Responsable*</label>
                                            <input type="text" class="form-control" id="caja_resp" name="caja_resp" placeholder="Responsable de la Caja" required readonly>
                                            <input type="hidden" class="form-control" id="caja_resp-hidden" name="caja_resp-hidden" placeholder="ID responsable de la Caja" required readonly>
                                        </div>
                                    </div>

                                    <div class="w-100" style="height:8px;"></div>
                                    <div id="msg-ajax-result"></div>



                                    
                                    <div class="row justify-content-around">
                                        <div class="col-sm-6 col-12 mb-2">
                                            <button type="submit" class="btn btn-block btn-success btn_modals"><i class="far fa-lg fa-save"></i> Registrar</button>
                                        </div>
                                        <div class="col-sm-6 col-12 mb-2">
                                            <button type="button" class="btn btn-warning btn-block btn_modals" onclick="$('#modal-add').modal('hide');"><i class="fas fa-lg fa-ban"></i> Cancelar</button>
                                        </div>
                                    </div>


                                    


                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>





        <!-- MODAL TICKET -->
        <!-- MODAL TICKET -->
        <div class="modal fade bd-example-modal-sm" id="modal-ticket"  tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document" style="max-width:400px;">
                <div class="modal-content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-danger" style="position:absolute;right:5px;top:3.5px;padding:3px 11px; z-index:1000;" onclick="$('#modal-ticket').modal('hide');"><i class="fas fa-lg fa-times"></i></button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col" id="print-voucher">

                                <br>
                                <center><img src="../img/logoticket.jpg"></center>


                                <h5 style="margin:7px 4px; margin-top:18px; text-align:center; font-family:monospace; font-weight:bold;" id="voucher-titulo">VOUCHER</h5>
                                
                                <hr style="margin-top:5px; max-width:320px;">
                            
                                

                                

                                <table style="font-family:monospace; font-size:14px; margin:auto;" id="voucher-datos01">
                                    <tr>
                                        <td>FECHA:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>DIRECCION:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>CREDITO:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>FECHA:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>DNI:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>NOMBRES:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>APELLIDOS:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>DESEMBOLSO:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>MONTO:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>N° CUOTAS:</td>
                                        <td>:</td>
                                        <td>00000 00</td>
                                    </tr>
                                    <tr>
                                        <td>ASESOR:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                    <tr>
                                        <td>VENTANILLA:</td>
                                        <td>:</td>
                                        <td>0000000000</td>
                                    </tr>
                                </table>

                               
                                <hr style="max-width:280px;">

                                <p class="text-center" style="font-family:monospace; font-size:14px;">Operación Completa</p>

                                <p class="text-center" style="font-family:monospace; margin-bottom:0px; font-size:14px;" id="voucher-datos02"></p>
                                <p class="text-center font-weight-bold" style="font-family:monospace; font-size:14px;">MOVIMIENTOS</p>

                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <center><button type="button" class="btn btn-primary" onclick="printDiv('print-voucher')"><i class="far fa-file-alt"></i> Imprimir</button></center>
                                <br>
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