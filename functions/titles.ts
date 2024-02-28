export function gettitles() {
    const titles: string[] = [
        "Beyond Useless",
        "German Engenineering",
        "your techonological revolution",
        "not in the school program",
        "Always up-to-date",
        "No critical bugs?",
        "Next.js is the GOAT",
        "UR LATE?",
        "<3 KovD3v"
    ];

    
    return titles[Math.floor(Math.random() * titles.length)];


}