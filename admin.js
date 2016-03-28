$(function() { //wait for the DOM to be ready!
	var ref = new Firebase("https://medicallogin2193.firebaseio.com/patients");
	var count = 0;
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("child_added", function(data) {
		var patient_name = data.child("patient").val();
		var check_in_time = data.child("CheckIn").val();
		var provider = data.child("Provider").val();
		var reason = data.child("Reason").val();

		$("#patient_display_information").append("<tr><td>" + patient_name + 
												 "</td><td>" + check_in_time + 
												 "</td><td>" + provider + 
												 "</td><td>" + reason + "</td><td><button id=\"" + count + "\">" +
												 "Checked In</button></td></tr>");
		$("button").one("click", function() {
			alert("Button " + $(this).attr("id"));
		});
		count++;
	});
});