$(function() {
	$("#submit").click(function() {
		var username = $("input[name='username']").val();
		var password = $("input[name='password']").val();

		if(username.length == 0) {
			alert("Please enter a username!");
			return;
		} 

		if(password.length == 0) {
			alert("Please enter a password!");
			return;
		}

		$.post( 
			  "login.php",
			  { 
			  	username: username,
			  	password: password 
			  })
			.done(function( data ) {
				console.log(data);
				if(data === "true") {
					window.location.replace("admin.php");
				} else {
					alert("Sorry wrong information entered!");
					location.reload();
				}
			});
		});
	});