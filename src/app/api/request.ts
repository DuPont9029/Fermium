import React, { useContext } from 'react';
import InputContext from '../context/context'; // Assicurati di importare il tuo context
const axios = require('axios');
const cheerio = require('cheerio');


function useInputValues() {
    const context = useContext(InputContext);
    if (!context) {
        throw new Error('useInputValues must be used within a InputContext.Provider');
    }
    return context;
}


function makeApiRequest() {
    const { classe, sezione } = useInputValues();
    
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



    /*
    ! non so se:
    ! 1. se usecontext ha funzionato e lui ha ricevuto i dati
    ! 2. se la richiesta è andata a buon fine o se ha problemi di cors (lo stesso codice che ho testato non li ha)
    ! 3. se ci sono altri errori
    */
}