import { DateTime } from 'luxon';


export function getDayAndTime(): [number, number, boolean] {
    const now = DateTime.now().setZone('Europe/Rome');
    let dayOfWeek: number = now.weekday; // Domenica = 0, Sabato = 6
    
    console.log("day of week is " + dayOfWeek)

    const hour: number = now.hour;
    // const hour = 17;
    const minutes: number = now.minute;
    
    
    let timeSlot: number = 1;

    let itIsNow: boolean = true;
 
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (hour > 0 && hour < 8) {
            timeSlot = 1;
            console.log("case 1");
        } else if (hour === 8 && minutes >= 0 || hour === 8 && minutes <= 55) {
            timeSlot = 1;
            console.log("case 2");
        } else if (hour === 8 && minutes >= 56 || hour === 9 && minutes <= 50) {
            timeSlot = 2;
            console.log("case 3");
        } else if (hour === 9 && minutes >= 51 || hour === 10 && minutes <= 50) {
            timeSlot = 3;
            console.log("case 4");
        } else if (hour === 10 && minutes >= 51 || hour === 11 && minutes <= 45) {
            timeSlot = 4;
            console.log("case 5");
        } else if (hour === 11 && minutes >= 46 || hour === 12 && minutes <= 35) {
            timeSlot = 5;
            console.log("case 6");
        } else if (hour === 12 && minutes >= 36 || hour === 13 && minutes <= 35) {
            timeSlot = 6;
            console.log("case 7");
        } else if (hour === 13 && minutes >= 36 || hour === 14 && minutes <= 30) {
            timeSlot = 7
            console.log("case 8");
        } else if (hour > 14 && minutes > 30) {  //se non è venerdi  
            console.log("case 9");
            timeSlot = 1;    // se stai fuori dall'orario scolastico ti da la prima ora del giorno successivo
            dayOfWeek = dayOfWeek + 1;
            itIsNow = false;
            
        } 
        else if (dayOfWeek > 5) {    
            dayOfWeek = 1;
            timeSlot = 1;
            itIsNow = false;
            console.log("case 10");
        }
        
    }

    else {
        dayOfWeek = 1;
        timeSlot = 1;
        itIsNow = false;
        console.log("case 11");
    }

    
    return [timeSlot, dayOfWeek, itIsNow];

}
