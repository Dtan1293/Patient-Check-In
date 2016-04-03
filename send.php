
<?php
	//It is important to note that when setting up the gmail account, please go into settings
	//and allow any app to access the account. Bascially disable and security checks in order for
	//us to use this code!
	require_once 'swiftmailer/lib/swift_required.php'; //require necessary php file

	$provider = htmlspecialchars($_POST["provider_email"]);
	$patient_name = htmlspecialchars($_POST["patient"]);

	$transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, "ssl")
	  ->setUsername('') //gmail account information
	  ->setPassword(''); //gmail password

	$mailer = Swift_Mailer::newInstance($transport);

	$message = Swift_Message::newInstance('New Patient Check in!')
	  ->setFrom(array('Dtan1293@gmail.com'))
	  ->setTo(array($provider)) //used to keep on adding email address
	  ->setBody($patient_name, 'text/html');	//this is where you would add content to the email!
	$result = $mailer->send($message);
	echo("Done sending the email!");
?>
