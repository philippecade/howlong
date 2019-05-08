function main() {
	var targettime = 492; /* (8 hours 12 minutes) */
	var dailyworktime = 0;
	var work = false;
	var last;
	var leavetime;
	var iterationCount = 0;

	$('#applicationIframe').contents().find('.time-input input').not('.readonly').each(function(index) {
		var timestampS = $(this).attr("data_rawvalue");
		var timestamp = Number.parseInt(timestampS);

		if (work == true) {
			dailyworktime += timestamp - last;
		}
		else {
			last = timestamp;
			var timeleft = targettime - dailyworktime;
			if (iterationCount == 0) {
				timeleft += 30; // add mandatory break
			}
			console.log("Time left "+timeleft);
			var hours = Math.floor((timestamp + timeleft) / 60);
			var minutes = (timestamp + timeleft) % 60;
			leavetime = hours+":"+pad(minutes);
		}

		console.log("Found "+timestamp+" work "+work+" time "+dailyworktime);
		console.log("\titerationCount "+iterationCount);
		work = !work;
		iterationCount++;
	});

	if (!(leavetime === undefined)) {
		var message = "You can leave at "+leavetime;
		if (iterationCount == 1) {
			message += ", this includes a mandatory 30 minute break.";
		}
		window.alert(message);
	}
}

/**
 * Pads the given number with one zero if necessary to display minutes
 * correctly
 */
function pad(num) { 
	return ('00' + num).substr(-2); 
}

main()
