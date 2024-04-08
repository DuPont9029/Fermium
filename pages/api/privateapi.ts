import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { JSDOM } from 'jsdom';

   


type RequestBody = {
  classe: number;
  sezione: string;
  ora: number;
  giorno: number;
};

export default async function privateapi(req: NextApiRequest, res: NextApiResponse) {
    // Aggiungi qui gli headers per disabilitare CORS


    const body = req.body as Partial<RequestBody>;

    if (body.classe === undefined || body.sezione === undefined || body.ora === undefined || body.giorno === undefined) {
        res.status(400).json({ error: 'classe, sezione e ora sono richiesti' });
        return;
    }

    const { classe, sezione, ora, giorno } = body;

    try {
        const response = await axios.get(`https://www.itisfermi.edu.it/Orario/Classi/${classe}${sezione}.html`);
        const dom = new JSDOM(response.data);
        const $ = dom.window.document.querySelector.bind(dom.window.document);


        const schedule: any = {};

        const tableRows = dom.window.document.querySelectorAll('table tr');
        tableRows.forEach((row: any, i: number) => {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell: any, j: number) => {
                const cellText = cell.textContent.trim();
                const cellRowspan = cell.getAttribute('rowspan');

                if (!schedule[i]) {
                    schedule[i] = {};
                }

                while (schedule[i][j]) {
                    j++;
                }

                schedule[i][j] = cellText;

                if (cellRowspan && parseInt(cellRowspan) > 1) {
                    for (let k = 1; k < parseInt(cellRowspan); k++) {
                        if (!schedule[i + k]) {
                            schedule[i + k] = {};
                        }
                        schedule[i + k][j] = cellText;
                    }
                }
            });
        });
        const result = schedule[ora][giorno];
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Errore durante la richiesta API' });
    }
}