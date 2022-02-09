function main() {
    var remainingWorkTime = 492; /* (8 hours 12 minutes) */
    var mandatoryBreakDuration = 30;
    var isFurtherProcessingNeeded = true;
    var isMandatoryBreakFulfilled = false;
    var now = new Date();
    var canLeaveAt;

    $('#applicationIframe').contents().find('.time-interval-wrapper').each(function(index) {

        var timestampFromS = $(this).attr("data_fromtime");
        var timestampFrom = Number.parseInt(timestampFromS);
        var timestampToS = $(this).attr("data_totime");
        // if interval wrapper is not closed, the "data_totime" will be 29952
        if(Number.parseInt(timestampToS) > 24*60){
            timestampToS = getTimeInMins(now);
            console.log('time-interval-wrapper is not closed. Continue as it would be closed now (' + timestampToS + ').');
        }
        var timestampTo = Number.parseInt(timestampToS);
        var diff = timestampTo - timestampFrom;

        var isw = $(this).contents().find('.input-search-wrapper :input.searcher');
        var wrapperType = isw.attr("value"); //Presence / ho / Break/absence / ...

        console.log(wrapperType+': from ' + timestampFrom + '  to ' + timestampTo);

        if(wrapperType == "Break/absence"){
            if(!isMandatoryBreakFulfilled){
                // must have a break which is at least 30 mins long:
                var isLonger = diff >= mandatoryBreakDuration;
                console.log('\tDuration of the break in minutes: ' + diff);
                if(isLonger){
                    console.log('\tMandatory break fulfilled');
                    isMandatoryBreakFulfilled = true;
                }
            }
        } else {
            console.log('In this timeslot you worked for ' + diff + ' minutes.');
            if (isFurtherProcessingNeeded) {
                if(remainingWorkTime - diff < 0) {
                    canLeaveAt = getMinsAsTime(timestampFrom + remainingWorkTime);
                    isFurtherProcessingNeeded = false;
                    console.log('You can go home :)');
                } else {
                    remainingWorkTime -= diff;
                }
            }
        }
    });

    console.log('\n');

    if(canLeaveAt === undefined){
        var nowInMins = getTimeInMins(now);

        if(!isMandatoryBreakFulfilled){
            console.log('There was no at least 30 minutes long break.');
            remainingWorkTime += 30;
        }

        console.log('Remaining working time: ' + getMinsAsTime(remainingWorkTime));

        canLeaveAt = getMinsAsTime(nowInMins + remainingWorkTime);
        console.log('This will be fulfilled at ' + canLeaveAt);
    }


    var message = "You can leave at "+ canLeaveAt;
    if (!isMandatoryBreakFulfilled) {
        message += ", this includes a mandatory 30 minute break.";
    }
    window.alert(message);
}

function getMinsAsTime(mins){
    var hours = Math.floor(mins / 60);
    var minutes = mins % 60;
    return hours+":"+pad(minutes);
}

function getTimeInMins(time){
    return time.getHours() * 60 + time.getMinutes()
}

/**
 * Pads the given number with one zero if necessary to display minutes
 * correctly
 */
function pad(num) { 
    return ('00' + num).substr(-2);
}

main()
