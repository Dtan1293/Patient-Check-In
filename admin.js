$(function() { //wait for the DOM to be ready!
	var ref = new Firebase("https://medicallogin2193.firebaseio.com/patients");

	// Attach an asynchronous callback to read the data at our posts reference
	var count = 0;
	ref.on("child_added", function(data) {
		var patient_name = data.child("patient").val();
		var check_in_time = data.child("CheckIn").val();
		var provider = data.child("Provider").val();
		var reason = data.child("Reason").val();
		$("#patient_names").append("<li id=\"" + count + "\" class=\"patients\">" + patient_name + "</li>");
		//$("li").append("<ul class=\"patient_information\">");
		//$(".patient_information")
		count++;
	});
});