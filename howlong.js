var targettime = 492; /* (8 hours 12 minutes) */
var dailyworktime = 0;
var work = false;
var last;
var cur = $('#applicationIframe').contents().find('.current-time').text();
var currenttime = Number.parseInt(cur[0])*60 + Number.parseInt(cur[1]);
console.log("Current time is "+cur+" "+currenttime);
var leavetime;

$('#applicationIframe').contents().find('.time-input input').not('.readonly').each(function(index) {
    var timestampS = $(this).attr("data_rawvalue");
    var timestamp = Number.parseInt(timestampS);

    if (work == true) {
        dailyworktime += timestamp - last;
    }
    else {
        last = timestamp;
        var timeleft = targettime - dailyworktime;
        console.log("Time left "+timeleft);
        var hours = Math.floor((timestamp + timeleft) / 60);
        var minutes = (timestamp + timeleft) % 60;
        leavetime = hours+":"+minutes;
   }

    console.log("Found "+timestamp+" work "+work+" time "+dailyworktime);
    work = !work
});

if (!(leavetime === undefined)) {
	window.alert("You can leave at "+leavetime);
}
