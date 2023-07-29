
export default function useCalenderArray(prop) {
  const calenderArray = [];
  let days;
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  //calculate days in this month
  const daysInMonth = (month, year) => {
    days = new Date(year, month + 1, 0).getDate();
    return days;
  };
  daysInMonth(month, year);
  //push the days of this monthin calenderArray
  for (let i = 0; i < days; i++) {
    calenderArray.push({
      day: i + 1,
    });
  }
  // populate calender Array with emojis
  if (!prop || prop.length === 0 || prop === null) return calenderArray;
  for (let i = 0; i < prop.length; i++) {
    const myMood = prop[i];
    // console.log(created_at)
    if (!calenderArray[i].emoji) {
      const dt = new Date(prop[0].created_at).getDate();
      const match = calenderArray.find((day) => day.day === dt);
      calenderArray[match.day - 1] = {
        ...calenderArray[match.day - 1],
        emoji: myMood.emoji,
        mood: myMood.mood,
        id: myMood._id,
        month: myMood.month,
        created: myMood.created_at,
      };
    }
  }
  console.log(calenderArray);
  return calenderArray;
}
