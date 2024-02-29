"use client";

import Results from './results';
import Title from './title';
import { getDayAndTime } from '../../../functions/gettime';
import React, { useState } from 'react';



export default function Form() {
    const [classe, setClasse] = useState<number | undefined>(undefined);
    const [sezione, setSezione] = useState('');
    const [dt, setDt] = useState('');
    const [dt1, setDt1] = useState('');

  

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        console.log(`classe: ${classe}, sezione: ${sezione}`);
        console.log(getDayAndTime());
        let time: number[] = getDayAndTime();

        
        const response = await fetch('/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classe: classe,
                sezione: sezione,
                ora: time[0],
                giorno: time[1],
            }),
        });

        const response2 = await fetch('/api/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                classe: classe,
                sezione: sezione,
                ora: time[0]+1,
                giorno: time[1],
            }),
        });

        if (!response.ok) {
            console.error('Errore richiesta durante la richiesta API', await response.text());
            return;
        }

        if (!response2.ok) {
            console.error('Errore richiesta durante la richiesta API', await response.text());
            return;
        }
    
        const data = await response.json();
        const data2 = await response2.json();
        console.log(data); // I risultati della richiesta API
        console.log(data2);
        setDt(data)
        setDt1(data2)
    }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className='typewriter large-title mb-[5%]'>
                
                <Title/>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md w-1/3 mb-4">
                <label className="text-lg font-semibold">
                    Classe:
                    <input type="text" value={classe} onChange={e => setClasse(Number(e.target.value))} className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" />
                </label>
                <label className="text-lg font-semibold">
                    Sezione:
                    <input type="text" value={sezione} onChange={e => setSezione(e.target.value.toUpperCase())} className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" />
                </label>
                <div className="flex justify-center">
                    <input type="submit" value="Submit" className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                </div>
            </form>
    
            {dt && <Results res={dt} res1={dt1}/>}
        </div>
    );
}