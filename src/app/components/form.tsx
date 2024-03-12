"use client";

import Results from './results';
import Title from './title';
import { getDayAndTime } from '../../../functions/gettime';
import React, { useState } from 'react';



export default function Form() {
    const [classe, setClasse] = useState<number | "">("");
    const [sezione, setSezione] = useState('');
    const [dt, setDt] = useState('');
    const [dt1, setDt1] = useState('');
    const [now, setNow] = useState(true);

  

    const handleSubmit = async(event: React.FormEvent) => {
        event.preventDefault();
        console.log(`classe: ${classe}, sezione: ${sezione}`);
        console.log(getDayAndTime());
        let time: [number, number, boolean] = getDayAndTime();


        const response = await fetch('/api/privateapi', {
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

        const response2 = await fetch('/api/privateapi', {
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
    
        let responseText = await response.text(); 
        let dt = responseText.replace(/\\n/g, ' '); // Sostituisce \n con uno spazio
        dt = dt.replace(/"/g, ''); // Rimuove le virgolette
        
        let responseText2 = await response2.text(); 
        let dt1 = responseText2.replace(/\\n/g, ' ');// Sostituisce \n con uno spazio
        dt1 = dt1.replace(/"/g, ''); // Rimuove le virgolette
        
        setDt(dt);
        setDt1(dt1);
        setNow(time[2])
        console.log(dt); // I risultati della richiesta API
        console.log(dt1);
        console.log(now)
        
    }
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className='text-center whitespace-pre-line text-inherit no-underline text-5xl font-bold large-title inline-block custom-title mb-[5%]'>
                <Title/>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md w-full mb-4 sm:w-1/2 md:w-1/3">
                <label className="text-lg font-semibold">
                    Classe:
                    <input 
                        type="text" 
                        value={classe} 
                        onChange={e => {
                            const num = Number(e.target.value); // parsa come numero
                            if (e.target.value === "" || (!isNaN(num) && num >= 1 && num <= 5)) { // se è un numero e compreso tra 1 e 5
                                setClasse(e.target.value === "" ? "" : num);
                            }
                        }} 
                        maxLength={1}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" 
                    />
                </label>
                <label className="text-lg font-semibold">
                    Sezione:
                    <input 
                        type="text" 
                        value={sezione} 
                        onChange={e => { 

                            if (/^[a-zA-Z]*$/.test(e.target.value)) { // vede se è una lettera //TODO vedi se la lettera sta nelle sezioni
                                setSezione(e.target.value.toUpperCase());
                            }
                        
                        }} 
                        maxLength={1}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white" />
                </label>
                <div className="flex justify-center">
                    <input type="submit" value="Submit" className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
                </div>
            </form>
    
            {dt && <Results res={dt} res1={dt1} status={now}/>}
        </div>
    );
}