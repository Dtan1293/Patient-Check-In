$(function() {
	$(document).ready(function() {
		$("#submit_button").click(function() {
			clicked();

		});
		function clicked() {

			//grab patient's name, get rid of extra spaces
			var patient_name = $("#name").val().trim();

			//grab the current time so patient doesn't have to enter it
			var d = new Date();

			//switched to 12 hour instead of 24!
			var hours;
			var AM_PM = " AM";
			if(d.getHours() > 12) {
				hours = d.getHours() - 12;
				AM_PM = " PM";
			} else {
				hours = d.getHours();
			}

			var time = hours + ":" + d.getMinutes() + ":" + d.getSeconds() + AM_PM;

			//grab provider radio button:
			var provider = $( "input:radio[name=Provider]:checked" ).val();

			//grab the reason for visit radio button:
			var reason_for_visit = $( "input:radio[name=RFV]:checked" ).val();
			//storing information on the database!
			var ref = new Firebase("https://medicallogin2193.firebaseio.com/");
			var usersRef = ref.child("patients");
			var newPatients = usersRef.push(); //how do you tell when data has been successfu lly transferred?
			newPatients.set({
			 	patient: patient_name,
			 	CheckIn: time,
			 	Provider: provider,
			 	Reason: reason_for_visit
			});
			alert("Done! Please press Ok to complete your check-in");

			$.post( 
			  "send.php",
			  { 
			  	provider_email: "Dtan1293@gmail.com",
			  	patient: patient_name 
			  })
			.done(function( data ) {
				window.setTimeout(function(){ window.location.reload(true); },1000);
			});
		}
	});
});