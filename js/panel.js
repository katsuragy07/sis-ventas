
class Usuario{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
        this.editURLimg = 0;
        this.btn_img;
    }

    listar(){
        $.ajax({
            url: "backend/panel/usuarios/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            beforeSend: function(){
                $("#load_data_usuarios").html('');
                $("#load_table_usuarios").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.doc_nro}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.privilegios}</td>
                                    `;

                    if(datos.habilitado=="SI"){
                        contenido_ajax += `
                            <td><span style="padding:4px 25px;" class="badge badge-pill badge-success"> ${datos.habilitado} </span></td>
                        `;
                    }else{
                        contenido_ajax += `
                            <td><span style="padding:4px 25px;" class="badge badge-pill badge-danger"> ${datos.habilitado} </span></td>
                        `;
                    }

                    contenido_ajax += `
                                               
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary" onClick='btn_edit("usuarios",${datos.id});'><i class="fas fa-edit"></i> Editar</button>
                                                        <!--<button style="width:110px;" type="button" class="btn btn-danger" onclick="modalsDelete('slide',${datos.id},'${datos.url_foto}');"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                                    `;   
                });

                $("#load_table_usuarios").html('');
                $("#load_data_usuarios").html(contenido_ajax);
                                      
            }
        });
    }

    registrar(){ 

        this.formulario.append("editURLimg",this.editURLimg); 

        $.ajax({
            type: 'POST',
            url: 'backend/panel/usuarios/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        user.listar();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        user.editURLimg = 0;
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    editar(id){
        document.getElementById("formulario-usuarios").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("Editar Usuario");
        
        $.ajax({
            url: "backend/panel/usuarios/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                $('#inputPRIV').val(datos[0].privilegios);
                $('#inputAP').val(datos[0].apellido_pat);
                $('#inputAM').val(datos[0].apellido_mat);
                $('#inputNOM').val(datos[0].nombre);
                $('#inputDNI').val(datos[0].doc_nro);
                $('#inputUSER').val(datos[0].usuario);
                $('#inputPASS').val(datos[0].pass);
                $('#inputNAC').val(datos[0].nacimiento);
                $('#inputGRADO').val(datos[0].grado);
                $('#inputEC').val(datos[0].estado_civil);
                $('#inputLN').val(datos[0].lugar_nacimiento);
                $('#inputCOM').val(datos[0].comentarios);
                $('#inputTEL').val(datos[0].telefono);
                $('#inputDIR').val(datos[0].direccion);
                $('#inputREF').val(datos[0].referencia);
                $('#inputDIS').val(datos[0].distrito);
                $('#inputPROV').val(datos[0].provincia);
                $('#inputEMAIL').val(datos[0].correo);  
                
                if(datos[0].url_foto!=null && datos[0].url_foto!=""){
                    $("#load_foto_modal").html(`
                        <img src="img/upload/usuarios/${datos[0].url_foto}" width="100%">
                    `);
                }else{
                    $("#load_foto_modal").html(`
                        <img src="img/user.png" width="100%">
                    `);
                }

                if(datos[0].habilitado=='SI'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-danger btn_modals" onclick="user.habilitar(${id},0);"><i class="fas fa-lg fa-user-lock"></i> Bloquear</button>
                    `);
                }else{
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-primary btn_modals" onclick="user.habilitar(${id},1);"><i class="fas fa-lg fa-user-lock"></i> Desbloquear</button>
                    `);
                }


            }
        });
    }

    editarSave(id){
     
        this.formulario.append("id",id);   
        this.formulario.append("editURLimg",this.editURLimg);   

        $.ajax({
            url: "backend/panel/usuarios/ajax_editar.php",
            type: "POST",
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Actualización Correcta!
                            </div>
                        `);
                        setTimeout(()=>{
                            user.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            user.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "backend/panel/usuarios/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            user.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            user.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    buscar_usuario(clave){

        var tipo_bus = $("#usuarios_buscar_tipo").val();

        $.ajax({
            url: "backend/panel/usuarios/ajax_buscar_usuario.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus},
            beforeSend: function(){
                $("#load_data_usuarios").html('');
                $("#load_table_usuarios").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.doc_nro}</td>
                                                <td>${datos.apellido_pat + " " + datos.apellido_mat + " " + datos.nombre}</td>
                                                <td>${datos.privilegios}</td>
                                               
                                    `; 
                    
                    if(datos.habilitado=="SI"){
                        contenido_ajax += `
                                                <td class="text-center"><span class="badge badge-pill badge-success" style="padding:4px 20px;">${datos.habilitado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td class="text-center"><span class="badge badge-pill badge-danger" style="padding:4px 20px;">${datos.habilitado}</span></td>
                                    `;
                    }
                     
                    
                    contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary" onClick='btn_edit("usuarios",${datos.id});'><i class="fas fa-edit"></i> Editar</button>
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                }); 

                $("#load_table_usuarios").html('');
                $("#load_data_usuarios").html(contenido_ajax);

            }
        });
    }

    changePASS(){
        $.ajax({
            type: 'POST',
            url: 'backend/panel/ajax_pass.php',
            data: {pass: $("#inputPass01").val()},
            cache: false,
            beforeSend: function(){
                
            },
            success: function(response){
                //console.log(response);
                
                if(response==200){                      
                    $("#pass-ajax-result").html(`
                                                <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                                    Contraseña cambiada satisfactoriamente.
                                                </div>
                    `);
    
                    setTimeout(()=>{$("#formulario-pass").trigger("reset");},400);
                }else{
    
                        $("#pass-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                `+response+`
                            </div>
                        `);
                       
                }
    
                       
            },
            timeout: 9000,
            error: function(xhr, status){
                $("#pass-ajax-result").html(`
                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                        Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                    </div>
                `);      
            }
        });
    }
}

class Cliente{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
        this.editURLimg = 0;
        this.btn_img;
    }

    listar(){
        $.ajax({
            url: "backend/panel/clientes/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            beforeSend: function(){
                $("#load_data_clientes").html('');
                $("#load_table_clientes").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.tipo_doc}</td>
                                                <td>${datos.nro_doc}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.direccion}</td>
                                                <td>${datos.telefono}</td>
                                    `;

                    if(datos.habilitado=="SI"){
                        contenido_ajax += `
                                    <td><span style="padding:4px 25px;" class="badge badge-pill badge-success"> ${datos.habilitado} </span></td>
                        `;
                    }else{
                        contenido_ajax += `
                                    <td><span style="padding:4px 25px;" class="badge badge-pill badge-danger"> ${datos.habilitado} </span></td>
                        `;
                    }

                    

                    contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary" onClick='btn_edit("clientes",${datos.id});'><i class="fas fa-edit"></i> Editar</button>
                                                        <!--<button style="width:110px;" type="button" class="btn btn-danger" onclick="modalsDelete('slide',${datos.id},'${datos.url_foto}');"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });

                $("#load_table_clientes").html('');
                $("#load_data_clientes").html(contenido_ajax);
                                      
            }
        });
    }

    registrar(){ 

        this.formulario.append("editURLimg",this.editURLimg); 

        $.ajax({
            type: 'POST',
            url: 'backend/panel/clientes/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        cliente.listar();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        cliente.editURLimg = 0;
                        cliente.editURLimg2 = 0;
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    editar(id){
        document.getElementById("formulario-clientes").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("Editar Cliente");
        
        $.ajax({
            url: "backend/panel/clientes/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                
                $('#inputEMP').val(datos[0].empresa);
                $('#inputAP').val(datos[0].apellido_pat);
                $('#inputAM').val(datos[0].apellido_mat);
                $('#inputNOM').val(datos[0].nombre);
                $('#inputTIPO_DOC').val(datos[0].tipo_doc);
                $('#inputNRO_DOC').val(datos[0].nro_doc);
                $('#inputCOM').val(datos[0].comentario);
                $('#inputTEL').val(datos[0].telefono);
                $('#inputEMAIL').val(datos[0].correo);
                $('#inputDIR').val(datos[0].direccion);
            
                
                if(datos[0].url_foto!=null && datos[0].url_foto!=""){
                    $("#load_foto_modal").html(`
                        <img src="img/upload/clientes/${datos[0].url_foto}" width="100%">
                    `);
                }else{
                    $("#load_foto_modal").html(`
                        <img src="img/user.png" width="100%">
                    `);
                }

                if(datos[0].habilitado=='SI'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-danger btn_modals" onclick="cliente.habilitar(${id},0);"><i class="fas fa-lg fa-user-lock"></i> Bloquear</button>
                    `);
                }else{
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-primary btn_modals" onclick="cliente.habilitar(${id},1);"><i class="fas fa-lg fa-user-lock"></i> Desbloquear</button>
                    `);
                }


            }
        });

        conyugue.listar(id);
        negocio.listar(id);
    }

    editarSave(id){
     
        this.formulario.append("id",id);   
        this.formulario.append("editURLimg",this.editURLimg);   

        $.ajax({
            url: "backend/panel/clientes/ajax_editar.php",
            type: "POST",
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Actualización Correcta!
                            </div>
                        `);
                        setTimeout(()=>{
                            cliente.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            cliente.editURLimg = 0;
                            cliente.editURLimg2 = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "backend/panel/clientes/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            cliente.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            cliente.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    buscar_cliente(clave){

        var tipo_bus = $("#clientes_buscar_tipo").val();

        $.ajax({
            url: "backend/panel/clientes/ajax_buscar_cliente.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus},
            beforeSend: function(){
                $("#load_data_clientes").html('');
                $("#load_table_clientes").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.nro_doc}</td>
                                                <td>${datos.apellido_pat + " " + datos.apellido_mat + " " + datos.nombre}</td>
                                                <td>${datos.direccion}</td>
                                                <td>${datos.telefono}</td>
                                    `; 
                    
                    if(datos.habilitado=="SI"){
                        contenido_ajax += `
                                                <td class="text-center"><span class="badge badge-pill badge-success" style="padding:4px 20px;">${datos.habilitado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td class="text-center"><span class="badge badge-pill badge-danger" style="padding:4px 20px;">${datos.habilitado}</span></td>
                                    `;
                    }
                     
                    
                    contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary" onClick='btn_edit("clientes",${datos.id});'><i class="fas fa-edit"></i> Editar</button>
                                                        <!--<button style="width:110px;" type="button" class="btn btn-danger" onclick="modalsDelete('slide',${datos.id},'${datos.url_foto}');"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                }); 

                $("#load_table_clientes").html('');
                $("#load_data_clientes").html(contenido_ajax);

            }
        });
    }
}

class Producto{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
        this.editURLimg = 0;
        this.btn_img;
        this.url_img;
    }
    
    getURLvars(name){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    listarProcesos(id){
       var rentabilidad_load ;
        $.ajax({
            url: "../backend/panel/productos/procesos/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar",id:id},
            success: function(response){
                //console.log(response)
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                  
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.material_proc}</td>
                                                <td>S/. ${datos.precio_proc}</td>
                                                <td>
                                                    <div class="col text-center"> 
                                                        <!--<button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("productos",0);'><i class="fas fa-edit"></i> Modificar</button>-->
                                                        <button style="width:140px;" type="button" class="btn btn-danger" onclick="producto.eliminarProcesos(${datos.idproceso});"><i class="fas fa-times-circle"></i> Eliminar</button>
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            
                $("#load_data_procesos").html(contenido_ajax);
                                      
            }
        });
       
        $.ajax({
            url: "../backend/panel/productos/procesos/ajax_suma.php",
            type: "GET",
            data: {consulta: "buscar",id:id},
            success: function(response){
                //console.log(response)
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;

                    $("#sum_proc_precio").html(datos.suma_precio);
                    
                    $("#sum_proc_total").html("S/." + datos.suma_precio*$("#sum_proc_rentabilidad").val());

                  
                });
            
              
            }
        });
    }

    listarCategorias(){
        $.ajax({
            url: "backend/panel/productos/categorias/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                //console.log(response);

                contenido_ajax += `<div class="row justify-content-center text-white">`;  
                datos.forEach( datos => {
                    contenido_ajax += `
                        <div class="col mt-1 mb-2">
                            <div class="btn_categorias">
                                <h1>${datos.nro_contenidos}</h1>
                                <p>${datos.nombre_cat}</p>
                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                <a href="productos_subcategoria.php?idcat=${datos.id}"><span>Sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                            </div>
                        </div>                 
                    `;  
                });
                contenido_ajax += `</div>`;  
            
                $("#load_data_productos_categoria").html(contenido_ajax);
                                      
            }
        });
    }

    listarSubCategorias(){
        const id = this.getURLvars('idcat');
        $.ajax({
            url: "backend/panel/productos/subcategorias/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar", id:id},
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                //console.log(response);

                contenido_ajax += `<div class="row justify-content-center text-white">`;  
                datos.forEach( datos => {
                    contenido_ajax += `
                        <div class="col mt-1 mb-2">
                            <div class="btn_subcategorias">
                                <h1>${datos.nro_contenidos}</h1>
                                <p>${datos.nombre_subcat}</p>
                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                <a href="menus/productos.php?idsubcat=${datos.id}"><span>Ver Productos <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                            </div>
                        </div>                
                    `;  
                });
                contenido_ajax += `</div>`;  
            
                $("#load_data_productos_subcategoria").html(contenido_ajax);
                                      
            }
        });
    }

    listar(){
        const id = this.getURLvars('idsubcat');
        $.ajax({
            url: "../backend/panel/productos/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar",id:id},
            success: function(response){
                //console.log(response)
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.codigo_prod}</td>
                                                <td>${datos.nombre_prod}</td>
                                                
                                                
                                                <td>S/. ${datos.precio_prov_unidad}</td>
                                                <td>S/. ${datos.precio_vent_unidad}</td>
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("productos",${datos.idproducto});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <!--<button style="width:140px;" type="button" class="btn btn-danger" onclick="modalsDelete('productos',${datos.ididproducto},'${datos.url_foto}');"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            
                $("#load_data_productos").html(contenido_ajax);
                                      
            }
        });
    }

    registrarCategorias(){ 
        $.ajax({
            type: 'POST',
            url: 'backend/panel/productos/categorias/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        producto.listarCategorias();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrarSubCategorias(){ 
        const id = this.getURLvars('idcat');
        this.formulario.append("id",id);   
        $.ajax({
            type: 'POST',
            url: 'backend/panel/productos/subcategorias/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        producto.listarSubCategorias();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrar(){ 
        const id = this.getURLvars('idsubcat');
        this.formulario.append("id",id); 
        this.formulario.append("editURLimg",this.editURLimg); 

        $.ajax({
            type: 'POST',
            url: '../backend/panel/productos/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        producto.listar();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        producto.editURLimg = 0;
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrarProcesos(id){ 
        this.formulario.append("id",id); 

        $.ajax({
            type: 'POST',
            url: '../backend/panel/productos/procesos/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#procesos-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#procesos-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        producto.listarProcesos(id);
                        $('#modal-add-procesos').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#procesos-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#procesos-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#procesos-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#procesos-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#procesos-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    editar(id){
        document.getElementById("formulario-productos").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("MODIFICAR PRODUCTO");
        
        $.ajax({
            url: "../backend/panel/productos/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
             
                $('#inputCOD').val(datos[0].codigo_prod);
                $('#inputNOM').val(datos[0].nombre_prod);
                $('#inputCOM').val(datos[0].caracteristicas);
                $('#inputPROC_COM').val(datos[0].proceso_des);
                //$('#inputSTOCK').val(datos[0].stock);
                $('#inputPROV1-hidden').val(datos[0].idprov01);
                $('#inputPROV2-hidden').val(datos[0].idprov02);
                $('#inputPROV3-hidden').val(datos[0].idprov03);
                
                $('#input_PRECIO_PROV_UNIDAD').val(datos[0].precio_prov_unidad);  
                $('#input_PRECIO_VENT_UNIDAD').val(datos[0].precio_vent_unidad);

                if(datos[0].rentabilidad!=null && datos[0].rentabilidad!=""){
                    $("#sum_proc_rentabilidad").val(datos[0].rentabilidad);
                }else{
                    $("#sum_proc_rentabilidad").val(1);
                }
                

                producto.url_img = datos[0].url_foto;


                producto.buscarProveedorId();
                producto.listarProcesos(id);
                

                if(datos[0].url_foto!=null && datos[0].url_foto!=""){
                    $("#load_foto_modal").html(`
                        <img src="../img/upload/productos/${datos[0].url_foto}" width="100%">
                    `);
                    $("#delete_img").html(`
                        <center><button type="button" class="btn btn-warning" style="position:relative;" onclick="producto.eliminarIMG(${datos[0].idproducto},'${datos[0].url_foto}');"><i class="fas fa-times"></i> Eliminar Imagen</button></center>
                    `);
                }else{
                    $("#load_foto_modal").html(`
                        <img src="../img/producto.png" width="100%">
                    `);
                    $("#delete_img").html(`
                        
                    `);
                }

                $(".modal-btn-cont").html(`
                    <button type="button" class="btn btn-block btn-danger btn_modals" onclick="producto.eliminar(${datos[0].idproducto},'${datos[0].url_foto}');"><i class="fas fa-lg fa-trash-alt"></i> Eliminar</button>
                `);
                /*
                if(datos[0].habilitado=='SI'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-danger btn_modals" onclick="producto.habilitar(${id},0);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Bloquear</button>
                    `);
                }else{
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-primary btn_modals" onclick="producto.habilitar(${id},1);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Desbloquear</button>
                    `);
                }
                */

            }
        });
    }

    editarSave(id){
     
        this.formulario.append("id",id);   
        this.formulario.append("editURLimg",this.editURLimg);   
        this.formulario.append("url_img",this.url_img);   

        $.ajax({
            url: "../backend/panel/productos/ajax_editar.php",
            type: "POST",
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Actualización Correcta!
                            </div>
                        `);
                        setTimeout(()=>{
                            producto.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            producto.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "backend/panel/usuarios/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            user.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            user.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    eliminar(id,url_foto){
        $.ajax({
            url: "../backend/panel/productos/ajax_eliminar.php",
            type: "POST",
            data: {id: id,url_img:url_foto},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            producto.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            producto.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    eliminarProcesos(id){
        $.ajax({
            url: "../backend/panel/productos/procesos/ajax_eliminar.php",
            type: "POST",
            data: {id: id},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            producto.listarProcesos(producto.idEdit);
                            $('.btn_modals').prop('disabled', false);
                            $("#msg-ajax-result").html("");
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    buscarProveedor(clave,nro){
        $.ajax({
            url: "../backend/panel/productos/ajax_buscar_proveedores.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var resultados = JSON.parse(response);
                $("#proveedores"+nro).html("");
                //console.log(resultados);    
            
                resultados.forEach( resultados => {
                    $("#proveedores"+nro).append(`
                        <option data-id="${resultados.id}" value="${resultados.nombre_prov}"></option>
                    `);
                });  
            }
        });
    }

    buscarProveedorId(){
        if($("#inputPROV1-hidden").val()!="" && $("#inputPROV1-hidden").val()!=null){
            $.ajax({
                url: "../backend/panel/productos/ajax_buscar_proveedores_id.php",
                type: "GET",
                data: {
                    idprov: $("#inputPROV1-hidden").val()
                },
                success: function(response){
                    var resultados = JSON.parse(response);
                    $("#inputPROV1").val("");
                    //console.log(resultados);    
                    $("#inputPROV1").val(resultados[0].nombre_prov);
                }
            });
        }

        if($("#inputPROV2-hidden").val()!="" && $("#inputPROV2-hidden").val()!=null){
            $.ajax({
                url: "../backend/panel/productos/ajax_buscar_proveedores_id.php",
                type: "GET",
                data: {
                    idprov: $("#inputPROV2-hidden").val()
                },
                success: function(response){
                    var resultados = JSON.parse(response);
                    $("#inputPROV2").val("");
                    //console.log(resultados);    
                    $("#inputPROV2").val(resultados[0].nombre_prov);
                }
            });
        }

        if($("#inputPROV3-hidden").val()!="" && $("#inputPROV3-hidden").val()!=null){
            $.ajax({
                url: "../backend/panel/productos/ajax_buscar_proveedores_id.php",
                type: "GET",
                data: {
                    idprov: $("#inputPROV3-hidden").val()
                },
                success: function(response){
                    var resultados = JSON.parse(response);
                    $("#inputPROV3").val("");
                    //console.log(resultados);    
                    $("#inputPROV3").val(resultados[0].nombre_prov);
                }
            });
        }
    }

    buscar_producto(clave){

        var tipo_bus = $("#productos_buscar_tipo").val();
        var idsubcat = this.getURLvars('idsubcat');

        $.ajax({
            url: "../backend/panel/productos/ajax_buscar_producto.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus,subcat:idsubcat},
            beforeSend: function(){
                $("#load_data_productos").html('');
                $("#load_table_productos").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response)
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.codigo_prod}</td>
                                                <td>${datos.nombre_prod}</td>
                                                
                                                
                                                <td>S/. ${datos.precio_prov_unidad}</td>
                                                <td>S/. ${datos.precio_vent_unidad}</td>
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("productos",${datos.idproducto});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <!--<button style="width:140px;" type="button" class="btn btn-danger" onclick="modalsDelete('productos',${datos.ididproducto},'${datos.url_foto}');"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            
                $("#load_table_productos").html('');
                $("#load_data_productos").html(contenido_ajax);
                                      
            }
        });
    }
    
    eliminarIMG(id,url_img){
        $.ajax({
            url: "../backend/panel/productos/ajax_eliminar_img.php",
            type: "POST",
            data: {id: id,url_img:url_img},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        $("#load_foto_modal").html(`
                            <img src="img/producto.png" width="100%">
                        `);
                        setTimeout(()=>{
                            producto.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            producto.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }
}

class Proveedor{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
        this.editURLimg = 0;
        this.btn_img;
    }
    
    getURLvars(name){
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    listarCategorias(){
        $.ajax({
            url: "backend/panel/proveedores/categorias/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                //console.log(response);

                contenido_ajax += `<div class="row justify-content-center text-white">`;  
                datos.forEach( datos => {
                    contenido_ajax += `
                        <div class="col mt-1 mb-2">
                            <div class="btn_categorias">
                                <h1>${datos.nro_contenidos}</h1>
                                <p>${datos.nombre_cat}</p>
                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                <a href="proveedores_subcategoria.php?idcat=${datos.id}"><span>Sub categorias <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                            </div>
                        </div>                 
                    `;  
                });
                contenido_ajax += `</div>`;  
            
                $("#load_data_proveedores_categoria").html(contenido_ajax);
                                      
            }
        });
    }

    listarSubCategorias(){
        const id = this.getURLvars('idcat');
        $.ajax({
            url: "backend/panel/proveedores/subcategorias/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar", id:id},
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                //console.log(response);

                contenido_ajax += `<div class="row justify-content-center text-white">`;  
                datos.forEach( datos => {
                    contenido_ajax += `
                        <div class="col mt-1 mb-2">
                            <div class="btn_subcategorias">
                                <h1>${datos.nro_contenidos}</h1>
                                <p>${datos.nombre_subcat}</p>
                                <span><i class="fas fa-3x fa-boxes"></i></span>
                                <a href="menus/proveedores.php?idsubcat=${datos.id}"><span>Ver Proveedores <i class="fas fa-arrow-alt-circle-right"></i></span></a>
                            </div>
                        </div>                
                    `;  
                });
                contenido_ajax += `</div>`;  
            
                $("#load_data_proveedores_subcategoria").html(contenido_ajax);
                                      
            }
        });
    }

    listar(){
        const id = this.getURLvars('idsubcat');
        $.ajax({
            url: "../backend/panel/proveedores/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar",id:id},
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.ruc}</td>
                                                <td>${datos.nombre_prov}</td>
                                                <td>${datos.responsable}</td>
                                                <td>${datos.direccion}</td>
                                                
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("proveedores",${datos.idproveedor});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <!--<button style="width:140px;" type="button" class="btn btn-danger" onclick="proveedor.eliminar(${datos.idproveedor});"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            
                $("#load_data_proveedores").html(contenido_ajax);
                                      
            }
        });
    }

    registrarCategorias(){ 
        $.ajax({
            type: 'POST',
            url: 'backend/panel/proveedores/categorias/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        proveedor.listarCategorias();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrarSubCategorias(){ 
        const id = this.getURLvars('idcat');
        this.formulario.append("id",id);   
        $.ajax({
            type: 'POST',
            url: 'backend/panel/proveedores/subcategorias/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        proveedor.listarSubCategorias();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrar(){ 
        const id = this.getURLvars('idsubcat');
        this.formulario.append("id",id); 

        $.ajax({
            type: 'POST',
            url: '../backend/panel/proveedores/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        proveedor.listar();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    editar(id){
        document.getElementById("formulario-proveedores").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("MODIFICAR PROVEEDOR");
        
        $.ajax({
            url: "../backend/panel/proveedores/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
             
                $('#inputRUC').val(datos[0].ruc);
                $('#inputNOM').val(datos[0].nombre_prov);
                $('#inputRESP').val(datos[0].responsable);
                $('#inputDIR').val(datos[0].direccion);
                $('#inputEMAIL').val(datos[0].correo);
                $('#inputTEL').val(datos[0].telefono);
                $('#inputCEL').val(datos[0].celular);
                $('#input_BN1').val(datos[0].banco1);
                $('#input_BN2').val(datos[0].banco2);
                $('#input_BN3').val(datos[0].banco3);
                $('#input_BN4').val(datos[0].banco4);
                $('#input_NRO1').val(datos[0].cuenta1);
                $('#input_NRO2').val(datos[0].cuenta2);
                $('#input_NRO3').val(datos[0].cuenta3);
                $('#input_NRO4').val(datos[0].cuenta4);
                $('#inputCOM').val(datos[0].observaciones);

               

                $(".modal-btn-cont").html(`
                    <button type="button" class="btn btn-block btn-danger btn_modals" onclick="proveedor.eliminar(${datos[0].idproveedor});"><i class="fas fa-lg fa-trash-alt"></i> Eliminar</button>
                `);
                /*
                if(datos[0].habilitado=='SI'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-danger btn_modals" onclick="producto.habilitar(${id},0);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Bloquear</button>
                    `);
                }else{
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-primary btn_modals" onclick="producto.habilitar(${id},1);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Desbloquear</button>
                    `);
                }
                */

            }
        });
    }

    editar_buscar(id){
        document.getElementById("formulario-proveedores_buscar").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("DETALLES DEL PROVEEDOR");
        
        $.ajax({
            url: "../backend/panel/proveedores/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
             
                $('#inputRUC').val(datos[0].ruc);
                $('#inputNOM').val(datos[0].nombre_prov);
                $('#inputRESP').val(datos[0].responsable);
                $('#inputDIR').val(datos[0].direccion);
                $('#inputEMAIL').val(datos[0].correo);
                $('#inputTEL').val(datos[0].telefono);
                $('#inputCEL').val(datos[0].celular);
                $('#input_BN1').val(datos[0].banco1);
                $('#input_BN2').val(datos[0].banco2);
                $('#input_BN3').val(datos[0].banco3);
                $('#input_BN4').val(datos[0].banco4);
                $('#input_NRO1').val(datos[0].cuenta1);
                $('#input_NRO2').val(datos[0].cuenta2);
                $('#input_NRO3').val(datos[0].cuenta3);
                $('#input_NRO4').val(datos[0].cuenta4);
                $('#inputCOM').val(datos[0].observaciones);

               

                $(".modal-btn-cont").html(`
                    <!--<button type="button" class="btn btn-danger btn_modals" onclick="proveedor.eliminar(${datos[0].idproveedor});" style="width:155px;"><i class="fas fa-lg fa-trash-alt"></i> Eliminar</button>-->
                `);
                /*
                if(datos[0].habilitado=='SI'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-danger btn_modals" onclick="producto.habilitar(${id},0);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Bloquear</button>
                    `);
                }else{
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-primary btn_modals" onclick="producto.habilitar(${id},1);" style="width:155px;"><i class="fas fa-lg fa-user-lock"></i> Desbloquear</button>
                    `);
                }
                */

            }
        });
    }

    editarSave(id){
     
        this.formulario.append("id",id);   

        $.ajax({
            url: "../backend/panel/proveedores/ajax_editar.php",
            type: "POST",
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Actualización Correcta!
                            </div>
                        `);
                        setTimeout(()=>{
                            proveedor.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "backend/panel/usuarios/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            user.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            user.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    eliminar(id){
        $.ajax({
            url: "../backend/panel/proveedores/ajax_eliminar.php",
            type: "POST",
            data: {id: id},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            proveedor.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    buscar_proveedor(clave){

        const id = this.getURLvars('idsubcat');
        var tipo_bus = $("#proveedores_buscar_tipo").val();

        $.ajax({
            url: "../backend/panel/proveedores/ajax_buscar_proveedor.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus,id:id},
            beforeSend: function(){
                $("#load_data_proveedores").html('');
                $("#load_table_proveedores").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.ruc}</td>
                                                <td>${datos.nombre_prov}</td>
                                                <td>${datos.responsable}</td>
                                                <td>${datos.direccion}</td>
                                                
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("proveedores",${datos.idproveedor});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <!--<button style="width:140px;" type="button" class="btn btn-danger" onclick="proveedor.eliminar(${datos.idproveedor});"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });

                $("#load_table_proveedores").html('');
                $("#load_data_proveedores").html(contenido_ajax);

            }
        });
    }

    buscar_proveedor2(clave){

        var tipo_bus = $("#proveedores_buscar_tipo").val();

        $.ajax({
            url: "../backend/panel/proveedores/ajax_buscar_proveedor2.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus},
            beforeSend: function(){
                $("#load_data_proveedores_buscar").html('');
                $("#load_table_proveedores_buscar").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                    `;

                    if(datos.nombre_prod=="" || datos.nombre_prod==null){
                        contenido_ajax += `<td>No hay registros</td>`;
                    }else{
                        contenido_ajax += `<td>${datos.nombre_prod}</td>`;
                    }

                    contenido_ajax += `
                                                <td>${datos.ruc}</td>
                                                <td>${datos.nombre_prov}</td>
                                                <td>${datos.responsable}</td>
                                                <td>${datos.direccion}</td>
                                                
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edit("proveedores_buscar",${datos.idproveedor});'><i class="fas fa-edit"></i> Ver detalles</button>
                                                        <!--<button style="width:140px;" type="button" class="btn btn-danger" onclick="proveedor.eliminar(${datos.idproveedor});"><i class="fas fa-times-circle"></i> Eliminar</button>-->
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });

                $("#load_table_proveedores_buscar").html('');
                $("#load_data_proveedores_buscar").html(contenido_ajax);

            }
        });
    }
}

class Venta{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
        this.editURLimg = 0;
        this.btn_img;
        this.activo = 0;
    }

    listarCotizaciones(){
        $.ajax({
            url: "../backend/panel/ventas/cotizaciones/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            beforeSend: function(){
                $("#load_data_cotizaciones").html('');
                $("#load_table_cotizaciones").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos)
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.id}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.telefono}</td>
                                                <td>S/. ${datos.total}</td>
                                                <td>${datos.fecha_reg}</td>
                                    `;

                    if(datos.estado=="EMITIDO"){
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-secondary">${datos.estado}</span></td>
                        `;
                    }
                    
                    contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary mt-1 " onClick='btn_edit("cotizaciones",${datos.id});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <button style="width:110px;" type="button" class="btn btn-info mt-1" onClick='venta.printCotizaciones(${datos.id});'><i class="fas fa-file-alt"></i> Proforma</button>
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            
                $("#load_table_cotizaciones").html('');
                $("#load_data_cotizaciones").html(contenido_ajax);
                                      
            }
        });
    }
    listarVentas(){
        $.ajax({
            url: "../backend/panel/ventas/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            beforeSend: function(){
                $("#load_data_ventas").html('');
                $("#load_table_ventas").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos)
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.id}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.telefono}</td>
                                                <td>S/. ${datos.total}</td>
                                                <td>${datos.fecha_reg}</td>
                                    `;

                    if(datos.estado=="CONTRATADO"){
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-warning">${datos.estado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                        `;
                    }
                    
                    if(datos.estado=="CONTRATADO"){
                        contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:170px;" type="button" class="btn btn-success mt-1" onClick='btn_edit("ventas",${datos.id});'><i class="fas fa-lg fa-comments-dollar"></i> Completar Venta</button>
                                                        <button style="width:150px;" type="button" class="btn btn-info mt-1" onClick='venta.printVenta(${datos.id});'><i class="fas fa-file-alt"></i> Comprobante</button>
                                                    </div>
                                                </td>
                                            </tr>
                            `;
                    }else{
                        contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:160px;" type="button" class="btn btn-primary" onClick='btn_edit("ventas",${datos.id});'><i class="fas fa-eye"></i> Ver Detalles</button>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                        `; 
                    }
                      
                });
            
                $("#load_table_ventas").html('');
                $("#load_data_ventas").html(contenido_ajax);
                                      
            }
        });
    }

    registrarCotizaciones(){ 
        $.ajax({
            type: 'POST',
            url: '../backend/panel/ventas/cotizaciones/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        venta.listarCotizaciones();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }
    registrarVentas(){ 
        $.ajax({
            type: 'POST',
            url: '../backend/panel/ventas/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        venta.listarVentas();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    editarCotizaciones(id){
        document.getElementById("formulario-cotizaciones").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("Detalles de la Cotización");
        
        $.ajax({
            url: "../backend/panel/ventas/cotizaciones/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                
                $("#inputUSER-hidden").val(datos[0].idusuario);
                $("#inputCLIENT-hidden").val(datos[0].idcliente);
            
                venta.buscarEditNombres(datos[0].idcliente,datos[0].idusuario);

                $("#cot_IGV").val(datos[0].igv);
                $("#inputVALIDEZ").val(datos[0].validez);
                $("#inputENTREGA").val(datos[0].entrega);
                $("#inputCOMPROBANTE").val(datos[0].comprobante);


                $("#cot_CANT1").val(datos[0].p1_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD1-hidden").val(datos[0].idprod1);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU1").val(datos[0].p1_pu);
               
                $("#cot_ST1").val(datos[0].p1_st);
                if(datos[0].idprod1!=null){
                    venta.buscarEditProductos(datos[0].idprod1,1);
                }
                

                $("#cot_CANT2").val(datos[0].p2_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD2-hidden").val(datos[0].idprod2);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU2").val(datos[0].p2_pu);
               
                $("#cot_ST2").val(datos[0].p2_st);
                if(datos[0].idprod2!=null){
                    venta.buscarEditProductos(datos[0].idprod2,2);
                }

                $("#cot_CANT3").val(datos[0].p3_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD3-hidden").val(datos[0].idprod3);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU3").val(datos[0].p3_pu);
              
                $("#cot_ST3").val(datos[0].p3_st);
                if(datos[0].idprod3!=null){
                    venta.buscarEditProductos(datos[0].idprod3,3);
                }

                $("#cot_CANT4").val(datos[0].p4_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD4-hidden").val(datos[0].idprod4);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU4").val(datos[0].p4_pu);
                
                $("#cot_ST4").val(datos[0].p4_st);
                if(datos[0].idprod4!=null){
                    venta.buscarEditProductos(datos[0].idprod4,4);
                }

                $("#cot_CANT5").val(datos[0].p5_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD5-hidden").val(datos[0].idprod5);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU5").val(datos[0].p5_pu);
                
                $("#cot_ST5").val(datos[0].p5_st);
                if(datos[0].idprod5!=null){
                    venta.buscarEditProductos(datos[0].idprod5,5);
                }

                venta.calcularTotal();
                $("#cot_TOTAL").val(datos[0].total);

            }
        });
    }
    editarVentas(id){
        document.getElementById("formulario-ventas").reset();
        $('#modal-add').modal('show'); 
        $('#modal-add h4').html("Detalles de la Venta");
        
        $.ajax({
            url: "../backend/panel/ventas/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                
                $("#inputUSER-hidden").val(datos[0].idusuario);
                $("#inputCLIENT-hidden").val(datos[0].idcliente);
            
                venta.buscarEditNombres(datos[0].idcliente,datos[0].idusuario);

                $("#cot_IGV").val(datos[0].igv);
                $("#inputENTREGA").val(datos[0].entrega);
                $("#inputCOMPROBANTE").val(datos[0].comprobante);


                $("#cot_CANT1").val(datos[0].p1_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD1-hidden").val(datos[0].idprod1);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU1").val(datos[0].p1_pu);
                $("#cot_PC1").val(datos[0].p1_pc);
                $("#cot_PM1").val(datos[0].p1_pm);
                $("#cot_ST1").val(datos[0].p1_st);
                if(datos[0].idprod1!=null){
                    venta.buscarEditProductos(datos[0].idprod1,1);
                }
                

                $("#cot_CANT2").val(datos[0].p2_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD2-hidden").val(datos[0].idprod2);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU2").val(datos[0].p2_pu);
                $("#cot_PC2").val(datos[0].p2_pc);
                $("#cot_PM2").val(datos[0].p2_pm);
                $("#cot_ST2").val(datos[0].p2_st);
                if(datos[0].idprod2!=null){
                    venta.buscarEditProductos(datos[0].idprod2,2);
                }

                $("#cot_CANT3").val(datos[0].p3_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD3-hidden").val(datos[0].idprod3);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU3").val(datos[0].p3_pu);
                $("#cot_PC3").val(datos[0].p3_pc);
                $("#cot_PM3").val(datos[0].p3_pm);
                $("#cot_ST3").val(datos[0].p3_st);
                if(datos[0].idprod3!=null){
                    venta.buscarEditProductos(datos[0].idprod3,3);
                }

                $("#cot_CANT4").val(datos[0].p4_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD4-hidden").val(datos[0].idprod4);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU4").val(datos[0].p4_pu);
                $("#cot_PC4").val(datos[0].p4_pc);
                $("#cot_PM4").val(datos[0].p4_pm);
                $("#cot_ST4").val(datos[0].p4_st);
                if(datos[0].idprod4!=null){
                    venta.buscarEditProductos(datos[0].idprod4,4);
                }

                $("#cot_CANT5").val(datos[0].p5_cant);
                //$("#cot_PROD1").val(datos[0].p1_cant);
                $("#cot_PROD5-hidden").val(datos[0].idprod5);
                //$("#cot_STOCK1").val(datos[0].);
                $("#cot_PU5").val(datos[0].p5_pu);
                $("#cot_PC5").val(datos[0].p5_pc);
                $("#cot_PM5").val(datos[0].p5_pm);
                $("#cot_ST5").val(datos[0].p5_st);
                if(datos[0].idprod5!=null){
                    venta.buscarEditProductos(datos[0].idprod5,5);
                }

                $("#cot_adelanto").val(datos[0].adelanto);

                venta.calcularTotal();
                $("#cot_TOTAL").val(datos[0].total);


                $("#cot_tipo_pago1").val(datos[0].tipo_pago_adelanto);
                if(datos[0].tipo_pago_resto!="" && datos[0].tipo_pago_resto!=null){
                    $("#cot_tipo_pago2").val(datos[0].tipo_pago_resto);
                }
                

                if(datos[0].estado=="CONTRATADO"){
                    $(".modal-btn-cont").html(`
                        <button type="submit" class="btn btn-block btn-success btn_modals" onclick="venta.completarVenta(${id});"><i class="fas fa-lg fa-comments-dollar"></i> Completar Venta</button>
                    `);

                    $("#cot_tipo_pago1").prop("disabled",true);
                    $("#cot_tipo_pago2").prop("disabled",false);
                    $("#cot_tipo_pago2").prop('readonly', false);
                }else{
                    $("#cot_tipo_pago1").prop("disabled",true);
                    $("#cot_tipo_pago2").prop("disabled",true);
                }
            }
        });
    }

    editarSaveCotizaciones(id){
     
        this.formulario.append("id",id);   
  

        $.ajax({
            url: "../backend/panel/ventas/cotizaciones/ajax_editar.php",
            type: "POST",
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Actualización Correcta!
                            </div>
                        `);
                        setTimeout(()=>{
                            venta.listarCotizaciones();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "backend/panel/clientes/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            cliente.listar();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            cliente.editURLimg = 0;
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    buscarCliente(clave){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_cliente.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var resultados = JSON.parse(response);
                $("#clientes").html("");
                //console.log(resultados);    
            
                resultados.forEach( resultados => {
                    $("#clientes").append(`
                        <option data-id="${resultados.id}" value="${resultados.nombre + ' ' + resultados.apellido_pat + ' ' + resultados.apellido_mat}"></option>
                    `);

                });  
            }
        });
    }
    buscarCliente_autocomplete(clave){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_cliente_id.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var resultados = JSON.parse(response);
                //console.log(resultados[0].nombre);    
                /*
                $("#inputCLIENT").addClass("is-valid");
                $("#inputCLIENT").val(resultados[0].nombre + " " + resultados[0].apellido_pat + " " + resultados[0].apellido_mat);
                $("#inputCLIENT-hidden").val(resultados[0].id);
              */

              $("#inputDOC").val(resultados[0].tipo_doc);
              $("#inputDOCNRO").val(resultados[0].nro_doc);
              $("#inputDIR").val(resultados[0].direccion);
              $("#inputTEL").val(resultados[0].telefono);
              $("#inputEMAIL").val(resultados[0].correo);
            }
        });
    }
    buscarProducto(clave,item){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_producto.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var resultados = JSON.parse(response);
                $("#ls_prod"+item).html("");
                //console.log(resultados);    
            
                resultados.forEach( resultados => {
                    $("#ls_prod"+item).append(`
                        <option data-id="${resultados.id}" value="${resultados.nombre_prod}"></option>
                    `);
                });  
            }
        });
    }
    buscarProducto_autocomplete(clave,item){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_producto_id.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(resultados[0].nombre);    
                /*
                $("#inputCLIENT").addClass("is-valid");
                $("#inputCLIENT").val(resultados[0].nombre + " " + resultados[0].apellido_pat + " " + resultados[0].apellido_mat);
                $("#inputCLIENT-hidden").val(resultados[0].id);
              */

                $("#cot_STOCK"+item).val(datos[0].stock);
                
                $("#cot_PU"+item).val(datos[0].precio_vent_unidad);
                venta.calcularSubTotal(item);
            }
        });
    }
    buscarUsuario(){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_usuario.php",
            type: "GET",
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos)
        
                if(datos!="" && datos!=null){
                    $("#inputUSER").removeClass("is-invalid");
                    $("#inputUSER").addClass("is-valid");
                    $("#inputUSER-hidden").val(datos[0].idusuario);
                    $("#inputUSER").val(datos[0].nombre + " " + datos[0].apellido_pat + " " + datos[0].apellido_mat);
                }else{
                    $("#inputUSER").removeClass("is-valid");
                    $("#inputUSER").addClass("is-invalid");
                }
            }
        });
    }

    buscarEditNombres(idcliente,iduser){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_cliente_id.php",
            type: "GET",
            data: {clave: idcliente},
            success: function(response){
                var resultados = JSON.parse(response);

                $("#inputCLIENT").val(resultados[0].nombre + " " + resultados[0].apellido_pat + " " + resultados[0].apellido_mat);
                $("#inputDOC").val(resultados[0].tipo_doc);
                $("#inputDOCNRO").val(resultados[0].nro_doc);
                $("#inputDIR").val(resultados[0].direccion);
                $("#inputTEL").val(resultados[0].telefono);
                $("#inputEMAIL").val(resultados[0].correo);
                
                $("#inputCLIENT").addClass("is-valid");
            }
        });
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_usuario.php",
            type: "GET",
            data: {clave: iduser},
            success: function(response){
                var resultados = JSON.parse(response);

                $("#inputUSER").val(resultados[0].nombre + " " + resultados[0].apellido_pat + " " + resultados[0].apellido_mat);
                $("#inputUSER").addClass("is-valid");
                            
            }
        });
    }
    buscarEditProductos(idproducto,item){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_producto_id.php",
            type: "GET",
            data: {clave: idproducto},
            success: function(response){
                var resultados = JSON.parse(response);

                $("#cot_PROD"+item).val(resultados[0].nombre_prod);
                $("#cot_PROD"+item).removeClass("is-invalid");
                $("#cot_PROD"+item).addClass("is-valid");
                $("#cot_PROD"+item).prop('required',true);
            }
        });
    }

    buscarCotizacion(clave){
        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_cotizacion_id.php",
            type: "GET",
            data: {clave: clave},
            success: function(response){
                var datos = JSON.parse(response);
                console.log(datos[0]);    
                
                if(datos[0]!=null){

                
                    $("#inputUSER-hidden").val(datos[0].idusuario);
                    $("#inputCLIENT-hidden").val(datos[0].idcliente);
                
                    venta.buscarEditNombres(datos[0].idcliente,datos[0].idusuario);

                    $("#cot_IGV").val(datos[0].igv);
                    $("#inputVALIDEZ").val(datos[0].validez);
                    $("#inputENTREGA").val(datos[0].entrega);
                    $("#inputCOMPROBANTE").val(datos[0].comprobante);


                    $("#cot_CANT1").val(datos[0].p1_cant);
                    //$("#cot_PROD1").val(datos[0].p1_cant);
                    $("#cot_PROD1-hidden").val(datos[0].idprod1);
                    //$("#cot_STOCK1").val(datos[0].);
                    $("#cot_PU1").val(datos[0].p1_pu);
                    $("#cot_PC1").val(datos[0].p1_pc);
                    $("#cot_PM1").val(datos[0].p1_pm);
                    $("#cot_ST1").val(datos[0].p1_st);
                    if(datos[0].idprod1!=null){
                        venta.buscarEditProductos(datos[0].idprod1,1);
                    }
                    

                    $("#cot_CANT2").val(datos[0].p2_cant);
                    //$("#cot_PROD1").val(datos[0].p1_cant);
                    $("#cot_PROD2-hidden").val(datos[0].idprod2);
                    //$("#cot_STOCK1").val(datos[0].);
                    $("#cot_PU2").val(datos[0].p2_pu);
                    $("#cot_PC2").val(datos[0].p2_pc);
                    $("#cot_PM2").val(datos[0].p2_pm);
                    $("#cot_ST2").val(datos[0].p2_st);
                    if(datos[0].idprod2!=null){
                        venta.buscarEditProductos(datos[0].idprod2,2);
                    }

                    $("#cot_CANT3").val(datos[0].p3_cant);
                    //$("#cot_PROD1").val(datos[0].p1_cant);
                    $("#cot_PROD3-hidden").val(datos[0].idprod3);
                    //$("#cot_STOCK1").val(datos[0].);
                    $("#cot_PU3").val(datos[0].p3_pu);
                    $("#cot_PC3").val(datos[0].p3_pc);
                    $("#cot_PM3").val(datos[0].p3_pm);
                    $("#cot_ST3").val(datos[0].p3_st);
                    if(datos[0].idprod3!=null){
                        venta.buscarEditProductos(datos[0].idprod3,3);
                    }

                    $("#cot_CANT4").val(datos[0].p4_cant);
                    //$("#cot_PROD1").val(datos[0].p1_cant);
                    $("#cot_PROD4-hidden").val(datos[0].idprod4);
                    //$("#cot_STOCK1").val(datos[0].);
                    $("#cot_PU4").val(datos[0].p4_pu);
                    $("#cot_PC4").val(datos[0].p4_pc);
                    $("#cot_PM4").val(datos[0].p4_pm);
                    $("#cot_ST4").val(datos[0].p4_st);
                    if(datos[0].idprod4!=null){
                        venta.buscarEditProductos(datos[0].idprod4,4);
                    }

                    $("#cot_CANT5").val(datos[0].p5_cant);
                    //$("#cot_PROD1").val(datos[0].p1_cant);
                    $("#cot_PROD5-hidden").val(datos[0].idprod5);
                    //$("#cot_STOCK1").val(datos[0].);
                    $("#cot_PU5").val(datos[0].p5_pu);
                    $("#cot_PC5").val(datos[0].p5_pc);
                    $("#cot_PM5").val(datos[0].p5_pm);
                    $("#cot_ST5").val(datos[0].p5_st);
                    if(datos[0].idprod5!=null){
                        venta.buscarEditProductos(datos[0].idprod5,5);
                    }

                    venta.calcularTotal();
                    $("#cot_TOTAL").val(datos[0].total);

                }else{
                    
                    $("#inputUSER").removeClass("is-valid");
                    $("#inputUSER").removeClass("is-invalid");
                    $("#inputCLIENT").removeClass("is-valid");
                    $("#inputCLIENT").removeClass("is-invalid");

                    $("#cot_PROD1").removeClass("is-valid");
                    $("#cot_PROD1").removeClass("is-invalid");
                    $("#cot_PROD2").removeClass("is-valid");
                    $("#cot_PROD2").removeClass("is-invalid");
                    $("#cot_PROD3").removeClass("is-valid");
                    $("#cot_PROD3").removeClass("is-invalid");
                    $("#cot_PROD4").removeClass("is-valid");
                    $("#cot_PROD4").removeClass("is-invalid");
                    $("#cot_PROD5").removeClass("is-valid");
                    $("#cot_PROD5").removeClass("is-invalid");
                    $("#cot_PROD1").prop('required',false);
                    $("#cot_CANT1").prop('required',false);
                    $("#cot_STOCK1").prop('required',false);
                    $("#cot_PU1").prop('required',false);
                    $("#cot_PC1").prop('required',false);
                    $("#cot_PM1").prop('required',false);
                    $("#cot_PROD2").prop('required',false);
                    $("#cot_CANT2").prop('required',false);
                    $("#cot_STOCK2").prop('required',false);
                    $("#cot_PU2").prop('required',false);
                    $("#cot_PC2").prop('required',false);
                    $("#cot_PM2").prop('required',false);
                    $("#cot_PROD3").prop('required',false);
                    $("#cot_CANT3").prop('required',false);
                    $("#cot_STOCK3").prop('required',false);
                    $("#cot_PU3").prop('required',false);
                    $("#cot_PC3").prop('required',false);
                    $("#cot_PM3").prop('required',false);
                    $("#cot_PROD4").prop('required',false);
                    $("#cot_CANT4").prop('required',false);
                    $("#cot_STOCK4").prop('required',false);
                    $("#cot_PU4").prop('required',false);
                    $("#cot_PC4").prop('required',false);
                    $("#cot_PM4").prop('required',false);
                    $("#cot_PROD5").prop('required',false);
                    $("#cot_CANT5").prop('required',false);
                    $("#cot_STOCK5").prop('required',false);
                    $("#cot_PU5").prop('required',false);
                    $("#cot_PC5").prop('required',false);
                    $("#cot_PM5").prop('required',false);

                    $("#inputUSER-hidden").val('');
                    $("#inputCLIENT-hidden").val('');   
                    $("#inputUSER").val('');
                    $("#inputCLIENT").val('');   
                    
                    $("#inputDOC").val('');
                    $("#inputDOCNRO").val('');
                    $("#inputDIR").val('');
                    $("#inputTEL").val('');
                    $("#inputEMAIL").val('');
                   
                    $("#cot_IGV").val('');

                    $("#cot_CANT1").val('');
                    $("#cot_PROD1").val('');
                    $("#cot_PROD1-hidden").val('');
                    $("#cot_PU1").val('');
                    $("#cot_PC1").val('');
                    $("#cot_PM1").val('');
                    $("#cot_ST1").val('');
                            
                    $("#cot_CANT2").val('');
                    $("#cot_PROD2").val('');
                    $("#cot_PROD2-hidden").val('');
                    $("#cot_PU2").val('');
                    $("#cot_PC2").val('');
                    $("#cot_PM2").val('');
                    $("#cot_ST2").val('');           

                    $("#cot_CANT3").val('');
                    $("#cot_PROD3").val('');
                    $("#cot_PROD3-hidden").val('');
                    $("#cot_PU3").val('');
                    $("#cot_PC3").val('');
                    $("#cot_PM3").val('');
                    $("#cot_ST3").val('');         

                    $("#cot_CANT4").val('');
                    $("#cot_PROD4").val('');
                    $("#cot_PROD4-hidden").val('');
                    $("#cot_PU4").val('');
                    $("#cot_PC4").val('');
                    $("#cot_PM4").val('');
                    $("#cot_ST4").val('');

                    $("#cot_CANT5").val('');
                    $("#cot_PROD5").val('');
                    $("#cot_PROD5-hidden").val('');
                    $("#cot_PU5").val('');
                    $("#cot_PC5").val('');
                    $("#cot_PM5").val('');
                    $("#cot_ST5").val('');
                
                    $("#cot_SUBTOTAL").val('');
                    $("#cot_TOTAL").val('');
                }

            
            }
        });
    }


    completarVenta(id){
      if($("#movimiento_caja").val()!="" && $("#movimiento_caja").val()!=null){
        $.ajax({
            url: "../backend/panel/ventas/ajax_completar.php",
            type: "POST",
            data: {
                id: id,
                cot_adelanto: $("#cot_adelanto").val(),
                cot_resto: $("#cot_resto").val(),
                cot_TOTAL: $("#cot_TOTAL").val(),
                movimiento_caja: $("#movimiento_caja").val(),
                cot_tipo_pago2: $("#cot_tipo_pago2").val()
            },
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Venta completada con Exito!
                            </div>
                        `);
                        setTimeout(()=>{
                            venta.listarVentas();
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },600);
                    }else{
                        $('.btn_modals').prop('disabled', false);
                        if(response==301){                      
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error al subir el archivo al servidor!
                                </div>
                            `);
                        }else{
                            if(response==302){    
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        Se produjo un error con la base de datos!
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                                `);
                            }
                        }
                    }   
            },
            timeout: 30000,
            error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
            }
        });
      }else{
        $("#msg-ajax-result").html(`
        <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
            Seleccionar una Caja para realizar la operacion!
        </div>
`);
      }
        
    }

    calcularSubTotal(item){
        var cantidad = $("#cot_CANT"+item).val();
        var unidad = $("#cot_PU"+item).val();
        var centena;
        var millar;

        $("#cot_ST"+item).val(Math.ceil10($("#cot_CANT"+item).val()*$("#cot_PU"+item).val(),-2));
        
        /*
        if(cantidad > 0 && cantidad < 100){
            $("#cot_ST"+item).val(Math.ceil10($("#cot_CANT"+item).val()*$("#cot_PC"+item).val()/100,-2));
        }
        if(cantidad >= 100 && cantidad < 1000){
            centena = Math.floor(cantidad/100);
            unidad = cantidad % 100;
            $("#cot_ST"+item).val(Math.ceil10(centena*$("#cot_PC"+item).val() + unidad*$("#cot_PC"+item).val()/100,-2));
        }
        if(cantidad >= 1000){
            millar = Math.floor(cantidad/1000);
            centena = Math.floor((cantidad%1000)/100);
            unidad = (cantidad%1000)%100;
            $("#cot_ST"+item).val(Math.ceil10(millar*$("#cot_PM"+item).val() + centena*$("#cot_PC"+item).val() + unidad*$("#cot_PC"+item).val()/100,-2));
        }
        */

        $("#cot_SUBTOTAL").val(Math.ceil10(venta.parseSubTotal($("#cot_ST1").val())+venta.parseSubTotal($("#cot_ST2").val())+venta.parseSubTotal($("#cot_ST3").val())+venta.parseSubTotal($("#cot_ST4").val())+venta.parseSubTotal($("#cot_ST5").val()),-2));
        
        const subtotal = venta.parseSubTotal($("#cot_SUBTOTAL").val());
        $("#cot_TOTAL").val(Math.ceil10(subtotal + (subtotal/100)*venta.parseSubTotal($("#cot_IGV").val()),-2));
        $("#cot_resto").val(Math.ceil10(venta.parseSubTotal($("#cot_TOTAL").val()) - venta.parseSubTotal($("#cot_adelanto").val()),-2));

    }
    calcularTotal(){
        $("#cot_SUBTOTAL").val(Math.ceil10(venta.parseSubTotal($("#cot_ST1").val())+venta.parseSubTotal($("#cot_ST2").val())+venta.parseSubTotal($("#cot_ST3").val())+venta.parseSubTotal($("#cot_ST4").val())+venta.parseSubTotal($("#cot_ST5").val()),-2));
        const subtotal = venta.parseSubTotal($("#cot_SUBTOTAL").val());
        $("#cot_TOTAL").val(Math.ceil10(subtotal + (subtotal/100)*venta.parseSubTotal($("#cot_IGV").val()),-2));
        $("#cot_resto").val(Math.ceil10(venta.parseSubTotal($("#cot_TOTAL").val()) - venta.parseSubTotal($("#cot_adelanto").val()),-2));
    }
    parseSubTotal(n){
        var result;
        if(n!=null && n!=""){
            result = parseFloat(n);
        }else{
            result = 0;
        }
        return result;
    }


    buscar_cotizacion(clave){

        var tipo_bus = $("#cotizaciones_buscar_tipo").val();

        $.ajax({
            url: "../backend/panel/ventas/cotizaciones/ajax_buscar_cotizacion.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus},
            beforeSend: function(){
                $("#load_data_cotizaciones").html('');
                $("#load_table_cotizaciones").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.id}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.telefono}</td>
                                                <td>S/. ${datos.total}</td>
                                                <td>${datos.fecha_reg}</td>
                                    `;

                    if(datos.estado=="EMITIDO"){
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-secondary">${datos.estado}</span></td>
                        `;
                    }
                    
                    contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:110px;" type="button" class="btn btn-primary" onClick='btn_edit("cotizaciones",${datos.id});'><i class="fas fa-edit"></i> Modificar</button>
                                                        <button style="width:110px;" type="button" class="btn btn-info" onClick='venta.printCotizaciones(${datos.id});'><i class="fas fa-file-alt"></i> Proforma</button>
                                                    </div>
                                                </td>
                                            </tr>
                    `;   
                });
            

                $("#load_table_cotizaciones").html('');
                $("#load_data_cotizaciones").html(contenido_ajax);

            }
        });
    }

    buscar_venta(clave){

        var tipo_bus = $("#ventas_buscar_tipo").val();

        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_venta.php",
            type: "GET",
            data: {clave: clave,tipo:tipo_bus},
            beforeSend: function(){
                $("#load_data_ventas").html('');
                $("#load_table_ventas").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.id}</td>
                                                <td>${datos.nombre + " " + datos.apellido_pat + " " + datos.apellido_mat}</td>
                                                <td>${datos.telefono}</td>
                                                <td>S/. ${datos.total}</td>
                                                <td>${datos.fecha_reg}</td>
                                    `;

                    if(datos.estado=="CONTRATADO"){
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-warning">${datos.estado}</span></td>
                                    `;
                    }else{
                        contenido_ajax += `
                                                <td><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                        `;
                    }
                    
                    if(datos.estado=="CONTRATADO"){
                        contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:170px;" type="button" class="btn btn-success mt-1" onClick='btn_edit("ventas",${datos.id});'><i class="fas fa-lg fa-comments-dollar"></i> Completar Venta</button>
                                                        <button style="width:150px;" type="button" class="btn btn-info mt-1" onClick='venta.printVenta(${datos.id});'><i class="fas fa-file-alt"></i> Comprobante</button>
                                                    </div>
                                                </td>
                                            </tr>
                            `;
                    }else{
                        contenido_ajax += `
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:160px;" type="button" class="btn btn-primary" onClick='btn_edit("ventas",${datos.id});'><i class="fas fa-eye"></i> Ver Detalles</button>
                                                        
                                                    </div>
                                                </td>
                                            </tr>
                        `; 
                    }
                      
                });

                $("#load_table_ventas").html('');
                $("#load_data_ventas").html(contenido_ajax);

            }
        });
    }

    buscar_producto_id_print_cot(id,item){

        $.ajax({
            url: "../backend/panel/ventas/ajax_buscar_producto_id.php",
            type: "GET",
            data: {clave: id},
            beforeSend: function(){
                $(".cot_print_des"+item).html('');
                $(".cot_print_des"+item).html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                        <span style="font-weight:bold; text-transform: uppercase; text-decoration: underline;">${datos.nombre_prod}</span>  
                        - COD: ${datos.codigo_prod}<br> 
                    `;

                    if(datos.caracteristicas!="" && datos.caracteristicas!=null){
                        contenido_ajax += `
                            ${datos.caracteristicas}<br>  
                        `;  
                    }

                    /*
                    if(datos.url_img!="" && datos.url_img!=null){
                        contenido_ajax += `
                            <center><img src="../img/upload/productos/${datos.url_img}" height="100" style="margin-top:8px;margin-bottom:4px;"></center>
                        `;
                    }
                    */
                    
                }); 




                $(".cot_print_des"+item).html('');
                $(".cot_print_des"+item).html(contenido_ajax);
    
                setTimeout(()=>{
                    $(".cot_print_cant"+item).css("height",document.querySelectorAll('.cot_print_des'+item)[0].clientHeight-8+"px");
                },700);
                
                
            }
            
        });
    }


    
    printCotizaciones(id){
        
        $(".nav-item").removeClass("active");
        $("#nav-creative-tab").addClass("active");
        $(".tab-pane").removeClass("active show");
        $("#nav-creative").addClass("active show");


        venta.activo = id;


        $('#modal-add-print').modal('show'); 
        $('#modal-add h4').html("Cotización");
        
        $.ajax({
            url: "../backend/panel/ventas/cotizaciones/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                var cont = 0;
                //console.log(datos[0]);


                $("#nav-free").html(`
                
                                        <div class="row justify-content-between">
                                            <div class="col-6">
                                                <div style="position:absolute; background: #FAB14A; transform: skewX(-45deg) translateX(-50%); height: 100px; width: 50%; border-radius: 0px 10px 7px 0px;">
                                                    <div style="position:absolute; background: #EFBD31; transform: translate(-25%,-15px); height: 130px; width: 100%; z-index: 2200;">
                                                        <div style="position:absolute; background: rgb(43, 43, 43); left:70%; transform: translateX(-100%); height: 130px; width: 20%;">
                                                        </div>
                                                    </div>
                                                    <div style="width:200%; position:relative; top:50%; transform: translateY(-50%) translateX(25%); background: rgb(43, 43, 43);">
                                                        <div  style="transform: skewX(45deg);">
                                                            <h5 style="color:white; text-align:center; padding-left:20px;">PROFORMA N° ${datos[0].id}</h5>
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
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].nombre + " " + datos[0].apellido_pat + " " + datos[0].apellido_mat}</div>
                                            </div>
                                            <div class="col-sm-5" style="margin-top: 12px;">
                                                <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Fecha</span>
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].fecha_reg_print}</div>
                                            </div>
                                            <div class="col-sm-12" style="margin-top: 12px;">
                                                <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Tiempo de entrega</span>
                                                <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].entrega}</div>
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
                                                <div style="background: rgb(255, 236, 143); border-radius: 50px; text-align:center; padding: 8px 6px;">
                                                    ${ datos[0].p1_cant ? '<span class="d-block cot_print_cant1"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p1_cant+'</div></span>' : ''}
                                                    ${ datos[0].p2_cant ? '<span class="d-block cot_print_cant2"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p2_cant+'</div></span>' : ''}
                                                    ${ datos[0].p3_cant ? '<span class="d-block cot_print_cant3"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p3_cant+'</div></span>' : ''}
                                                    ${ datos[0].p4_cant ? '<span class="d-block cot_print_cant4"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p4_cant+'</div></span>' : ''}
                                                    ${ datos[0].p5_cant ? '<span class="d-block cot_print_cant5"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p5_cant+'</div></span>' : ''} 
                                                </div>
                                            </div>
                                            <div class="col-7">
                                                <div style="border: 5px solid rgb(255, 236, 143); border-radius: 3px; text-align:left; padding: 3px 20px;">
                                                    <span class="d-block cot_print_des1"></span>
                                                    <span class="d-block cot_print_des2"></span>
                                                    <span class="d-block cot_print_des3"></span>
                                                    <span class="d-block cot_print_des4"></span>
                                                    <span class="d-block cot_print_des5"></span>
                                                </div>
                                            </div>
                                            <div class="col-3">
                                                <div style="background: rgb(255, 236, 143); border-radius: 50px; text-align:center; padding: 8px 6px;">
                                                    ${ datos[0].p1_pu ? '<span class="d-block cot_print_cant1"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p1_pu+'</div></span>' : ''}
                                                    ${ datos[0].p2_pu ? '<span class="d-block cot_print_cant2"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p2_pu+'</div></span>' : ''}
                                                    ${ datos[0].p3_pu ? '<span class="d-block cot_print_cant3"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p3_pu+'</div></span>' : ''}
                                                    ${ datos[0].p4_pu ? '<span class="d-block cot_print_cant4"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p4_pu+'</div></span>' : ''}
                                                    ${ datos[0].p5_pu ? '<span class="d-block cot_print_cant5"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p5_pu+'</div></span>' : ''}
                                                </div> 
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div class="col-2">
                                               
                                            </div>
                                            <div class="col-7">
                                                <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                                    IGV ${datos[0].igv}%
                                                </div> 
                                            </div>
                                            <div class="col-3">
                                                <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                                    <b>S/. ${datos[0].total}</b>
                                                </div> 
                                            </div>
                                        </div>

                                        <br>

                                        <div class="row">
                                            <div style="width:100%; display:flex; border: 7px solid rgb(250, 235, 162); border-radius: 6px; font-size:0.8em; margin-bottom:8px;">
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

                `);






                $("#cotizacion-datos01").html(`
                    <tr>
                        <td>R.U.C:</td>
                        <td>:</td>
                        <td> 20487099822</td>
                    </tr>
                    <tr>
                        <td>FECHA</td>
                        <td>:</td>
                        <td> ${datos[0].fecha_reg_print}</td>
                    </tr>
                `);
                
                $("#cotizacion-datos02").html(`
                    <b>PROFORMA N° ${datos[0].id}</b>
                `);
                
                if(datos[0].empresa!="" && datos[0].empresa!=null){
                    $("#cotizacion-datos03").html(`
                        <b>ESTIMADOS SEÑORES:</b> ${datos[0].empresa}<br>
                        <b>CONTACTO:</b> ${datos[0].apellido_pat + " " + datos[0].apellido_mat + " " + datos[0].nombre} - 
                        <b>Teléfono:</b> ${datos[0].telefono} 
                    `);
                }else{
                    $("#cotizacion-datos03").html(`
                        <tr>
                            <td><b>ESTIMADO(A):</b> ${datos[0].apellido_pat + " " + datos[0].apellido_mat + " " + datos[0].nombre}</td>
                            <td class="font-weight-normal pl-2">  <b>Teléfono:</b>${datos[0].telefono}</td>
                        </tr>  
                    `);
                }
                

                $("#cotizacion-datos04").html('');
                if(datos[0].idprod1!="" && datos[0].idprod1!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td>${datos[0].p1_cant}</td>
                            <td class="cot_print_des1" style="text-align:left; padding-left:18px;">${datos[0].idprod1}</td>
                            <td>S/. ${datos[0].p1_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p1_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod1,1);
                }
                if(datos[0].idprod2!="" && datos[0].idprod2!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p2_cant}</td>
                            <td class="cot_print_des2" style="text-align:left; padding-left:18px;">${datos[0].idprod2}</td>
                            <td>S/. ${datos[0].p2_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p2_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod2,2);
                }
                if(datos[0].idprod3!="" && datos[0].idprod3!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p3_cant}</td>
                            <td class="cot_print_des3" style="text-align:left; padding-left:18px;">${datos[0].idprod3}</td>
                            <td>S/. ${datos[0].p3_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p3_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod3,3);
                }
                if(datos[0].idprod4!="" && datos[0].idprod4!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p4_cant}</td>
                            <td class="cot_print_des4" style="text-align:left; padding-left:18px;">${datos[0].idprod4}</td>
                            <td>S/. ${datos[0].p4_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p4_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod4,4);
                }
                if(datos[0].idprod5!="" && datos[0].idprod5!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p5_cant}</td>
                            <td class="cot_print_des5" style="text-align:left; padding-left:18px;">${datos[0].idprod5}</td>
                            <td>S/. ${datos[0].p5_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p5_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod5,5);
                }


                if(cont > 1){
                    $("#cotizacion-datos04").append(`
                            <tr>
                                <td style="border:none;" class="cot_total"></td>
                                <td style="border:none;" class="cot_total"></td>
                                <td style="font-size:1.1em;font-weight:bold;">COSTO TOTAL</td>
                                <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].total}</td>
                            </tr>
                    `);  
                }


                $("#cotizacion-datos05").html(`
                    <b>TIEMPO DE VALIDES DE LA PROFORMA: </b>${datos[0].validez}<br>
                    <b>TIEMPO DE ENTREGA: </b>${datos[0].entrega}<br>
                    <b>TIPO DE COMPROBANTE DE PAGO A EMITIR: </b>${datos[0].comprobante}<br>
                    <b>CUENTA CORRIENTE SOLES BANCO CONTINENTAL: </b>001 10235000 100 10094995 AGENCIA DE PUBLICIDAD CREATIVE<br>
                    <b>CÓDIGO INTERBANCARIO (CCI): </b>011235000 100 10094995<br>
                    <b>BANCO: </b>BBVA CONTINENTAL<br>
                    <b>INCLUYE IGV</b><br>
                `);
                
                



            }
        });
    }

    printVenta(id){
        
        $(".nav-item").removeClass("active");
        $("#nav-creative-tab").addClass("active");
        $(".tab-pane").removeClass("active show");
        $("#nav-creative").addClass("active show");

        venta.activo = id;

        $('#modal-add-print').modal('show'); 
        $('#modal-add h4').html("Venta");
        
        $.ajax({
            url: "../backend/panel/ventas/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                var cont = 0;
                //console.log(datos[0]);


                $("#nav-free").html(`
                
                    <div class="row justify-content-between">
                        <div class="col-6">
                            <div style="position:absolute; background: #FAB14A; transform: skewX(-45deg) translateX(-50%); height: 100px; width: 50%; border-radius: 0px 10px 7px 0px;">
                                <div style="position:absolute; background: #EFBD31; transform: translate(-25%,-15px); height: 130px; width: 100%; z-index: 2200;">
                                    <div style="position:absolute; background: rgb(43, 43, 43); left:70%; transform: translateX(-100%); height: 130px; width: 20%;">
                                    </div>
                                </div>
                                <div style="width:200%; position:relative; top:50%; transform: translateY(-50%) translateX(25%); background: rgb(43, 43, 43);">
                                    <div  style="transform: skewX(45deg);">
                                        <h5 style="color:white; text-align:center; padding-left:20px;">COMPROBANTE N° ${datos[0].id}</h5>
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
                            <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].nombre + " " + datos[0].apellido_pat + " " + datos[0].apellido_mat}</div>
                        </div>
                        <div class="col-sm-5" style="margin-top: 12px;">
                            <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Fecha</span>
                            <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].fecha_reg_print}</div>
                        </div>
                        <div class="col-sm-12" style="margin-top: 12px;">
                            <span style=" background: rgb(227, 205, 34); padding: 7px 22px; border-radius: 10px; font-weight:600; margin-left: 20px;">Tiempo de entrega</span>
                            <div style="border: 1px solid black; border-radius: 8px; padding: 1px 10px; padding-left: 20px;">${datos[0].entrega}</div>
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
                            <div style="background: rgb(255, 236, 143); border-radius: 50px; text-align:center; padding: 8px 6px;">
                                ${ datos[0].p1_cant ? '<span class="d-block cot_print_cant1"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p1_cant+'</div></span>' : ''}
                                ${ datos[0].p2_cant ? '<span class="d-block cot_print_cant2"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p2_cant+'</div></span>' : ''}
                                ${ datos[0].p3_cant ? '<span class="d-block cot_print_cant3"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p3_cant+'</div></span>' : ''}
                                ${ datos[0].p4_cant ? '<span class="d-block cot_print_cant4"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p4_cant+'</div></span>' : ''}
                                ${ datos[0].p5_cant ? '<span class="d-block cot_print_cant5"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p5_cant+'</div></span>' : ''} 
                            </div>
                        </div>
                        <div class="col-7">
                            <div style="border: 5px solid rgb(255, 236, 143); border-radius: 3px; text-align:left; padding: 3px 20px;">
                                <span class="d-block cot_print_des1"></span>
                                <span class="d-block cot_print_des2"></span>
                                <span class="d-block cot_print_des3"></span>
                                <span class="d-block cot_print_des4"></span>
                                <span class="d-block cot_print_des5"></span>
                            </div>
                        </div>
                        <div class="col-3">
                            <div style="background: rgb(255, 236, 143); border-radius: 50px; text-align:center; padding: 8px 6px;">
                                ${ datos[0].p1_pu ? '<span class="d-block cot_print_cant1"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p1_pu+'</div></span>' : ''}
                                ${ datos[0].p2_pu ? '<span class="d-block cot_print_cant2"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p2_pu+'</div></span>' : ''}
                                ${ datos[0].p3_pu ? '<span class="d-block cot_print_cant3"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p3_pu+'</div></span>' : ''}
                                ${ datos[0].p4_pu ? '<span class="d-block cot_print_cant4"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p4_pu+'</div></span>' : ''}
                                ${ datos[0].p5_pu ? '<span class="d-block cot_print_cant5"><div style="position:relative;top:50%;transform:translateY(-50%);">'+datos[0].p5_pu+'</div></span>' : ''}
                            </div> 
                        </div>
                    </div>

                    <br>

                    <div class="row">
                        <div class="col-2">
                        
                        </div>
                        <div class="col-7">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                Total + Impuestos ${datos[0].igv!=0 ? "("+datos[0].igv+"%)" : ""}
                            </div> 
                        </div>
                        <div class="col-3">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                <b>S/. ${datos[0].total}</b>
                            </div> 
                        </div>
                    </div>

                    <div class="row" style="margin-top:14px;">
                        <div class="col-2">
                        
                        </div>
                        <div class="col-7">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                Adelanto
                            </div> 
                        </div>
                        <div class="col-3">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                S/. ${datos[0].adelanto}
                            </div> 
                        </div>
                    </div>
                    <div class="row" style="margin-top:6px;">
                        <div class="col-2">
                        
                        </div>
                        <div class="col-7">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                Pendiente
                            </div> 
                        </div>
                        <div class="col-3">
                            <div style="background: rgb(250, 235, 162); border-radius: 5px; text-align:center;">
                                S/. ${Math.ceil10(datos[0].total - datos[0].adelanto,-2)}
                            </div> 
                        </div>
                    </div>


                    <br>

                    <div class="row">
                        <div style="width:100%; display:flex; border: 7px solid rgb(250, 235, 162); border-radius: 6px; font-size:0.8em; margin-bottom:8px;">
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

                `);




                $("#cotizacion-datos01").html(`
                    <tr>
                        <td>R.U.C:</td>
                        <td>:</td>
                        <td> 20487099822</td>
                    </tr>
                    <tr>
                        <td>FECHA</td>
                        <td>:</td>
                        <td> ${datos[0].fecha_reg_print}</td>
                    </tr>
                `);
                
                $("#cotizacion-datos02").html(`
                    <b>CONTRATO N° ${datos[0].id}</b>
                `);
                
                if(datos[0].empresa!="" && datos[0].empresa!=null){
                    $("#cotizacion-datos03").html(`
                        <b>ESTIMADOS SEÑORES:</b> ${datos[0].empresa}<br>
                        <b>CONTACTO:</b> ${datos[0].apellido_pat + " " + datos[0].apellido_mat + " " + datos[0].nombre} - 
                        <b>Teléfono:</b> ${datos[0].telefono} 
                    `);
                }else{
                    $("#cotizacion-datos03").html(`
                        <tr>
                            <td><b>ESTIMADO(A):</b> ${datos[0].apellido_pat + " " + datos[0].apellido_mat + " " + datos[0].nombre}</td>
                            <td class="font-weight-normal pl-2">  <b>Teléfono:</b>${datos[0].telefono}</td>
                        </tr>  
                    `);
                }

                $("#cotizacion-datos04").html('');
                if(datos[0].idprod1!="" && datos[0].idprod1!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td>${datos[0].p1_cant}</td>
                            <td class="cot_print_des1" style="text-align:left; padding-left:18px;">${datos[0].idprod1}</td>
                            <td>S/. ${datos[0].p1_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p1_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod1,1);
                }
                if(datos[0].idprod2!="" && datos[0].idprod2!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p2_cant}</td>
                            <td class="cot_print_des2" style="text-align:left; padding-left:18px;">${datos[0].idprod2}</td>
                            <td>S/. ${datos[0].p2_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p2_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod2,2);
                }
                if(datos[0].idprod3!="" && datos[0].idprod3!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p3_cant}</td>
                            <td class="cot_print_des3" style="text-align:left; padding-left:18px;">${datos[0].idprod3}</td>
                            <td>S/. ${datos[0].p3_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p3_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod3,3);
                }
                if(datos[0].idprod4!="" && datos[0].idprod4!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p4_cant}</td>
                            <td class="cot_print_des4" style="text-align:left; padding-left:18px;">${datos[0].idprod4}</td>
                            <td>S/. ${datos[0].p4_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p4_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod4,4);
                }
                if(datos[0].idprod5!="" && datos[0].idprod5!=null){
                    cont++;
                    $("#cotizacion-datos04").append(`
                        <tr>
                            <td scope="row">${datos[0].p5_cant}</td>
                            <td class="cot_print_des5" style="text-align:left; padding-left:18px;">${datos[0].idprod5}</td>
                            <td>S/. ${datos[0].p5_pu}</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].p5_st}</td>
                        </tr>
                    `);
                    venta.buscar_producto_id_print_cot(datos[0].idprod5,5);
                }



                $("#cotizacion-datos04").append(`
                        <tr>
                            <td style="border:none;" class="cot_total"></td>
                            <td style="border:none;" class="cot_total"></td>
                            <td style="font-size:1em;font-weight:bold;">Impuesto</td>
                            <td style="font-size:1em;font-weight:bold;">${datos[0].igv}%</td>
                        </tr>
                `);  
                $("#cotizacion-datos04").append(`
                        <tr>
                            <td style="border:none;" class="cot_total"></td>
                            <td style="border:none;" class="cot_total"></td>
                            <td style="font-size:1.1em;font-weight:bold;">Costo Total</td>
                            <td style="font-size:1.1em;font-weight:bold;">S/. ${datos[0].total}</td>
                        </tr>
                `);  
               


                $("#cotizacion-datos04").append(`
                            <tr>
                                <td style="border:none;" class="cot_total"></td>
                                <td style="border:none;" class="cot_total"></td>
                                <td style="border:none;"></td>
                                <td style="border:none;"></td>
                            </tr>
                `); 
                $("#cotizacion-datos04").append(`
                            <tr>
                                <td style="font-size:1.1em;font-weight:bold;" class="cot_total">Adelanto</td>
                                <td style="font-size:1.1em;" class="cot_total">S/. ${datos[0].adelanto}</td>
                                <td style="font-size:1.1em;font-weight:bold;">Pendiente</td>
                                <td style="font-size:1.1em;">S/. ${Math.ceil10(datos[0].total - datos[0].adelanto,-2)}</td>
                            </tr>
                `);
                


                $("#cotizacion-datos05").html(`
                    <b>TIEMPO DE ENTREGA: </b>${datos[0].entrega}<br>
                    <b>TIPO DE COMPROBANTE DE PAGO A EMITIR: </b>${datos[0].comprobante}<br>
                    <b>CUENTA CORRIENTE SOLES BANCO CONTINENTAL: </b>001 10235000 100 10094995 AGENCIA DE PUBLICIDAD CREATIVE<br>
                    <b>CÓDIGO INTERBANCARIO (CCI): </b>011235000 100 10094995<br>
                    <b>BANCO: </b>BBVA CONTINENTAL<br>
                    <b>INCLUYE IGV</b><br>
                `);
                
                
            }
        });
    }
}



class Caja{
    constructor(){
        this.idEdit = 0;
        this.metodo = 0; //1: guardar; 2: modificar
        this.formulario;
    }

    listarCajas(){
        //console.log("listando")
        $.ajax({
            url: "../backend/panel/cajas/crear/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos)
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.nombre}</td>
                                              
                                    `;

                    if(datos.capital==null || datos.capital==""){
                        contenido_ajax += `
                                                <td></td>                  
                        `;
                    }else{
                        contenido_ajax += `
                                                <td>S/.${datos.capital}</td> 
                        `;
                    }
                                                
                    switch(datos.estado){
                        case "DESHABILITADO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-danger">${datos.estado}</span></td>
                                                            `; break;
                        case "ABIERTO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                                                            `; break;
                        case "CERRADO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-warning">${datos.estado}</span></td>
                                                            `; break;
                    }

                    contenido_ajax += `         
                                                <td>
                                                    <div class="col text-center"> 
                                                        <button style="width:140px;" type="button" class="btn btn-primary" onClick='btn_edt_caja(${datos.idcaja},"CREAR");'><i class="fas fa-edit"></i> Modificar</button>
                                                    </div>
                                                </td>
                                            </tr>
                    `;

                             
                });
            
                $("#load_data_cajas").html(contenido_ajax);
                                      
            }
        });
    }

    listarAperturas(){
        //console.log("listando")
        $.ajax({
            url: "../backend/panel/cajas/aperturas/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar"},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos)
                var contenido_ajax = "";
                var conteo = 0;
                datos.forEach( datos => {
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.nombre}</td>
                                              
                                    `;

                    if(datos.capital==null || datos.capital==""){
                        contenido_ajax += `
                                                <td></td>                  
                        `;
                    }else{
                        contenido_ajax += `
                                                <td>S/.${datos.capital}</td> 
                        `;
                    }
                                                
                    switch(datos.estado){
                        case "DESHABILITADO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-danger">${datos.estado}</span></td>
                                                            `; break;
                        case "ABIERTO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-success">${datos.estado}</span></td>
                                                                <td>
                                                                    <div class="col text-center"> 
                                                                        <button style="width:140px;" type="button" class="btn btn-danger" onClick='btn_edt_caja(${datos.idcaja},"CIERRE");'><i class="fas fa-lock"></i> Cerrar</button>
                                                                    </div>
                                                                </td>
                                                            `; break;
                        case "CERRADO": contenido_ajax += `
                                                                <td class="text-center"><span class="badge badge-pill badge-warning">${datos.estado}</span></td>
                                                                <td>
                                                                    <div class="col text-center"> 
                                                                        <button style="width:140px;" type="button" class="btn btn-success" onClick='btn_edt_caja(${datos.idcaja},"APERTURA");'><i class="fas fa-lock-open"></i> Abrir</button>
                                                                    </div>
                                                                </td>
                                                            `; break;
                    }

                    contenido_ajax += `
                                            </tr>
                    `;

                             
                });
            
                $("#load_data_aperturas").html(contenido_ajax);
                                      
            }
        });
    }

    listarMovimientos(clave){

        if(clave==0 || clave=="" || clave==null){
            clave = 0;
        }
        
        $.ajax({
            url: "../backend/panel/cajas/movimientos/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar", clave:clave},
            
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                //console.log(datos);
                datos.forEach( datos => {
                 
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.caja_nombre}</td>
                                        `;
                    
                    if(datos.tipo_mov=="INGRESO"){
                        contenido_ajax += `
                            <td><span class="badge badge-pill badge-success">${datos.tipo_mov}</span></td>
                        `;
                    }else{
                        contenido_ajax += `
                            <td><span class="badge badge-pill badge-danger">${datos.tipo_mov}</span></td>
                        `;
                    }

                    contenido_ajax += `
                    
                                                
                                                <td>S/. ${datos.monto}</td>
                                                <td>${datos.concepto}</td>
                                                <td>${datos.fecha_mov}</td>
                                                <td><center><button type="button" class="btn btn-primary" onclick='btn_movimientos_print("voucher",${datos.idmovimiento});'><i class="fas fa-lg fa-ticket-alt"></i></button></center></td>
                                              
                                    `;
                     
                    contenido_ajax += `
                                            </tr>
                    `;
                    
                             
                });
            
                $("#load_data_movimientos").html(contenido_ajax);
                //console.log("listando")                 
            }
        });
    }

    listarFlujo(inicio,fin){
        
        $.ajax({
            url: "../backend/panel/cajas/flujo/ajax_ver.php",
            type: "GET",
            data: {consulta: "buscar", inicio:inicio, fin:fin},
            beforeSend: function(){
                $("#load_data_flujo").html('');
                $("#load_data_flujo2").html('');
                $("#load_table_flujo").html(`
                    <div style="">
                        <br>
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div><br>
                        <span style="position:relative;left:50%;float:left;transform:translateX(-67%);margin-top:15px;">Loading...</span>
                    </div>
                `); 
            },
            success: function(response){
                var datos = JSON.parse(response);
                var contenido_ajax = "";
                var conteo = 0;
                //console.log(datos);
                datos.forEach( datos => {
                 
                    conteo++;
                    contenido_ajax += `
                                            <tr>
                                                <th scope="row">${conteo}</th>
                                                <td>${datos.caja_nombre}</td>
                                        `;
                    
                    if(datos.tipo_mov=="INGRESO"){
                        contenido_ajax += `
                            <td><span class="badge badge-pill badge-success">${datos.tipo_mov}</span></td>
                        `;
                    }else{
                        contenido_ajax += `
                            <td><span class="badge badge-pill badge-danger">${datos.tipo_mov}</span></td>
                        `;
                    }

                    contenido_ajax += ` 
                                                <td>S/. ${datos.monto}</td>
                                                <td class="text-uppercase">${datos.concepto}</td>                    
                                    `;

                    if(datos.detalle!="" && datos.detalle!=null){
                        contenido_ajax += ` 
                                                <td class="text-uppercase">${datos.detalle}</td>               
                                    `;
                    }else{
                        contenido_ajax += ` 
                                                <td></td>
                                    `;
                    }
                    

                     
                    contenido_ajax += `
                                                <td>${datos.fecha_mov}</td>
                                            </tr>
                    `;
                    
                             
                });
            
                $("#load_table_flujo").html('');
                $("#reporte_fechas").html(`FLUJO DE CAJA DEL `+inicio+ ' AL '+fin);
                $("#load_data_flujo").html(contenido_ajax);
                $("#load_data_flujo2").html(contenido_ajax);
                //console.log("listando")        
                
                $.ajax({
                    url: "../backend/panel/cajas/flujo/ajax_sumatoria.php",
                    type: "GET",
                    data: {consulta: "buscar", inicio:inicio, fin:fin},
                    success: function(response){
                        var datos = JSON.parse(response);
                        var contenido_ajax = "";
                    
                        
                        datos.forEach( datos => {
                    
                            contenido_ajax += `
                                                    <tr>
                                                        <td></td><td></td><td></td><td></td><td></td>
                                                        <th scope="row">${datos.tipo_mov}</th>
                                                        <td><b>S/. ${datos.sumatoria}</b></td>
                                                    </tr>
                            `;
                                  
                        });
                    
                       
                        $("#load_data_flujo").append(contenido_ajax);
                        $("#load_data_flujo2").append(contenido_ajax);
                           
                    }
                });
            }
        });
    }

    crearCaja(){
        $.ajax({
            type: 'POST',
            url: '../backend/panel/cajas/crear/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        caja.listarCajas();
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    registrarMovimiento(){
        $.ajax({
            type: 'POST',
            url: '../backend/panel/cajas/movimientos/ajax_registrar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        caja.listarMovimientos(0);
                        $('#modal-add').modal('hide');
                        $('.btn_modals').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                    },600);
                }else{
                    $('.btn_modals').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            if(response=="600"){
                                $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        No hay fondos suficientes en la Caja!.
                                    </div>
                                `);
                            }else{
                                $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                            }
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals').prop('disabled', false);
                $("#msg-ajax-result").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }


    editCaja(id){
        document.getElementById("formulario-caja-edt").reset();
        $('#modal-add-edt').modal('show'); 
        $('#modal-add-edt h4').html("Modificar Caja");
        
        $.ajax({
            url: "../backend/panel/cajas/crear/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                

                $('#caja_nombre-edt').val(datos[0].nombre);
                $('#caja_capital-edt').val(datos[0].capital);
        

                if(datos[0].estado=='DESHABILITADO'){
                    $(".modal-btn-cont-edt").html(`
                        <button type="button" class="btn btn-block btn-primary btn_modals" onclick="caja.habilitar(${id},1);"><i class="fas fa-lg fa-user-lock"></i> Habilitar</button>
                    `);
                }else{
                    if(datos[0].estado=='CERRADO'){
                        $(".modal-btn-cont-edt").html(`
                            <button type="button" class="btn btn-block btn-danger btn_modals" onclick="caja.habilitar(${id},0);"><i class="fas fa-lg fa-user-lock"></i> Deshabilitar</button>
                        `);
                    }
                }


            }
        });
    }

    editApertura(id){
        document.getElementById("formulario-apertura").reset();
        $('#modal-add').modal('show'); 
        
        $.ajax({
            url: "../backend/panel/cajas/crear/ajax_ver.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]); 

                $('#caja_nombre').val(datos[0].nombre);
                $('#caja_capital').val(datos[0].capital);


                if(datos[0].estado=='CERRADO'){
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-success btn_modals" onclick="caja.apertura(${id},1);"><i class="fas fa-lg fa-lock-open"></i> Aperturar</button>
                    `);
                }else{ 
                    $(".modal-btn-cont").html(`
                        <button type="button" class="btn btn-block btn-danger btn_modals" onclick="caja.apertura(${id},0);"><i class="fas fa-lg fa-user-lock"></i> Cerrar</button>
                    `);   
                }


            }
        });
    }


    editarSaveCaja(id){

        this.formulario.append("id",id); 

        $.ajax({
            type: 'POST',
            url: '../backend/panel/cajas/crear/ajax_editar.php',
            data: this.formulario,
            contentType: false,
            cache: false,
            processData:false,
            beforeSend: function(){
                $('.btn_modals-edt').prop('disabled', true);
                $("#msg-ajax-result-edt").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                //console.log(response);
                if(response==200){                      
                    $("#msg-ajax-result-edt").html(`
                            <div class="alert alert-success" role="alert"  style="margin-bottom: 10px;">
                                Registro Correcto!
                            </div>
                    `);
                    setTimeout(()=>{
                        caja.listarCajas();
                        $('#modal-add-edt').modal('hide');
                        $('.btn_modals-edt').prop('disabled', false);
                        setTimeout(()=>{$("#msg-ajax-result-edt").html("");},700);
                    },600);
                }else{
                    $('.btn_modals-edt').prop('disabled', false);
                    if(response==301){                      
                        $("#msg-ajax-result-edt").html(`
                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                Se produjo un error al subir el archivo al servidor!
                            </div>
                        `);
                    }else{
                        if(response==302){    
                            $("#msg-ajax-result-edt").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Se produjo un error con la base de datos!
                                </div>
                            `);
                        }else{
                            $("#msg-ajax-result-edt").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    `+response+`
                                </div>
                            `);
                        }
                    }     
                }
                       
            },
            timeout: 30000,
            error: function(xhr, status){
                $('.btn_modals-edt').prop('disabled', false);
                $("#msg-ajax-result-edt").html(`
                                            <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                                Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                            </div>
                `);      
            }
        });
    }

    
    buscarUserCaja(){
        $.ajax({
            url: "../backend/panel/cajas/ajax_buscar_cajero.php",
            type: "GET",
            success: function(response){
                var datos = JSON.parse(response);
        
                if(datos!="" && datos!=null){
                    $("#caja_resp").removeClass("is-invalid");
                    $("#caja_resp").addClass("is-valid");
                    $("#caja_resp-hidden").val(datos[0].idcajero);
                    $("#caja_resp").val(datos[0].nombre + " " + datos[0].apellido_pat + " " + datos[0].apellido_mat);
                }else{
                    $("#caja_resp").removeClass("is-valid");
                    $("#caja_resp").addClass("is-invalid");
                }
            }
        });
    }
    buscarFechaHora(){
        $.ajax({
            url: "../backend/panel/solicitud_fecha_hora.php",
            type: "GET",
            success: function(response){
                var datos = JSON.parse(response);
                $('#caja_fecha').val(datos[0].fecha);
                $('#caja_hora').val(datos[0].hora);
            }
        });
    }
    buscarCajas(){
        $.ajax({
            url: "../backend/panel/cajas/ajax_buscar_cajas.php",
            type: "GET",
            success: function(response){
                var datos = JSON.parse(response);
                var ajax_cont = `<option value="" selected disabled>--Seleccionar--</option>`;
              
                $("#movimiento_caja").html("");

                datos.forEach( datos => {
                    ajax_cont += `
                                <option value="${datos.idcaja}">${datos.nombre}</option>
                    `;
                });

                $("#movimiento_caja").html(ajax_cont);

            }
        });
    }

    habilitar(id,operacion){
        $.ajax({
            url: "../backend/panel/cajas/crear/ajax_habilitar.php",
            type: "POST",
            data: {id: id, operacion:operacion},
            beforeSend: function(){
                $('.btn_modals-edt').prop('disabled', true);
                $("#msg-ajax-result-edt").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result-edt").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        setTimeout(()=>{
                            caja.listarCajas();
                            $('#modal-add-edt').modal('hide');
                            $('.btn_modals-edt').prop('disabled', false);
                            caja.idEdit = 0;
                            setTimeout(()=>{$("#msg-ajax-result-edt").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result-edt").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals-edt').prop('disabled', false);
                    $("#msg-ajax-result-edt").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    apertura(id,operacion){
        $.ajax({
            url: "../backend/panel/cajas/aperturas/ajax_aperturar.php",
            type: "POST",
            data: {
                idcaja: id, 
                operacion:operacion, 
                idusuario: $("#caja_resp-hidden").val(),
                monto: $("#caja_capital").val()
            },
            beforeSend: function(){
                $('.btn_modals').prop('disabled', true);
                $("#msg-ajax-result").html(`
                    <div style="">
                        <div class="spinner-border text-info" role="status" style="position:relative;left:50%;float:left;">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                `); 
            },
            success: function(response){
                    //console.log(response);
                    if(response==200){                      
                        $("#msg-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Se completo la operación!
                            </div>
                        `);
                        caja.listarAperturas();
                        setTimeout(()=>{
                            $('#modal-add').modal('hide');
                            $('.btn_modals').prop('disabled', false);
                            setTimeout(()=>{$("#msg-ajax-result").html("");},700);
                        },700);
                    }else{
                        $("#msg-ajax-result").html(`
                                    <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                        `+response+`
                                    </div>
                        `);
                    }   
                },
                timeout: 30000,
                error: function(xhr, status){
                    $('.btn_modals').prop('disabled', false);
                    $("#msg-ajax-result").html(`
                                <div class="alert alert-danger" role="alert"  style="margin-bottom: 10px;">
                                    Disculpe, existió un problema - `+xhr.status+` `+xhr.statusText+`
                                </div>
                    `);
                    
                }
        });
    }

    voucher(id){
        $("#voucher-datos01").html("");
        $('#modal-ticket').modal('show'); 
        
        $.ajax({
            url: "../backend/panel/cajas/movimientos/ajax_voucher.php",
            type: "GET",
            data: {consulta: "editar", id: id},
            success: function(response){
                var datos = JSON.parse(response);
                //console.log(datos[0]);
                
                $("#voucher-titulo").html(`VOUCHER DE ${datos[0].tipo_mov}`);
                $("#voucher-datos01").html(`
                    <tr>
                        <td>FECHA:</td>
                        <td>:</td>
                        <td>${datos[0].fecha_mov}</td>
                    </tr>
                    <tr>
                        <td>DIRECCION:</td>
                        <td>:</td>
                        <td>Jr. Parra del Riego 585</td>
                    </tr>
             
                    <tr>
                        <td>TIPO DE MOVIMIENTO:</td>
                        <td>:</td>
                        <td>${datos[0].tipo_mov}</td>
                    </tr>
                    <tr>
                        <td>MONTO:</td>
                        <td>:</td>
                        <td>S/. ${datos[0].monto}</td>
                    </tr>
                    <tr>
                        <td>CONCEPTO:</td>
                        <td>:</td>
                        <td>${datos[0].concepto}</td>
                    </tr>
                    
                    <tr>
                        <td>CAJA:</td>
                        <td>:</td>
                        <td>${datos[0].caja_nombre}</td>
                    </tr>
                   
                    <tr>
                        <td>CAJERO:</td>
                        <td>:</td>
                        <td>${datos[0].usu_nombre + " " + datos[0].usu_apellido_pat + " " + datos[0].usu_apellido_mat}</td>
                    </tr>
                `);

                $("#voucher-datos02").html(`
                   
                `);

            }
        });
    }
}



var solicitud_monto;
var solicitud_cuotas;
var solicitud_frecuencia;
var solicitud_interes;
var solicitud_inicio;

var interes_cuota_final;


var datalist_id_cliente;
var datalist_id_producto;
var datalist_id_proveedor
;

var user;
var cliente;
var producto;
var proveedor;
var caja;
var venta;





$(document).ready(()=>{

    setInterval(()=>{
        var menuY = $("body")[0].offsetHeight;
        var screemY = window.innerHeight;
        var Yheader = $("header").height();
        
        if(menuY<screemY){
            $(".menu_nav").css("height", screemY-Yheader);
        }else{
            $(".menu_nav").css("height", menuY-Yheader);
        }
        
        
    },200);

    

    user = new Usuario();
    cliente = new Cliente();
    producto = new Producto();
    caja = new Caja();
    proveedor = new Proveedor();
    venta = new Venta();

    user.listar();
    cliente.listar();

    producto.listar();
    producto.listarCategorias();
    producto.listarSubCategorias();

    proveedor.listar();
    proveedor.listarCategorias();
    proveedor.listarSubCategorias();

    venta.listarCotizaciones();
    venta.listarVentas();

    caja.listarCajas();
    caja.listarAperturas();
    caja.listarMovimientos(0);




    $("#inputCLIENT").change(()=>{
        datalist_id_cliente = $("#clientes option[value='" + $('#inputCLIENT').val() + "']").attr('data-id');
        $("#inputCLIENT-hidden").val(datalist_id_cliente);

        if($("#inputCLIENT-hidden").val()==""){
            $("#inputCLIENT").removeClass("is-valid");
            $("#inputCLIENT").addClass("is-invalid");

            $("#inputDOC").val('');
            $("#inputDOCNRO").val('');
            $("#inputDIR").val('');
            $("#inputTEL").val('');
            $("#inputEMAIL").val('');

        }else{
            $("#inputCLIENT").removeClass("is-invalid");
            $("#inputCLIENT").addClass("is-valid");
            venta.buscarCliente_autocomplete(datalist_id_cliente);
        }
    });


    $("#inputPROV1").change(()=>{
        datalist_id_proveedor = $("#proveedores1 option[value='" + $('#inputPROV1').val() + "']").attr('data-id');
        $("#inputPROV1-hidden").val(datalist_id_proveedor);

        if($("#inputPROV1-hidden").val()==""){
            $("#inputPROV1").removeClass("is-valid");
            $("#inputPROV1").addClass("is-invalid");
        }else{
            $("#inputPROV1").removeClass("is-invalid");
            $("#inputPROV1").addClass("is-valid");
        }
    });
    $("#inputPROV2").change(()=>{
        datalist_id_proveedor = $("#proveedores2 option[value='" + $('#inputPROV2').val() + "']").attr('data-id');
        $("#inputPROV2-hidden").val(datalist_id_proveedor);

        if($("#inputPROV2-hidden").val()==""){
            $("#inputPROV2").removeClass("is-valid");
            $("#inputPROV2").addClass("is-invalid");
        }else{
            $("#inputPROV2").removeClass("is-invalid");
            $("#inputPROV2").addClass("is-valid");
        }
    });
    $("#inputPROV3").change(()=>{
        datalist_id_proveedor = $("#proveedores3 option[value='" + $('#inputPROV3').val() + "']").attr('data-id');
        $("#inputPROV3-hidden").val(datalist_id_proveedor);

        if($("#inputPROV3-hidden").val()==""){
            $("#inputPROV3").removeClass("is-valid");
            $("#inputPROV3").addClass("is-invalid");
        }else{
            $("#inputPROV3").removeClass("is-invalid");
            $("#inputPROV3").addClass("is-valid");
        }
    });

    
    $("input[name='inputCOT']").change(()=>{
        if($("input[name='inputCOT']:checked").val()=="SI"){
            document.getElementById("formulario-ventas").reset(); 
            $("#inputUSER").removeClass("is-valid");
            $("#inputUSER").removeClass("is-invalid");
            $("#inputCLIENT").removeClass("is-valid");
            $("#inputCLIENT").removeClass("is-invalid");

            $("#inputNRO_COT").removeAttr("readonly");
            $("#inputNRO_COT").attr("required","required");
            $("#inputCLIENT").attr("readonly","readonly");
            $("#inputENTREGA").attr("readonly","readonly");
            $("#inputCOMPROBANTE").attr("readonly","readonly");
        }else{

            $("#inputNRO_COT").val('');
            $("#inputUSER-hidden").val('');
            $("#inputCLIENT-hidden").val('');   
            $("#inputUSER").val('');
            $("#inputCLIENT").val('');   
            $("#inputENTREGA").val('');  
            $("#inputCOMPROBANTE").val('');  
            
            $("#inputDOC").val('');
            $("#inputDOCNRO").val('');
            $("#inputDIR").val('');
            $("#inputTEL").val('');
            $("#inputEMAIL").val('');
           
            $("#cot_IGV").val('');

            $("#cot_CANT1").val('');
            $("#cot_PROD1").val('');
            $("#cot_PROD1-hidden").val('');
            $("#cot_PU1").val('');
            $("#cot_PC1").val('');
            $("#cot_PM1").val('');
            $("#cot_ST1").val('');
                    
            $("#cot_CANT2").val('');
            $("#cot_PROD2").val('');
            $("#cot_PROD2-hidden").val('');
            $("#cot_PU2").val('');
            $("#cot_PC2").val('');
            $("#cot_PM2").val('');
            $("#cot_ST2").val('');           

            $("#cot_CANT3").val('');
            $("#cot_PROD3").val('');
            $("#cot_PROD3-hidden").val('');
            $("#cot_PU3").val('');
            $("#cot_PC3").val('');
            $("#cot_PM3").val('');
            $("#cot_ST3").val('');         

            $("#cot_CANT4").val('');
            $("#cot_PROD4").val('');
            $("#cot_PROD4-hidden").val('');
            $("#cot_PU4").val('');
            $("#cot_PC4").val('');
            $("#cot_PM4").val('');
            $("#cot_ST4").val('');

            $("#cot_CANT5").val('');
            $("#cot_PROD5").val('');
            $("#cot_PROD5-hidden").val('');
            $("#cot_PU5").val('');
            $("#cot_PC5").val('');
            $("#cot_PM5").val('');
            $("#cot_ST5").val('');
        
            $("#cot_SUBTOTAL").val('');
            $("#cot_TOTAL").val('');
            
            
            $("#inputUSER").removeClass("is-valid");
            $("#inputUSER").removeClass("is-invalid");
            $("#inputCLIENT").removeClass("is-valid");
            $("#inputCLIENT").removeClass("is-invalid");

            $("#cot_PROD1").removeClass("is-valid");
            $("#cot_PROD1").removeClass("is-invalid");
            $("#cot_PROD2").removeClass("is-valid");
            $("#cot_PROD2").removeClass("is-invalid");
            $("#cot_PROD3").removeClass("is-valid");
            $("#cot_PROD3").removeClass("is-invalid");
            $("#cot_PROD4").removeClass("is-valid");
            $("#cot_PROD4").removeClass("is-invalid");
            $("#cot_PROD5").removeClass("is-valid");
            $("#cot_PROD5").removeClass("is-invalid");
            $("#cot_PROD1").prop('required',false);
            $("#cot_CANT1").prop('required',false);
            $("#cot_STOCK1").prop('required',false);
            $("#cot_PU1").prop('required',false);
            $("#cot_PC1").prop('required',false);
            $("#cot_PM1").prop('required',false);
            $("#cot_PROD2").prop('required',false);
            $("#cot_CANT2").prop('required',false);
            $("#cot_STOCK2").prop('required',false);
            $("#cot_PU2").prop('required',false);
            $("#cot_PC2").prop('required',false);
            $("#cot_PM2").prop('required',false);
            $("#cot_PROD3").prop('required',false);
            $("#cot_CANT3").prop('required',false);
            $("#cot_STOCK3").prop('required',false);
            $("#cot_PU3").prop('required',false);
            $("#cot_PC3").prop('required',false);
            $("#cot_PM3").prop('required',false);
            $("#cot_PROD4").prop('required',false);
            $("#cot_CANT4").prop('required',false);
            $("#cot_STOCK4").prop('required',false);
            $("#cot_PU4").prop('required',false);
            $("#cot_PC4").prop('required',false);
            $("#cot_PM4").prop('required',false);
            $("#cot_PROD5").prop('required',false);
            $("#cot_CANT5").prop('required',false);
            $("#cot_STOCK5").prop('required',false);
            $("#cot_PU5").prop('required',false);
            $("#cot_PC5").prop('required',false);
            $("#cot_PM5").prop('required',false);

            $("#inputNRO_COT").removeAttr("required");
            $("#inputNRO_COT").attr("readonly","readonly");
            $("#inputCLIENT").removeAttr("readonly");
            $("#inputCLIENT").prop('required',true);
            $("#inputENTREGA").removeAttr("readonly");
            $("#inputENTREGA").prop('required',true);
            $("#inputCOMPROBANTE").removeAttr("readonly");
            $("#inputCOMPROBANTE").prop('required',true);
            $("#cot_IGV").val(0);
            venta.buscarUsuario();

        }
    });

   




    $("#cot_PROD1").change(()=>{
        datalist_id_producto = $("#ls_prod1 option[value='" + $('#cot_PROD1').val() + "']").attr('data-id');
        $("#cot_PROD1-hidden").val(datalist_id_producto);
        if($("#cot_PROD1-hidden").val()==""){
            $("#cot_PROD1").prop('required',false);
            $("#cot_CANT1").prop('required',false);
            $("#cot_STOCK1").prop('required',false);
            $("#cot_PU1").prop('required',false);
            $("#cot_PC1").prop('required',false);
            $("#cot_PM1").prop('required',false);
            $("#cot_PROD1").removeClass("is-valid");
            $("#cot_PROD1").addClass("is-invalid");
            $("#cot_STOCK1").val('');
            $("#cot_PU1").val('');
            $("#cot_PC1").val('');
            $("#cot_PM1").val('');
            $("#cot_ST1").val('');
            venta.calcularTotal(1);
        }else{
            $("#cot_PROD1").prop('required',true);
            $("#cot_CANT1").prop('required',true);
            $("#cot_STOCK1").prop('required',true);
            $("#cot_PU1").prop('required',true);
            $("#cot_PC1").prop('required',true);
            $("#cot_PM1").prop('required',true);
            $("#cot_PROD1").removeClass("is-invalid");
            $("#cot_PROD1").addClass("is-valid");
            venta.buscarProducto_autocomplete(datalist_id_producto,1);
        }
    });
    $("#cot_PROD2").change(()=>{
        datalist_id_producto = $("#ls_prod2 option[value='" + $('#cot_PROD2').val() + "']").attr('data-id');
        $("#cot_PROD2-hidden").val(datalist_id_producto);
        if($("#cot_PROD2-hidden").val()==""){
            $("#cot_PROD2").prop('required',false);
            $("#cot_CANT2").prop('required',false);
            $("#cot_STOCK2").prop('required',false);
            $("#cot_PU2").prop('required',false);
            $("#cot_PC2").prop('required',false);
            $("#cot_PM2").prop('required',false);
            $("#cot_PROD2").removeClass("is-valid");
            $("#cot_PROD2").addClass("is-invalid");
            $("#cot_STOCK2").val('');
            $("#cot_PU2").val('');
            $("#cot_PC2").val('');
            $("#cot_PM2").val('');
            $("#cot_ST2").val('');
            venta.calcularTotal(2);
        }else{
            $("#cot_PROD2").prop('required',true);
            $("#cot_CANT2").prop('required',true);
            $("#cot_STOCK2").prop('required',true);
            $("#cot_PU2").prop('required',true);
            $("#cot_PC2").prop('required',true);
            $("#cot_PM2").prop('required',true);
            $("#cot_PROD2").removeClass("is-invalid");
            $("#cot_PROD2").addClass("is-valid");
            venta.buscarProducto_autocomplete(datalist_id_producto,2);
        }
    });
    $("#cot_PROD3").change(()=>{
        datalist_id_producto = $("#ls_prod3 option[value='" + $('#cot_PROD3').val() + "']").attr('data-id');
        $("#cot_PROD3-hidden").val(datalist_id_producto);
        if($("#cot_PROD3-hidden").val()==""){
            $("#cot_PROD3").prop('required',false);
            $("#cot_CANT3").prop('required',false);
            $("#cot_STOCK3").prop('required',false);
            $("#cot_PU3").prop('required',false);
            $("#cot_PC3").prop('required',false);
            $("#cot_PM3").prop('required',false);
            $("#cot_PROD3").removeClass("is-valid");
            $("#cot_PROD3").addClass("is-invalid");
            $("#cot_STOCK3").val('');
            $("#cot_PU3").val('');
            $("#cot_PC3").val('');
            $("#cot_PM3").val('');
            $("#cot_ST3").val('');
            venta.calcularTotal(3);
        }else{
            $("#cot_PROD3").prop('required',true);
            $("#cot_CANT3").prop('required',true);
            $("#cot_STOCK3").prop('required',true);
            $("#cot_PU3").prop('required',true);
            $("#cot_PC3").prop('required',true);
            $("#cot_PM3").prop('required',true);
            $("#cot_PROD3").removeClass("is-invalid");
            $("#cot_PROD3").addClass("is-valid");
            venta.buscarProducto_autocomplete(datalist_id_producto,3);
        }
    });
    $("#cot_PROD4").change(()=>{
        datalist_id_producto = $("#ls_prod4 option[value='" + $('#cot_PROD4').val() + "']").attr('data-id');
        $("#cot_PROD4-hidden").val(datalist_id_producto);
        if($("#cot_PROD4-hidden").val()==""){
            $("#cot_PROD4").prop('required',false);
            $("#cot_CANT4").prop('required',false);
            $("#cot_STOCK4").prop('required',false);
            $("#cot_PU4").prop('required',false);
            $("#cot_PC4").prop('required',false);
            $("#cot_PM4").prop('required',false);
            $("#cot_PROD4").removeClass("is-valid");
            $("#cot_PROD4").addClass("is-invalid");
            $("#cot_STOCK4").val('');
            $("#cot_PU4").val('');
            $("#cot_PC4").val('');
            $("#cot_PM4").val('');
            $("#cot_ST4").val('');
            venta.calcularTotal(4);
        }else{
            $("#cot_PROD4").prop('required',true);
            $("#cot_CANT4").prop('required',true);
            $("#cot_STOCK4").prop('required',true);
            $("#cot_PU4").prop('required',true);
            $("#cot_PC4").prop('required',true);
            $("#cot_PM4").prop('required',true);
            $("#cot_PROD4").removeClass("is-invalid");
            $("#cot_PROD4").addClass("is-valid");
            venta.buscarProducto_autocomplete(datalist_id_producto,4);
        }
    });
    $("#cot_PROD5").change(()=>{
        datalist_id_producto = $("#ls_prod5 option[value='" + $('#cot_PROD5').val() + "']").attr('data-id');
        $("#cot_PROD5-hidden").val(datalist_id_producto);
        if($("#cot_PROD5-hidden").val()==""){
            $("#cot_PROD5").prop('required',false);
            $("#cot_CANT5").prop('required',false);
            $("#cot_STOCK5").prop('required',false);
            $("#cot_PU5").prop('required',false);
            $("#cot_PC5").prop('required',false);
            $("#cot_PM5").prop('required',false);
            $("#cot_PROD5").removeClass("is-valid");
            $("#cot_PROD5").addClass("is-invalid");
            $("#cot_STOCK5").val('');
            $("#cot_PU5").val('');
            $("#cot_PC5").val('');
            $("#cot_PM5").val('');
            $("#cot_ST5").val('');
            venta.calcularTotal(5);
        }else{
            $("#cot_PROD5").prop('required',true);
            $("#cot_CANT5").prop('required',true);
            $("#cot_STOCK5").prop('required',true);
            $("#cot_PU5").prop('required',true);
            $("#cot_PC5").prop('required',true);
            $("#cot_PM5").prop('required',true);
            $("#cot_PROD5").removeClass("is-invalid");
            $("#cot_PROD5").addClass("is-valid");
            venta.buscarProducto_autocomplete(datalist_id_producto,5);
        }
    });






    $('#formulario-pass').on('submit', function (event) {
        event.preventDefault();

        if($("#inputPass01").val()==$("#inputPass02").val()){
            $("#pass-ajax-result").html("<p>Cargando...</p>");
            user.changePASS();  
        }else{
            $("#pass-ajax-result").html(`
                            <div class="alert alert-warning" role="alert"  style="margin-bottom: 10px;">
                                Las contraseñas no coinciden.
                            </div>
            `);
        }
    }); 



    $('#formulario-email').on('submit', function (event) {
        event.preventDefault();

        const get_email = $("#correo_post").val();
        const get_tipo = $("#correo_post").attr('data-tipo');

        emailDiv('print-cotizacion',get_tipo,get_email);
  
    });

    $('#formulario-usuarios').on('submit', function (event) {
        event.preventDefault();
        user.formulario = new FormData(this);
        switch(user.metodo){
            case 1: user.registrar(); break;
            case 2: user.editarSave(user.idEdit); break;
        }     
    });
    $('#formulario-clientes').on('submit', function (event) {
        event.preventDefault();
        cliente.formulario = new FormData(this);
        switch(cliente.metodo){
            case 1: cliente.registrar(); break;
            case 2: cliente.editarSave(cliente.idEdit); break;
        }     
    });

    $('#formulario-productos_cat').on('submit', function (event) {
        event.preventDefault();
        producto.formulario = new FormData(this);
        switch(producto.metodo){
            case 1: producto.registrarCategorias(); break;
            case 2: producto.editarSaveCategorias(producto.idEdit); break;
        }     
    });
    $('#formulario-productos_subcat').on('submit', function (event) {
        event.preventDefault();
        producto.formulario = new FormData(this);
        switch(producto.metodo){
            case 1: producto.registrarSubCategorias(); break;
            case 2: producto.editarSaveSubCategorias(producto.idEdit); break;
        }     
    });
    $('#formulario-productos').on('submit', function (event) {
        event.preventDefault();
        producto.formulario = new FormData(this);
        switch(producto.metodo){
            case 1: producto.registrar(); break;
            case 2: producto.editarSave(producto.idEdit); break;
        }     
    });
    $('#formulario-procesos').on('submit', function (event) {
        event.preventDefault();
        producto.formulario = new FormData(this);
        producto.registrarProcesos(producto.idEdit);   
    });
    $('#formulario-proveedores_cat').on('submit', function (event) {
        event.preventDefault();
        proveedor.formulario = new FormData(this);
        switch(proveedor.metodo){
            case 1: proveedor.registrarCategorias(); break;
            case 2: proveedor.editarSaveCategorias(proveedor.idEdit); break;
        }     
    });
    $('#formulario-proveedores_subcat').on('submit', function (event) {
        event.preventDefault();
        proveedor.formulario = new FormData(this);
        switch(proveedor.metodo){
            case 1: proveedor.registrarSubCategorias(); break;
            case 2: proveedor.editarSaveSubCategorias(proveedor.idEdit); break;
        }     
    });
    $('#formulario-proveedores').on('submit', function (event) {
        event.preventDefault();
        proveedor.formulario = new FormData(this);
        switch(proveedor.metodo){
            case 1: proveedor.registrar(); break;
            case 2: proveedor.editarSave(proveedor.idEdit); break;
        }     
    });
    $('#formulario-cotizaciones').on('submit', function (event) {
        event.preventDefault();
        venta.formulario = new FormData(this);
        switch(venta.metodo){
            case 1: venta.registrarCotizaciones(); break;
            case 2: venta.editarSaveCotizaciones(venta.idEdit); break;
        }     
    });
    $('#formulario-ventas').on('submit', function (event) {
        event.preventDefault();
        venta.formulario = new FormData(this);
        switch(venta.metodo){
            case 1: venta.registrarVentas(); break;
            case 2: venta.completarVenta(venta.idEdit); break;
        }     
    });

  
    $('#formulario-caja').on('submit', function (event) {
        event.preventDefault();
        caja.formulario = new FormData(this);
        switch(caja.metodo){
            case 1: caja.crearCaja(); break;
            case 2: caja.editarSaveCaja(caja.idEdit); break;
        }     
    });
    $('#formulario-caja-edt').on('submit', function (event) {
        event.preventDefault();
        caja.formulario = new FormData(this);
        switch(caja.metodo){
            case 1: caja.crearCaja(); break;
            case 2: caja.editarSaveCaja(caja.idEdit); break;
        }     
    });
    $('#formulario-movimientos').on('submit', function (event) {
        event.preventDefault();
        caja.formulario = new FormData(this);
        switch(caja.metodo){
            case 1: caja.registrarMovimiento(); break;
            //case 2: caja.editarSaveCaja(caja.idEdit); break;
        }     
    });




    user.btn_img = document.getElementById('inputIMG');
    user.btn_img.addEventListener('change', (event) => {
        user.editURLimg = 1;
    });

    cliente.btn_img = document.getElementById('inputIMG');
    cliente.btn_img.addEventListener('change', (event) => {
        cliente.editURLimg = 1;
    });

    producto.btn_img = document.getElementById('inputIMG');
    producto.btn_img.addEventListener('change', (event) => {
        producto.editURLimg = 1;
    });



}); 
  







function btn_add(modulo){
    switch(modulo){
        case "usuarios":    $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-usuarios").reset(); 
                            $("#modal-add h4").html("Nuevo Usuario"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            $(".modal-btn-cont").css("display","none");
                            $("#load_foto_modal").html(`<img src="img/user.png" width="100%">`); 
                            user.idEdit = 0;
                            user.metodo = 1; 
                            user.editURLimg = 0;
                            break;

        case "clientes":    $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-clientes").reset(); 
                            $("#modal-add h4").html("REGISTRAR CLIENTE"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            $("#load_foto_modal").html(`<img src="img/user.png" width="100%">`); 
                            cliente.idEdit = 0;
                            cliente.metodo = 1; 
                            cliente.editURLimg = 0; 
                            break;

        case "producto_categoria":
                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-productos_cat").reset(); 
                            $("#modal-add h4").html("NUEVA CATEGORIA DE PRODUCTOS"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            producto.idEdit = 0;
                            producto.metodo = 1; 
                            producto.editURLimg = 0; 
                            break;

        case "producto_subcategoria":
                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-productos_subcat").reset(); 
                            $("#modal-add h4").html("NUEVA SUB-CATEGORIA DE PRODUCTOS"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html(""); 
                            producto.idEdit = 0;
                            producto.metodo = 1; 
                            producto.editURLimg = 0; 
                            break;

        case "productos":
                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            $("#nav-procesos-tab").addClass("disabled");
                            document.getElementById("formulario-productos").reset(); 
                            $("#modal-add h4").html("NUEVO PRODUCTO"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            $("#inputPROV1").removeClass("is-valid");
                            $("#inputPROV1").removeClass("is-invalid");
                            $("#inputPROV2").removeClass("is-valid");
                            $("#inputPROV2").removeClass("is-invalid");
                            $("#inputPROV3").removeClass("is-valid");
                            $("#inputPROV3").removeClass("is-invalid");
                            $("#load_foto_modal").html(`<img src="../img/producto.png" width="100%">`); 
                            producto.idEdit = 0;
                            producto.metodo = 1; 
                            producto.editURLimg = 0; 
                            break;

        case "procesos":
                            document.getElementById("formulario-procesos").reset(); 
                            $("#procesos-ajax-result").html(""); 
                            break;

        case "proveedor_categoria":
                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-proveedores_cat").reset(); 
                                $("#modal-add h4").html("NUEVA CATEGORIA DE PROVEEDORES"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html("");
                                proveedor.idEdit = 0;
                                proveedor.metodo = 1; 
                                break;
    
        case "proveedor_subcategoria":
                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-proveedores_subcat").reset(); 
                                $("#modal-add h4").html("NUEVA SUB-CATEGORIA DE PROVEEDORES"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html(""); 
                                proveedor.idEdit = 0;
                                proveedor.metodo = 1; 
                                break;
    
        case "proveedores":
                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-proveedores").reset(); 
                                $("#modal-add h4").html("NUEVO PROVEEDOR"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html("");
                                proveedor.idEdit = 0;
                                proveedor.metodo = 1; 
                                break;

        case "cotizacion":
                                $("#inputUSER").removeClass("is-valid");
                                $("#inputUSER").removeClass("is-invalid");
                                $("#inputCLIENT").removeClass("is-valid");
                                $("#inputCLIENT").removeClass("is-invalid");

                                $("#cot_PROD1").removeClass("is-valid");
                                $("#cot_PROD1").removeClass("is-invalid");
                                $("#cot_PROD2").removeClass("is-valid");
                                $("#cot_PROD2").removeClass("is-invalid");
                                $("#cot_PROD3").removeClass("is-valid");
                                $("#cot_PROD3").removeClass("is-invalid");
                                $("#cot_PROD4").removeClass("is-valid");
                                $("#cot_PROD4").removeClass("is-invalid");
                                $("#cot_PROD5").removeClass("is-valid");
                                $("#cot_PROD5").removeClass("is-invalid");
                                $("#cot_PROD1").prop('required',false);
                                $("#cot_CANT1").prop('required',false);
                                $("#cot_STOCK1").prop('required',false);
                                $("#cot_PU1").prop('required',false);
                                $("#cot_PC1").prop('required',false);
                                $("#cot_PM1").prop('required',false);
                                $("#cot_PROD2").prop('required',false);
                                $("#cot_CANT2").prop('required',false);
                                $("#cot_STOCK2").prop('required',false);
                                $("#cot_PU2").prop('required',false);
                                $("#cot_PC2").prop('required',false);
                                $("#cot_PM2").prop('required',false);
                                $("#cot_PROD3").prop('required',false);
                                $("#cot_CANT3").prop('required',false);
                                $("#cot_STOCK3").prop('required',false);
                                $("#cot_PU3").prop('required',false);
                                $("#cot_PC3").prop('required',false);
                                $("#cot_PM3").prop('required',false);
                                $("#cot_PROD4").prop('required',false);
                                $("#cot_CANT4").prop('required',false);
                                $("#cot_STOCK4").prop('required',false);
                                $("#cot_PU4").prop('required',false);
                                $("#cot_PC4").prop('required',false);
                                $("#cot_PM4").prop('required',false);
                                $("#cot_PROD5").prop('required',false);
                                $("#cot_CANT5").prop('required',false);
                                $("#cot_STOCK5").prop('required',false);
                                $("#cot_PU5").prop('required',false);
                                $("#cot_PC5").prop('required',false);
                                $("#cot_PM5").prop('required',false);

                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-cotizaciones").reset(); 
                                $("#modal-add h4").html("NUEVA COTIZACIÓN"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html("");
                                venta.idEdit = 0;
                                venta.metodo = 1; 
                                venta.buscarUsuario();
                                $("#cot_IGV").val(0)
                                break;


        case "venta":
                                $("#inputUSER").removeClass("is-valid");
                                $("#inputUSER").removeClass("is-invalid");
                                $("#inputCLIENT").removeClass("is-valid");
                                $("#inputCLIENT").removeClass("is-invalid");

                                $("#cot_PROD1").removeClass("is-valid");
                                $("#cot_PROD1").removeClass("is-invalid");
                                $("#cot_PROD2").removeClass("is-valid");
                                $("#cot_PROD2").removeClass("is-invalid");
                                $("#cot_PROD3").removeClass("is-valid");
                                $("#cot_PROD3").removeClass("is-invalid");
                                $("#cot_PROD4").removeClass("is-valid");
                                $("#cot_PROD4").removeClass("is-invalid");
                                $("#cot_PROD5").removeClass("is-valid");
                                $("#cot_PROD5").removeClass("is-invalid");
                                $("#cot_PROD1").prop('required',false);
                                $("#cot_CANT1").prop('required',false);
                                $("#cot_STOCK1").prop('required',false);
                                $("#cot_PU1").prop('required',false);
                                $("#cot_PC1").prop('required',false);
                                $("#cot_PM1").prop('required',false);
                                $("#cot_PROD2").prop('required',false);
                                $("#cot_CANT2").prop('required',false);
                                $("#cot_STOCK2").prop('required',false);
                                $("#cot_PU2").prop('required',false);
                                $("#cot_PC2").prop('required',false);
                                $("#cot_PM2").prop('required',false);
                                $("#cot_PROD3").prop('required',false);
                                $("#cot_CANT3").prop('required',false);
                                $("#cot_STOCK3").prop('required',false);
                                $("#cot_PU3").prop('required',false);
                                $("#cot_PC3").prop('required',false);
                                $("#cot_PM3").prop('required',false);
                                $("#cot_PROD4").prop('required',false);
                                $("#cot_CANT4").prop('required',false);
                                $("#cot_STOCK4").prop('required',false);
                                $("#cot_PU4").prop('required',false);
                                $("#cot_PC4").prop('required',false);
                                $("#cot_PM4").prop('required',false);
                                $("#cot_PROD5").prop('required',false);
                                $("#cot_CANT5").prop('required',false);
                                $("#cot_STOCK5").prop('required',false);
                                $("#cot_PU5").prop('required',false);
                                $("#cot_PC5").prop('required',false);
                                $("#cot_PM5").prop('required',false);

                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-ventas").reset(); 
                                $("#modal-add h4").html("NUEVA VENTA"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html("");

                                $("#inputNRO_COT").removeAttr("readonly");
                                $("#inputNRO_COT").attr("required","required");
                                $("#inputCLIENT").attr("readonly","readonly");
                                $("#inputENTREGA").attr("readonly","readonly");
                                $("#inputCOMPROBANTE").attr("readonly","readonly");
                                
                                $(".buscar_cot").css("display","flex");
                                $("#inputNRO_COT").attr("required","required");
                                $("#reg_venta").css("display","block");
                                $(".vent_block").removeAttr("readonly");

                                $("#cot_tipo_pago1").prop("disabled",false);
                                $("#cot_tipo_pago2").prop("disabled",true);

                                venta.idEdit = 0;
                                venta.metodo = 1; 
                                caja.buscarCajas();
                                venta.buscarUsuario();
                                $("#cot_IGV").val(0);
                                break;
    }
}

function btn_edit(modulo,id){
    switch(modulo){
        case "usuarios":    $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            $(".modal-btn-cont").css("display","block");
                            user.metodo = 2; 
                            user.idEdit = id; 
                            user.editURLimg = 0;
                            user.editar(id); 
                            break;

        case "clientes":    $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            cliente.metodo = 2; 
                            cliente.idEdit = id; 
                            cliente.editURLimg = 0;
                            cliente.editar(id); 
                            break;

        case "productos":
                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            $("#nav-procesos-tab").removeClass("disabled");
                            document.getElementById("formulario-productos").reset(); 
                            $("#modal-add h4").html("MODIFICAR PRODUCTO"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            $("#inputPROV1").removeClass("is-valid");
                            $("#inputPROV1").removeClass("is-invalid");
                            $("#inputPROV2").removeClass("is-valid");
                            $("#inputPROV2").removeClass("is-invalid");
                            $("#inputPROV3").removeClass("is-valid");
                            $("#inputPROV3").removeClass("is-invalid");
                            $("#load_foto_modal").html(`<img src="../img/producto.png" width="100%">`); 
                            producto.idEdit = id;
                            producto.metodo = 2; 
                            producto.editURLimg = 0;
                            producto.editar(id); 
                            break;

        case "proveedores":
                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-proveedores").reset(); 
                            $("#modal-add h4").html("MODIFICAR PROVEEDOR"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            proveedor.idEdit = id;
                            proveedor.metodo = 2; 
                            proveedor.editar(id); 
                            break;

        case "proveedores_buscar":
                                $(".nav-item").removeClass("active");
                                $("#nav-general-tab").addClass("active");
                                $(".tab-pane").removeClass("active show");
                                $("#nav-general").addClass("active show");
                                document.getElementById("formulario-proveedores_buscar").reset(); 
                                $("#modal-add h4").html("DETALLES DEL PROVEEDOR"); 
                                $("#msg-ajax-result").html(""); 
                                $(".modal-btn-cont").html("");
                                proveedor.idEdit = id;
                                proveedor.metodo = 2; 
                                proveedor.editar_buscar(id); 
                                break;
        
        case "cotizaciones":
                            $("#inputUSER").removeClass("is-valid");
                            $("#inputUSER").removeClass("is-invalid");
                            $("#inputCLIENT").removeClass("is-valid");
                            $("#inputCLIENT").removeClass("is-invalid");

                            $("#cot_PROD1").removeClass("is-valid");
                            $("#cot_PROD1").removeClass("is-invalid");
                            $("#cot_PROD2").removeClass("is-valid");
                            $("#cot_PROD2").removeClass("is-invalid");
                            $("#cot_PROD3").removeClass("is-valid");
                            $("#cot_PROD3").removeClass("is-invalid");
                            $("#cot_PROD4").removeClass("is-valid");
                            $("#cot_PROD4").removeClass("is-invalid");
                            $("#cot_PROD5").removeClass("is-valid");
                            $("#cot_PROD5").removeClass("is-invalid");
                            $("#cot_PROD1").prop('required',false);
                            $("#cot_CANT1").prop('required',false);
                            $("#cot_STOCK1").prop('required',false);
                            $("#cot_PU1").prop('required',false);
                            $("#cot_PC1").prop('required',false);
                            $("#cot_PM1").prop('required',false);
                            $("#cot_PROD2").prop('required',false);
                            $("#cot_CANT2").prop('required',false);
                            $("#cot_STOCK2").prop('required',false);
                            $("#cot_PU2").prop('required',false);
                            $("#cot_PC2").prop('required',false);
                            $("#cot_PM2").prop('required',false);
                            $("#cot_PROD3").prop('required',false);
                            $("#cot_CANT3").prop('required',false);
                            $("#cot_STOCK3").prop('required',false);
                            $("#cot_PU3").prop('required',false);
                            $("#cot_PC3").prop('required',false);
                            $("#cot_PM3").prop('required',false);
                            $("#cot_PROD4").prop('required',false);
                            $("#cot_CANT4").prop('required',false);
                            $("#cot_STOCK4").prop('required',false);
                            $("#cot_PU4").prop('required',false);
                            $("#cot_PC4").prop('required',false);
                            $("#cot_PM4").prop('required',false);
                            $("#cot_PROD5").prop('required',false);
                            $("#cot_CANT5").prop('required',false);
                            $("#cot_STOCK5").prop('required',false);
                            $("#cot_PU5").prop('required',false);
                            $("#cot_PC5").prop('required',false);
                            $("#cot_PM5").prop('required',false);

                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-cotizaciones").reset(); 
                            $("#modal-add h4").html("DETALLES DE LA COTIZACIÓN"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");
                            venta.idEdit = id;
                            venta.metodo = 2; 
                            
                            venta.editarCotizaciones(id);
                            break;


        case "ventas":
                            $("#inputUSER").removeClass("is-valid");
                            $("#inputUSER").removeClass("is-invalid");
                            $("#inputCLIENT").removeClass("is-valid");
                            $("#inputCLIENT").removeClass("is-invalid");

                            $("#cot_PROD1").removeClass("is-valid");
                            $("#cot_PROD1").removeClass("is-invalid");
                            $("#cot_PROD2").removeClass("is-valid");
                            $("#cot_PROD2").removeClass("is-invalid");
                            $("#cot_PROD3").removeClass("is-valid");
                            $("#cot_PROD3").removeClass("is-invalid");
                            $("#cot_PROD4").removeClass("is-valid");
                            $("#cot_PROD4").removeClass("is-invalid");
                            $("#cot_PROD5").removeClass("is-valid");
                            $("#cot_PROD5").removeClass("is-invalid");
                            $("#cot_PROD1").prop('required',false);
                            $("#cot_CANT1").prop('required',false);
                            $("#cot_STOCK1").prop('required',false);
                            $("#cot_PU1").prop('required',false);
                            $("#cot_PC1").prop('required',false);
                            $("#cot_PM1").prop('required',false);
                            $("#cot_PROD2").prop('required',false);
                            $("#cot_CANT2").prop('required',false);
                            $("#cot_STOCK2").prop('required',false);
                            $("#cot_PU2").prop('required',false);
                            $("#cot_PC2").prop('required',false);
                            $("#cot_PM2").prop('required',false);
                            $("#cot_PROD3").prop('required',false);
                            $("#cot_CANT3").prop('required',false);
                            $("#cot_STOCK3").prop('required',false);
                            $("#cot_PU3").prop('required',false);
                            $("#cot_PC3").prop('required',false);
                            $("#cot_PM3").prop('required',false);
                            $("#cot_PROD4").prop('required',false);
                            $("#cot_CANT4").prop('required',false);
                            $("#cot_STOCK4").prop('required',false);
                            $("#cot_PU4").prop('required',false);
                            $("#cot_PC4").prop('required',false);
                            $("#cot_PM4").prop('required',false);
                            $("#cot_PROD5").prop('required',false);
                            $("#cot_CANT5").prop('required',false);
                            $("#cot_STOCK5").prop('required',false);
                            $("#cot_PU5").prop('required',false);
                            $("#cot_PC5").prop('required',false);
                            $("#cot_PM5").prop('required',false);

                            $(".nav-item").removeClass("active");
                            $("#nav-general-tab").addClass("active");
                            $(".tab-pane").removeClass("active show");
                            $("#nav-general").addClass("active show");
                            document.getElementById("formulario-ventas").reset(); 
                            $("#modal-add h4").html("DETALLES DE VENTA"); 
                            $("#msg-ajax-result").html(""); 
                            $(".modal-btn-cont").html("");

                            $("#inputNRO_COT").removeAttr("readonly");
                            $("#inputNRO_COT").attr("required","required");
                            $("#inputCLIENT").attr("readonly","readonly");
                            $("#inputENTREGA").attr("readonly","readonly");
                            $("#inputCOMPROBANTE").attr("readonly","readonly");

                            $("#inputNRO_COT").removeAttr("required");
                            $(".buscar_cot").css("display","none");
                            $("#reg_venta").css("display","none");
                            $(".vent_block").attr("readonly","readonly");

                            venta.idEdit = id;
                            venta.metodo = 2; 
                            caja.buscarCajas();
                            venta.editarVentas(id);
                            break;
    }
}












function btn_add_caja(modulo){
    switch(modulo){
        case "CREAR":
                        document.getElementById("formulario-caja").reset(); 
                        $("#modal-add h4").html("Nueva Caja"); 
                        $("#msg-ajax-result").html(""); 
                        caja.metodo = 1;
                        break;

        case "APERTURA":


        case "MOVIMIENTOS":
    }
}

function btn_edt_caja(id,modulo){
    switch(modulo){
        case "CREAR":
                        document.getElementById("formulario-caja-edt").reset(); 
                        $("#modal-add-edt h4").html("Modificar Caja"); 
                        $("#msg-ajax-result-edt").html(""); 
                        $(".modal-btn-cont-edt").html("");
                        caja.metodo = 2;
                        caja.idEdit = id;
                        caja.editCaja(id);
                        break;

        case "APERTURA":
                        document.getElementById("formulario-apertura").reset(); 
                        $("#modal-add h4").html("Aperturar Caja"); 
                        $("#msg-ajax-result").html(""); 
                        $("#monto_tipo").text("Monto de Apertura*");
                        caja.metodo = 0;
                        caja.idEdit = id;
                        caja.buscarFechaHora();
                        caja.buscarUserCaja();
                        caja.editApertura(id);
                        break;

        case "CIERRE":
                        document.getElementById("formulario-apertura").reset(); 
                        $("#modal-add h4").html("Cerrar Caja"); 
                        $("#msg-ajax-result").html("");
                        $("#monto_tipo").text("Monto de Cierre*"); 
                        caja.metodo = 0;
                        caja.idEdit = id;
                        caja.buscarFechaHora();
                        caja.buscarUserCaja();
                        caja.editApertura(id);
                        break;
    }
}

function btn_add_movimientos(){
    document.getElementById("formulario-movimientos").reset(); 
    $("#modal-add h4").html("Registrar Movimiento de Caja"); 
    $("#msg-ajax-result").html("");
    $("#modal-add").modal("show");
    caja.metodo = 1;
    caja.buscarFechaHora();
    caja.buscarCajas();
    caja.buscarUserCaja();
}

function btn_movimientos_print(modulo,id){
    switch(modulo){
        case "voucher": caja.voucher(id);
                        break;
    }
}






function printDiv(nombreDiv) {
    
    var contenido = document.getElementById(nombreDiv).innerHTML;
    
    /*
    var contenidoOriginal= document.body.innerHTML;
    document.body.innerHTML = contenido;
    window.print();
    document.body.innerHTML = contenidoOriginal;
    */


    // data es el HTML a imprimir (el contenido del elemento)
    var pw = window.open('', 'my div', 'height=700,width=1100');
    pw.document.write('<html><head>');
    pw.document.write('<link rel="stylesheet" href="../css/bootstrap.css"></link>');
    pw.document.write('<link rel="stylesheet" href="../css/print.css"></link>');
    
    pw.document.write('</head><body>');
    pw.document.write(contenido);
    pw.document.write('</body></html>');
    pw.document.close();
    pw.focus();
    pw.onload = function() {
        pw.print();
        setTimeout(()=>{pw.close()},1000);
    };

    return true;
    
}           


/*
function printDivDownload(nombreDiv) {

    var contenido = document.getElementById(nombreDiv).innerHTML;
    
    
    var pw = window.open('', 'my div', 'height=700,width=1100');
    pw.document.write('<html><head>');
    pw.document.write('<link rel="stylesheet" href="../css/bootstrap.css"></link>');
    pw.document.write('<link rel="stylesheet" href="../css/print.css"></link>');
    pw.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js" integrity="sha512-s/XK4vYVXTGeUSv4bRPOuxSDmDlTedEpMEcAQk0t/FMd9V6ft8iXdwSBxV0eD60c6w/tjotSlKu9J2AAW1ckTA==" crossorigin="anonymous"></script>');
    pw.document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>');
    pw.document.write('</head><body>');
    pw.document.write(contenido);
    pw.document.write(`
                <script>
                    var content_html2 = document.body;
                    var content_div2 = document.querySelector("body");

                    var divHeight = content_div2.scrollHeight;
                    var divWidth = content_div2.scrollWidth;

                    var ratio = divHeight / divWidth;
                    
                    html2canvas(content_html2,{
                        allowTaint: true,
                        backgroundColor: "#ffffff",
                        height: divHeight,
                        width: divWidth,
                        onrendered:function(canvas){    
                            var a = document.createElement('a');
                            a.href = canvas.toDataURL("image/png");
                            a.download = 'file.png';
                            a.click();
                            //window.close();
                            
                            var img = canvas.toDataURL("image/png");

                            if(divWidth > divHeight){
                                var mh = divWidth;
                                var mv = divHeight + divHeight*ratio;
                            }else{
                                var mh = divWidth;
                                var mv = divHeight;
                            }
                            

                            var doc = new jsPDF('p','pt',[mh,mv]);
                            doc.addImage(img, 'JPEG', 0, 0, divWidth, divHeight);
                           
                            doc.save('test.pdf');

                            //window.close();
                        }
                    });
                </script>
    `);
    pw.document.write('</body></html>');
    pw.document.close();
    pw.focus();
    pw.onload = function() {
        //pw.print();
        //pw.close();
    };

    return true;
    
}          
*/


function emailDiv(nombreDiv,tipo,correo){
    console.clear();
    $("#modal-add-print-top").scrollTop(0); 

    //printDivDownload('print-cotizacion');

    var content_html = $("#"+nombreDiv);  
    var content_div = $("#"+nombreDiv); 

    var divHeight = content_div.outerHeight();
    var divWidth = content_div.outerWidth();
    var ratio = divHeight / divWidth;

    
    html2canvas(content_html,{
        allowTaint: true,
        backgroundColor: "#ffffff",
        height: divHeight*2,
        width: divWidth*2,
        onrendered:function(canvas){
            /*
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/png");
            a.download = 'file.png';
            a.click();
            */

            var img = canvas.toDataURL("image/png");
            
            /*
            if(divWidth > divHeight){
                var mh = divWidth;
                var mv = divHeight + divHeight*ratio;
            }else{
                var mh = divWidth;
                var mv = divHeight;
            }
            var doc = new jsPDF('p','pt',[mh,mv]);
            doc.addImage(img, 'JPEG', 0, 0, divWidth, divHeight);
            //doc.save('test.pdf');
            */

            var form_img = new FormData();
            form_img.append("destinatario",correo);
            form_img.append("img",img); 
            form_img.append("x",divWidth); 
            form_img.append("y",divHeight); 
            form_img.append("tipo",tipo);
            form_img.append("nro",venta.activo);


            $.ajax({
                method: 'POST',
                url: '../backend/panel/ventas/cotizaciones/ajax_enviar_correo.php',
                data: form_img,
                contentType: false,
                cache: false,
                processData:false,
                beforeSend: function(){ 
                    console.log('Enviando...')
                    $('.btn_actions_cot').prop('disabled', true);
                    $('.btn_actions_email').html(`
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                    `); 
                    $(".modal_head_loading").html(`
                        <div class="spinner-border text-secondary spinner-border-sm mt-3 ml-2" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    `); 
                    
                },
                success: function(response){ 
                    console.log(response)
                    $('.btn_actions_email').html(`<i class="fas fa-envelope"></i> Enviar por Correo`); 
                    $(".modal_head_loading").html(``); 
                    if(response=="200"){
                        $("#msg-ajax-result-email").html(`
                            <div class="alert alert-success" role="alert">
                                Correo enviado.
                            </div>
                        `);
                        setTimeout(()=>{
                            $('.btn_actions_cot').prop('disabled', false);  
                            $('#modal-add-email').modal('hide');
                            $("#msg-ajax-result-email").html(``);

                        },700);
                        
                    }else{
                        $('.btn_actions_cot').prop('disabled', false);  
                        $("#msg-ajax-result-email").html(`
                            <div class="alert alert-danger" role="alert">
                                No se puedo enviar el correo.
                            </div>
                        `);
                    }
                },
                timeout: 20000,
                error: function(xhr, status){
                    console.log(xhr + " " + status)
                    $('.btn_actions_cot').prop('disabled', false);
                    $('.btn_actions_email').html(`<i class="fas fa-envelope"></i> Enviar por Correo`); 
                    $(".modal_head_loading").html(``);
                    $("#msg-ajax-result-email").html(`
                        <div class="alert alert-danger" role="alert">
                            No se puedo enviar el correo.
                        </div>
                    `);
                }
            });

            
        }
    });
    
    
   

    
}

function downloadDiv(nombreDiv,tipo){
    console.clear();
    //$("#modal-add-print").scrollTop(0); 
    $("#modal-add-print-top").scrollTop(0); 

    var content_html = $("#"+nombreDiv); 
    var content_div = $("#"+nombreDiv);

    var divHeight = content_div.outerHeight();
    var divWidth = content_div.outerWidth();
    var ratio = divHeight / divWidth;

    $('.btn_actions_cot').prop('disabled', true);
    $(".modal_head_loading").html(`
        <div class="spinner-border text-secondary spinner-border-sm mt-3 ml-2" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    `); 

    html2canvas(content_html,{
        allowTaint: true,
        backgroundColor: "#ffffff",
        height: divHeight*2,
        width: divWidth*2,
        onrendered:function(canvas){
            /*
            var a = document.createElement('a');
            a.href = canvas.toDataURL("image/png");
            a.download = 'file.png';
            a.click();
            */

            var img = canvas.toDataURL("image/png");
            
            if(divWidth > divHeight){
                var mh = divWidth;
                var mv = divHeight + divHeight*ratio;
            }else{
                var mh = divWidth;
                var mv = divHeight;
            }
            var doc = new jsPDF('p','pt',[mh,mv]);
            doc.addImage(img, 'JPEG', 0, 0, divWidth, divHeight);

            if(tipo=="cotizacion"){
                doc.save('Cotizacion_n'+venta.activo+'.pdf');
            }else{
                doc.save('Venta_n'+venta.activo+'.pdf');
            }
            

            $('.btn_actions_cot').prop('disabled', false);
            $(".modal_head_loading").html(``); 
        }
    });
    
}





// Closure
(function() {
    /**
     * Ajuste decimal de un número.
     *
     * @param {String}  type  El tipo de ajuste.
     * @param {Number}  value El número.
     * @param {Integer} exp   El exponente (El logaritmo de ajuste en base 10).
     * @returns {Number} El valor ajustado.
     */
    function decimalAdjust(type, value, exp) {
      // Si exp es undefined o cero...
      if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
      }
      value = +value;
      exp = +exp;
      // Si el valor no es un número o exp no es un entero...
      if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
      }
      // Shift
      value = value.toString().split('e');
      value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
      // Shift back
      value = value.toString().split('e');
      return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }
  
    // Decimal round
    if (!Math.round10) {
      Math.round10 = function(value, exp) {
        return decimalAdjust('round', value, exp);
      };
    }
    // Decimal floor
    if (!Math.floor10) {
      Math.floor10 = function(value, exp) {
        return decimalAdjust('floor', value, exp);
      };
    }
    // Decimal ceil
    if (!Math.ceil10) {
      Math.ceil10 = function(value, exp) {
        return decimalAdjust('ceil', value, exp);
      };
    }
})();


























function ajax_load_DE(id){
    $.ajax({
        url: "backend/panel/ajax_de.php",
        type: "GET",
        data: {id: id},
        success: function(response){
            var direccionEJ = JSON.parse(response);
            var contenido_ajax = "";
        
            direccionEJ.forEach( direccionEJ => {
                
                contenido_ajax += `
                        <option value="${direccionEJ.id}">${direccionEJ.direccion}</option>
                    `;
            
            });

            $("#direccionEjecutiva").html(contenido_ajax);
            $("#direccionEjecutiva").attr("disabled",false);                 
        }
    });
}







