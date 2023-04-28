export function getTimeIntervals(start, end) {
  // Convert start and end times to Date objects
  var startTime = new Date('1970-01-01T' + start + ':00Z');
  var endTime = new Date('1970-01-01T' + end + ':00Z');

  // Initialize arrays to store morning and evening time intervals
  var morningIntervals = [];
  var eveningIntervals = [];

  // Loop through time range in 30-minute increments
  var interval = 30 * 60 * 1000; // 30 minutes in milliseconds
  for (var i = startTime.getTime(); i < endTime.getTime(); i += interval) {
    // Format time interval as string
    var startInterval = new Date(i);
    var endInterval = new Date(i + interval);
    var startIntervalStr = formatTime(startInterval);
    var endIntervalStr = formatTime(endInterval);
    var intervalStr = startIntervalStr + ' - ' + endIntervalStr;

    // Add time interval to morning or evening array
    if (
      startInterval.getHours() - 5 >= 0 &&
      startInterval.getHours() - 5 < 12
    ) {
      morningIntervals.push({
        time: intervalStr,
        isSelected: false,
        interval: 'morning',
      });
    } else {
      eveningIntervals.push({
        time: intervalStr,
        isSelected: false,
        interval: 'evening',
      });
    }
  }

  // Combine morning and evening intervals into final array
  //   var intervals = [];
  //   if (morningIntervals.length > 0) {
  //     intervals.push('Morning:');
  //     intervals = intervals.concat(morningIntervals);
  //   }
  //   if (eveningIntervals.length > 0) {
  //     intervals.push('Evening:');
  //     intervals = intervals.concat(eveningIntervals);
  //   }
  // const intervals = {
  //   morning: morningIntervals,
  //   evening: eveningIntervals,
  // };
  const intervals = {
    times: [...morningIntervals, ...eveningIntervals],
    morningCount: morningIntervals.length,
    eveningCount: eveningIntervals.length,
  };

  return intervals;
}

// Helper function to format time as string in 24-hour time format
function formatTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  hours = hours - 5;

  if (hours < 0) {
    hours += 12;
  }

  hours = hours < 10 ? '0' + hours : hours; // Add leading zero for single-digit hours

  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes;
  return strTime;
}
