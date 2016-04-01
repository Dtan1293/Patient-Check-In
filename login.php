<?php
	$username = htmlspecialchars($_POST["username"]);
	$password = htmlspecialchars($_POST["password"]);
	if($username == "ilya_frid" || $username == "dtan1293") {
		if($password == "12345") {
			echo "true";
			session_start();
			$_SESSION["login_special_password"] = "2f435014eb763632c946476923ce49cf";
			return;
		}
	}
	echo "false";
?>