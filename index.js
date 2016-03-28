$(function() {
	$(document).ready(function() {
		$("#submit_button").click(function() {
			clicked();
		});
		//helps prevent the form being submitted when ipad return button is pressed!
		$("form").submit(function(event) {
   			document.activeElement.blur();
		});

		//if user clicks anywhere on the website, it will direct towards input id="name"
		$("html").click(function(){
			$("#name").focus();
		});

		function clicked() {
			var patient_submitted_data;

			patient_submitted_data = checkInfo();
			var patient_name = patient_submitted_data[0];
			var provider = patient_submitted_data[1];
			var reason_for_visit = patient_submitted_data[2];

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

			//send out the email!
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

		function checkInfo() {
			var info;
			//grab patient's name, get rid of extra spaces
			var patient_name = $("#name").val().trim();
			if(patient_name.length === 0) {
				alert("Please fill out your full name!");
				return;
			}

			//grab provider radio button:
			var provider;
			if($( "input:radio[name=Provider]:checked" ).length === 0) {
				alert("No provider selected!");
				return;
			} else {
				provider = $( "input:radio[name=Provider]:checked" ).val();
			}

			//grab the reason for visit radio button:
			var reason_for_visit;
			if($( "input:radio[name=RFV]:checked" ).length === 0) {
				alert("Please select reason for visit!");
				return;
			} else {
				reason_for_visit = $( "input:radio[name=RFV]:checked" ).val();
			}
			return info = [patient_name, provider, reason_for_visit];
		}
	});
});