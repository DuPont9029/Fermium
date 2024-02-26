"use client";

import React, { useState } from 'react';



export default function Form() {
    const [classe, setClasse] = useState(4);
    const [sezione, setSezione] = useState('E');

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        console.log(`classe: ${classe}, sezione: ${sezione}`);

        const response = await fetch('/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classe: classe,
                sezione: sezione,
                ora: 1,
                giorno: 1,
            }),
        });

        if (!response.ok) {
            console.error('Errore richiesta durante la richiesta API', await response.text());
            return;
        }
    
        const data = await response.json();
        console.log(data); // I risultati della richiesta API
    }
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md w-1/3">
                <label className="block mb-4">
                    Classe:
                    <input type="text" value={classe} onChange={e => setClasse(Number(e.target.value))} className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" />
                </label>
                <label className="block mb-4">
                    Sezione:
                    <input type="text" value={sezione} onChange={e => setSezione(e.target.value.toUpperCase())} className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" />
                </label>
                <div className="flex justify-center">
                    <input type="submit" value="Submit" className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                </div>
            </form>
        </div>
    );
}