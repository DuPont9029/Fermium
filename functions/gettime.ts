import { DateTime } from 'luxon';
import { debug } from '../src/types/debug';
export function getDayAndTime(): [number, number, boolean, debug] {
    const now = DateTime.now().setZone('Europe/Rome');
    let dayOfWeek: number = now.weekday; // Domenica = 0, Sabato = 6
    
    console.log("day of week is " + dayOfWeek)
    const hour: number = now.hour;
   
    const minutes: number = now.minute;
    let debug = "error";
    
    
    let timeSlot: number = 1;
    let itIsNow: boolean = true;
 
    
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            if (hour >= 0 && hour < 8) {
                timeSlot = 1;
                debug = "case 1: 0-8";
                itIsNow = false;
            } else if (hour === 8 && minutes >= 0 || hour === 8 && minutes <= 55) {
                timeSlot = 1;
                debug = "case 2: 8:00-8:55";
            } else if (hour === 8 && minutes >= 56 || hour === 9 && minutes <= 50) {
                timeSlot = 2;
                debug = "case 3: 8:56-9:50";
            } else if (hour === 9 && minutes >= 51 || hour === 10 && minutes <= 50) {
                timeSlot = 3;
                debug = "case 4: 9:51-10:50";
            } else if (hour === 10 && minutes >= 51 || hour === 11 && minutes <= 45) {
                timeSlot = 4;
                debug = "case 5: 10:51-11:45";
            } else if (hour === 11 && minutes >= 46 || hour === 12 && minutes <= 35) {
                timeSlot = 5;
                debug = "case 6: 11:46-12:35";
            } else if (hour === 12 && minutes >= 36 || hour === 13 && minutes <= 35) {
                timeSlot = 6;
                debug = "case 7: 12:36-13:35";
            } else if (hour === 13 && minutes >= 36 || hour === 14 && minutes <= 30) {
                timeSlot = 7
                debug = "case 8: 13:36-14:30";
            } else if (hour > 14 || (hour === 14 && minutes > 30) && dayOfWeek < 5)  {  // if it's not Friday
                debug = "case 9: > 14:30 BUT IN THE WEEK";
                timeSlot = 1;    // if you're outside school hours, it gives you the first hour of the next day
                dayOfWeek = dayOfWeek + 1; // set to next day
                itIsNow = false;
            } else if (hour > 14 || (hour === 14 && minutes > 30) && dayOfWeek === 5) {  // if it's Friday
                debug = "case 10: > 14:30 ON FRIDAY";
                timeSlot = 1;    // if you're outside school hours, it gives you the first hour of the next day
                dayOfWeek = 1;  // set to Monday
                itIsNow = false;
            }
        } else if (dayOfWeek > 5) {    
            dayOfWeek = 1;
            timeSlot = 1;
            itIsNow = false;
            debug = "case 11: OUTSIDE THE WEEK";
        }
        
        
    else {
        dayOfWeek = 1;
        timeSlot = 1;
        itIsNow = false;
        debug = "case 11: EDGE CASE?";
    }
    
    return [timeSlot, dayOfWeek, itIsNow, debug];
}