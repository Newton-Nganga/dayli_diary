//Declare months 
const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
export default function useCalender(){
    const today = new Date()
    const day = today.getDay()
    const date = today.getDate()
    const month = today.getMonth()
    const year = today.getFullYear()
    return {
        day:dayNames[day],
        date:date,
        month:monthNames[month],
        year:year
    }
}