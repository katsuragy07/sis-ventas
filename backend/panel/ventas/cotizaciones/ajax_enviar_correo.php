<?php

    $pdf = $_POST['img'];
    $pdf_x = $_POST['x']/3.779;
    $pdf_y = $_POST['y']/3.779;
    $tipo = $_POST['tipo'];
    $nro = $_POST['nro'];
    $destinatario = $_POST['destinatario'];

   
    //require_once('../../../html2pdf/html2pdf.class.php');
    require '../../../vendor/autoload.php';
    use Spipu\Html2Pdf\Html2Pdf;


    // Declaramos el formato del documento PDF
    $html2pdf = new HTML2PDF('P', array($pdf_x,$pdf_y), 'es', true, 'UTF-8', array(0, 0, 0, 0));
    $html2pdf->pdf->SetDisplayMode('fullpage');
    //$message = '<page><img src="'.$pdf.'"/></page>';
    $message = '<img src="'.$pdf.'"/>';

/*
    ob_start() //starts output buffering
    echo '<img src="'.$pdf.'"/>';
    $stringForPdf = ob_get_contents(); // this now contains the the above string
    ob_end_clean(); // close and clean the output buffer.
    $html2pdf->writeHTML($stringForPdf);
*/

    $html2pdf->writeHTML($message);

/*
    $reshtml2pdf = $html2pdf->Output('Document_gen.pdf', 'D');  
  */

    

    /*
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP ;

    require_once("../../../phpmailer/PHPMailer.php");
    require_once("../../../phpmailer/SMTP.php");

    $mail = new PHPMailer();

    //Usar SMTP     
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'zlantonyhbklz@gmail.com'; //paste one generated by Mailtrap
    $mail->Password = 'ae9a56ed87*'; //paste one generated by Mailtrap
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    

    //Caracteres utf-8
    $mail->CharSet = 'UTF-8';

    //Destinatarios
    $mail->setFrom('zlantonyhbklz@gmail.com', 'Creative E.I.R.L');
    $mail->addReplyTo('zlantonyhbklz@gmail.com', 'Creative E.I.R.L');
    $mail->addAddress($destinatario, $destinatario); 
    
    //Attachments
    if($tipo=="cotizacion"){
        $mail->addStringAttachment($reshtml2pdf, "Cotizacion_n".$nro.".pdf");
    }else{
        $mail->addStringAttachment($reshtml2pdf, "Venta_n".$nro.".pdf");
    }
    
    //$resource = base64_decode(preg_replace('#^data:application/[^;]+;filename=generated.pdf;base64,#', '', $pdf));
    //$resource = base64_decode(str_replace(" ", "+", substr($pdf, strpos($pdf, ","))));
    //$mail->addStringAttachment($resource, "Cotizacion.png");


    //Contenido
    $mail->isHTML(true);
    if($tipo=="cotizacion"){
        $mail->Subject = 'Copia de cotización';
        $mailContent = 'Le adjunto la información de la cotización.';
    }else{
        $mail->Subject = 'Copia de comprobante';
        $mailContent = 'Le adjunto la información del comprobante de venta.';
    }
    
    //$mailContent = '<img src="'.$pdf.'">';
    $mail->Body = $mailContent;

  
    
    if($mail->send()){
        echo '200';
    }else{
        echo 'Message could not be sent.';
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    }
    */

echo "salida mod";





    /*
    $to = "antony_hbk@hotmail.com";
    $asunto = "Cotizacion";
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    //$message = '<img src="'.$pdf.'">';

    $mail = mail($to, $asunto, $message, $headers);

    if($mail){
        echo "200";
    }else{
        echo "500";
    }
    */
    

?>
