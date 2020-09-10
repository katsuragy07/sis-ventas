

<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">
                <!-- Brand Logo -->
                <a href="../index.php" class="brand-link text-center">
                    <img src="../img/logo.png" alt="AdminLTE Logo" class="brand-image elevation-3"
                        style="opacity: .8; float:none;">
                    <span class="brand-text font-weight"></span>
                </a>

                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar user panel (optional) -->
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <?php
                                if(isset($_SESSION['foto']) && $_SESSION['foto']!=null && $_SESSION['foto']!=""){
                                    echo '<img src="../img/upload/usuarios/'.$_SESSION['foto'].'" class="img-circle elevation-2" alt="User Image">';
                                }else{
                                    echo '<img src="../img/user.png" class="img-circle elevation-2" alt="User Image">';
                                }
                            ?>
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">
                                <span style="color:#3c763d;font-size:10px;margin-right:3px;"><i class="fas fa-circle"></i></span>
                                <?php
                                    echo $_SESSION['apellido']." ".$_SESSION['nombre'];
                                ?>
                            </a>
                        </div>
                    </div>

                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library -->
                        <li class="nav-item has-treeview menu-open">
                            <a href="#" class="nav-link active">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Herramientas
                            </p>
                            </a>
                        </li>
                        
                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-shopping-cart"></i>
                                <p>
                                    Ventas
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview pl-3">
                                <li class="nav-item">
                                    <a href="../menus/cotizaciones.php" class="nav-link">
                                    <i class="nav-icon fas fa-file-invoice-dollar"></i>
                                    <p>Cotizaciones</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="../menus/venta.php" class="nav-link">
                                    <i class="nav-icon fas fa-coins"></i>
                                    <p>Ventas</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-cash-register"></i>
                                <p>
                                    Caja
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview pl-3">
                                <li class="nav-item">
                                    <a href="../menus/cajas.php" class="nav-link">
                                    <i class="nav-icon fas fa-cash-register"></i>
                                    <p>Crear / Ver</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="../menus/aperturas.php" class="nav-link">
                                    <i class="nav-icon fas fa-balance-scale"></i>
                                    <p>Apertura / Cierre</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="../menus/movimientos.php" class="nav-link">
                                    <i class="nav-icon fas fa-money-bill-wave"></i>
                                    <p>Movimientos</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-paste"></i>
                                <p>
                                    Reportes
                                    <i class="fas fa-angle-left right"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview pl-3">
                                <li class="nav-item">
                                    <a href="../menus/reporte_flujo.php" class="nav-link">
                                    <i class="nav-icon fas fa-money-bill-wave"></i>
                                    <p>Flujo de caja</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    
                        <li class="nav-header">ADMINISTRACIÓN</li>

                        <li class="nav-item">
                            <a href="../usuarios.php" class="nav-link">
                            <i class="nav-icon fas fa-user-tie"></i>
                            <p>
                                Usuarios
                            </p>
                            </a>
                        </li>
                        
                        <li class="nav-item">
                            <a href="../clientes.php" class="nav-link">
                            <i class="nav-icon fas fa-users"></i>
                            <p>
                                Clientes
                            </p>
                            </a>
                        </li>

                        <li class="nav-item">
                            <a href="../productos_categoria.php" class="nav-link">
                            <i class="nav-icon fas fa-boxes"></i>
                            <p>
                                Productos
                            </p>
                            </a>
                        </li>

                        <li class="nav-item has-treeview">
                            <a href="#" class="nav-link">
                                <i class="nav-icon fas fa-people-carry"></i>
                                <p>
                                    Proveedores
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul class="nav nav-treeview pl-3">
                                <li class="nav-item">
                                    <a href="../proveedores_categoria.php" class="nav-link">
                                    <i class="nav-icon fas fa-truck-loading"></i>
                                    <p>Registrar</p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="../menus/buscar_prov.php" class="nav-link">
                                    <i class="nav-icon fas fa-search"></i>
                                    <p>Buscar</p>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    
                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
</aside>