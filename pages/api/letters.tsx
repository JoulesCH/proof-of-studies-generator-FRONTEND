const jwt = require('jsonwebtoken');
import type { NextApiRequest, NextApiResponse } from 'next'


const api_key:string = process.env.API_KEY ||'';
const api_url = process.env.API_URL;

export default  function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getPeriods();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getPeriods() {
        const {constancia_tipo, periodo, fecha} = req.query;
        const boleta_prueba = process.env.BOLETA;
        const response = await fetch(`${api_url}/letters/pdf/${constancia_tipo.toLowerCase()}/${boleta_prueba}?periodo_actual=${periodo}&fecha=${fecha}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': api_key
            }
        })
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline');
        res.status(200).send(await response.text());
    }
}