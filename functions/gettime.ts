export function getDayAndTime(): [number, number] {
    const now = new Date();
    let dayOfWeek = now.getDay(); // Lunedi = 1, Domenica = 7
    const hour = now.getHours();
    const minutes = now.getMinutes();

    let timeSlot = 1;
 
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const timeSlots = [
            { start: 8 * 60, end: 9 * 60 + 55 },
            { start: 9 * 60 + 56, end: 10 * 60 + 50 },
            { start: 10 * 60 + 51, end: 11 * 60 + 50 },
            { start: 11 * 60 + 51, end: 12 * 60 + 45 },
            { start: 12 * 60 + 46, end: 13 * 60 + 35 },
            { start: 13 * 60 + 36, end: 14 * 60 + 30 },
        ];

        const currentTime = hour * 60 + minutes;

        for (let i = 0; i < timeSlots.length; i++) {
            if (currentTime >= timeSlots[i].start && currentTime <= timeSlots[i].end) {
                timeSlot = i + 1;
                break;
            }
        }

        if (timeSlot === 1) {
            dayOfWeek = dayOfWeek % 7 + 1;
        }
    } else {
        dayOfWeek = 1;
        timeSlot = 1;
    }

    return [timeSlot, dayOfWeek];
}