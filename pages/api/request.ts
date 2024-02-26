

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import cheerio from 'cheerio';

// Definisci un tipo per i dati del corpo della richiesta
type RequestBody = {
  classe: number;
  sezione: string;
  ora: number;
  giorno: number;
};



export default async function request(req: NextApiRequest, res: NextApiResponse) {
    // Assicurati che il corpo della richiesta sia del tipo atteso
    const body = req.body as Partial<RequestBody>;

    // Controlla che classe e sezione siano definiti
    if (body.classe === undefined || body.sezione === undefined || body.ora === undefined || body.giorno === undefined) {
        res.status(400).json({ error: 'classe, sezione e ora sono richiesti' });
        return;
    }

    const { classe, sezione, ora, giorno } = body;

    try {
        const response = await axios.get(`https://www.itisfermi.edu.it/Orario/Classi/${classe}${sezione}.html`);
        const $ = cheerio.load(response.data);
        // Fai qualcosa con $ per ottenere i risultati che vuoi

        let schedule: any = [];
    //    let rowspan = [];

        $('table tr').each((i, row) => {
            $(row).find('td').each((j, cell) => {
                let cellText = $(cell).text().trim();
                let cellRowspan = $(cell).attr('rowspan');

                if (!schedule[i]) {
                    schedule[i] = [];
                }

                // Se la cella è occupata, spostati alla cella successiva
                while (schedule[i][j]) {
                    j++;
                }

                schedule[i][j] = cellText;

                if (cellRowspan && parseInt(cellRowspan) > 1) {
                    for (let k = 1; k < parseInt(cellRowspan); k++) {
                        if (!schedule[i + k]) {
                            schedule[i + k] = [];
                        }
                        schedule[i + k][j] = cellText;
                    }
                }
            });
        });
        const result = schedule[ora][giorno]; // Sostituisci con il tuo codice per ottenere i risultati
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Errore durante la richiesta API' });
    }
}




/*

function makeApiRequest() {
  
    
    axios.get(`https://www.itisfermi.edu.it/Orario/Classi/${classe}${sezione}.html`)
    .then(response => {
        let html = response.data;
        let $ = cheerio.load(html);
        let schedule = [];
        let rowspan = [];

        $('table tr').each((i, row) => {
            $(row).find('td').each((j, cell) => {
                let cellText = $(cell).text().trim();
                let cellRowspan = $(cell).attr('rowspan');

                if (!schedule[i]) {
                    schedule[i] = [];
                }

                // Se la cella è occupata, spostati alla cella successiva
                while (schedule[i][j]) {
                    j++;
                }

                schedule[i][j] = cellText;

                if (cellRowspan && parseInt(cellRowspan) > 1) {
                    for (let k = 1; k < parseInt(cellRowspan); k++) {
                        if (!schedule[i + k]) {
                            schedule[i + k] = [];
                        }
                        schedule[i + k][j] = cellText;
                    }
                }
            });
        });

        console.log(schedule[1][2]);
    })
    .catch(error => {
        console.error(error);
    });
*/


    /*
    ! non so se:
    ! 1. come chiamare l'api
    ! 2. se la richiesta è andata a buon fine o se ha problemi di cors (lo stesso codice che ho testato non li ha)
    ! 3. se ci sono altri errori
    */
