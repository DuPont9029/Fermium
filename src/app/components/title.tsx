import React, { useState, useEffect } from "react";

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
	"chad @Mattiarotelli",
];

export default function Title() {
	const [title, setTitle] = useState("");

	useEffect(() => {
		setTitle(getRandomTitle());
	}, []);

	return (
		<a
			href="https://github.com/DuPont9029/W.M.S"
			className="no-underline lg:text-5xl md:text-4xl sm:text-3xl text-xl font-bold">
			{title}
		</a>
	);
}

function getRandomTitle() {
	const randomIndex = Math.floor(Math.random() * titles.length);
	return titles[randomIndex];
}
