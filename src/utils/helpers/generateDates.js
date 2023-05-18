export const generateDates = range => {
  let Dates = [];

  // generate dates 2 weeks from now along with the day on that date
  for (let i = 0; i < range; i++) {
    let date = new Date();
    date.setDate(date.getDate() + i);
    let day = date.getDay();
    let dayName = '';
    switch (day) {
      case 0:
        dayName = 'Sunday';
        break;
      case 1:
        dayName = 'Monday';
        break;
      case 2:
        dayName = 'Tuesday';
        break;
      case 3:
        dayName = 'Wednesday';
        break;
      case 4:
        dayName = 'Thursday';
        break;
      case 5:
        dayName = 'Friday';
        break;
      case 6:
        dayName = 'Saturday';
        break;
    }
    Dates.push({
      date: date,
      day: dayName,
      month: getMonthName(date.getMonth()),
      isSelected: false,
    });
  }
  return Dates;
};

export const getMonthName = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let date = new Date();
  let month = date.getMonth();
  return monthNames[month];
};
