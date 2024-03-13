
export function getDayAndTime(): [number, number, boolean] {
    const now = new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" });
    let dayOfWeek = new Date(now).getDay(); // Lunedi = 1, Domenica = 7
    
    const hour = new Date(now).getHours();
    const minutes = new Date(now).getMinutes();
    
    let timeSlot = 1;
    let itIsNow: boolean;
    
 
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {

        itIsNow = true;
        
        if (hour > 0 && hour < 8) {
            timeSlot = 1;
        } else if (hour === 8 && minutes >= 0 || hour === 8 && minutes <= 55) {
            timeSlot = 1;
        } else if (hour === 8 && minutes >= 56 || hour === 9 && minutes <= 50) {
            timeSlot = 2;
        } else if (hour === 9 && minutes >= 51 || hour === 10 && minutes <= 50) {
            timeSlot = 3;
        } else if (hour === 10 && minutes >= 51 || hour === 11 && minutes <= 45) {
            timeSlot = 4;
        } else if (hour === 11 && minutes >= 46 || hour === 12 && minutes <= 35) {
            timeSlot = 5;
        } else if (hour === 12 && minutes >= 36 || hour === 13 && minutes <= 35) {
            timeSlot = 6;
        } else if (hour === 13 && minutes >= 36 || hour === 14 && minutes <= 30) {
            timeSlot = 7
        } else if (dayOfWeek != 5) {  //se non è venerdi  
            timeSlot = 1;    // se stai fuori dall'orario scolastico ti da la prima ora del giorno successivo
            dayOfWeek = dayOfWeek + 1;
            itIsNow = false;
        } else {    
            dayOfWeek = 1;
            timeSlot = 1;
            itIsNow = false;
        }
    }

    else {
        dayOfWeek = 1;
        timeSlot = 1;
        itIsNow = false;
    }

    
    return [timeSlot, dayOfWeek, itIsNow];

}
