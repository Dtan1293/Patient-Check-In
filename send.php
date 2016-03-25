<?php
	require_once 'swiftmailer/lib/swift_required.php'; //require necessary php file

	$provider = htmlspecialchars($_POST["provider_email"]);
	$patient_name = htmlspecialchars($_POST["patient"]);

	$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
	  ->setUsername('dtan1293@gmail.com') //gmail account information
	  ->setPassword('Enginner4life'); //

	$mailer = Swift_Mailer::newInstance($transport);

	$message = Swift_Message::newInstance('New Patient Check in!')
	  ->setFrom(array('Dtan1293@gmail.com'))
	  ->setTo(array($provider)) //used to keep on adding email address
	  ->setBody($patient_name, 'text/html');
	$result = $mailer->send($message);
	echo("Done sending the email!");
?>
