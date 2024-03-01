"use client";

import Results from "./results";
import Title from "./title";
import { getDayAndTime } from "../../../functions/gettime";
import React, { useState, useEffect } from "react";

export default function Form() {
	const [classe, setClasse] = useState<number>(0);
	const [sezione, setSezione] = useState("");
	const [dt, setDt] = useState("");
	const [dt1, setDt1] = useState("");

	const handleResponse = async (response: Response) => {
		if (!response.ok) {
			console.error(
				"Errore richiesta durante la richiesta API",
				await response.text()
			);
			return;
		}

		let responseText = await response.text();
		let dt = responseText.replace(/\\n/g, " "); // Sostituisce \n con uno spazio
		dt = dt.replace(/"/g, ""); // Rimuove le virgolette

		return dt;
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		console.log(classe + " " + sezione);
		console.log(getDayAndTime());
		let time: number[] = getDayAndTime();

		const response = await fetch("/api/request", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				classe: classe,
				sezione: sezione,
				ora: time[0],
				giorno: time[1],
			}),
		});

		const response2 = await fetch("/api/request", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				classe: classe,
				sezione: sezione,
				ora: time[0] + 1,
				giorno: time[1],
			}),
		});

		const dt = await handleResponse(response);
		const dt1 = await handleResponse(response2);

		setDt(dt? dt : "Nessun risultato");
		setDt1(dt1 ? dt1 : "Nessun risultato");
		console.log(dt); // I risultati della richiesta API
		console.log(dt1);
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 gap-10 text-white">
			<Title />
			<form
				onSubmit={handleSubmit}
				className="flex flex-col bg-gray-800 p-6 rounded-lg gap-4 md:w-[40%] w-[60%]">
				<div>
					<label className="text-lg font-semibold">Classe:</label>
					<input
						type="text"
						value={classe === 0 ? "" : classe}
						onChange={(e) => setClasse(Number(e.target.value))}
						className="block w-full rounded-md bg-gray-700 focus:border-gray-500 focus:bg-gray-600 focus:ring-0 h-8"
					/>
				</div>
				<div>
					<label className="text-lg font-semibold">Sezione:</label>
					<input
						type="text"
						value={sezione}
						onChange={(e) =>
							setSezione(e.target.value.toUpperCase())
						}
						className="block w-full rounded-md bg-gray-700 focus:border-gray-500 focus:bg-gray-600 focus:ring-0 h-8"
					/>
				</div>
				<button
					type="submit"
					className="p-4 rounded-md shadow-sm text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Submit
				</button>
			</form>

			{dt && <Results res={dt} res1={dt1} />}
		</div>
	);
}
