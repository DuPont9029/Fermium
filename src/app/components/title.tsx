
import React, { useState, useEffect } from 'react';

export default function Title() {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(getRandomTitle());
    }, []);

    return (
        <div>
          <a href="https://github.com/DuPont9029/W.M.S">
            {title}
          </a>
        </div>
      )
      
      
      
      
}

function getRandomTitle() {
    const titles: string[] = [
        "Beyond Useless",
        "German Engineering",
        "your techonological revolution",
        "not in the school program",
        "Always up-to-date",
        "No critical bugs?",
        "Next.js is the GOAT",
        "UR LATE?",
        "<3 @KovD3v",
        "chad @Mattiarotelli"
    ];
    const randomIndex = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}