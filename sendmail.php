<?php
     use PHPmailer\PHPmailer\PHPmailer;
     use PHPmailer\PHPmailer\Exception;

     require 'phpmailer/src/Exception.php';
     require 'phpmailer/src/PHPmailer.php';

     $mail = new PHPmailer(true);
     $mail->CharSet = 'UTF-8';
     $mail->setLanguage('ru', 'phpmailer/language/');
     $mail->IsHTML(true);

     // От кого письмо
     $mail->setForm('dockot.mom19.93@gmail.com', 'John Trady');
     // Кому отправить 
     $mail->addAddress('ivan93jaroschuk@gmail.com');
     // Тема письма 
     $mail->Subject = 'Hello, Wolrd!';

     // Назначение формы поля (пол)
     $usergender = 'Male';
     if($_POST['usergender'] == "female"){
        $usergender = "Female";
     }


     // Тела письма 
     $body = '<h1>Test Message</h1>';

     if(trim(!empty($_POST['username']))) {
        $body.='<p><strong>Name:</strong> '.$_POST['username'].'</p>';
     }
     if(trim(!empty($_POST['userpass']))) {
        $body.='<p><strong>Password:</strong> '.$_POST['userpass'].'</p>';
     }
     if(trim(!empty($_POST['useremail']))) {
        $body.='<p><strong>E-mail:</strong> '.$_POST['useremail'].'</p>';
     }
     if(trim(!empty($_POST['usergender']))) {
        $body.='<p><strong>Gender:</strong> '. $usergender.'</p>';
     }
     if(trim(!empty($_POST['color']))) {
        $body.='<p><strong>Color:</strong> '.$_POST['color'].'</p>';
     }
     if(trim(!empty($_POST['_text']))) {
        $body.='<p><strong>Message:</strong> '.$_POST['_text'].'</p>';
     }

     // Прикрипить файл
     if (!empty($_FILES['image']['tmp_name'])) {
        // путь загрузки фала
        $filePath = __DIR__. "/files/". $_FILES['image']['name'];
        // грузим файл
        if(copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body. ='<p><strong>Photo</strong></p>';
            $mail->addAttachment($fileAttach);
        }
     }

     $mail->Body = $body;


     //Отправляем
     if(!$mail->send()) {
        $message = 'Error';
     } else {
        $message = 'Alright!';
     }

     $response = ['message' => $message];

     header('Content-type: application/json');
     echo json_encode($response);
     ?>

    


    

