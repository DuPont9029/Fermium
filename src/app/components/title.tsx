
import React, { useState, useEffect } from 'react';

export default function Title() {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(getRandomTitle());
    }, []);

    return (
        <h1 className="text-4xl">{title}</h1>
    );
}

function getRandomTitle() {
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
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}