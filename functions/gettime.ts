export function getDayAndTime(): [number, number] {
    const now = new Date();
    let dayOfWeek = now.getDay(); // Lunedi = 1, Domenica = 7
    
    const hour = now.getHours();
    const minutes = now.getMinutes();
    

    let timeSlot = 1;

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (hour === 8 && minutes >= 0 || hour === 9 && minutes <= 55) {
            timeSlot = 1;
        } else if (hour === 9 && minutes >= 56 || hour === 10 && minutes <= 50) {
            timeSlot = 2;
        } else if (hour === 10 && minutes >= 51 || hour === 11 && minutes <= 50) {
            timeSlot = 3;
        } else if (hour === 11 && minutes >= 51 || hour === 12 && minutes <= 45) {
            timeSlot = 4;
        } else if (hour === 12 && minutes >= 46 || hour === 13 && minutes <= 35) {
            timeSlot = 5;
        } else if (hour === 13 && minutes >= 36 || hour === 14 && minutes <= 30) {
            timeSlot = 6;
        } else {
            timeSlot = 1;
            dayOfWeek = dayOfWeek % 7 + 1;
        }
    }
    else {
        dayOfWeek = 1;
        timeSlot = 1;
    }

    return [timeSlot, dayOfWeek];
}
