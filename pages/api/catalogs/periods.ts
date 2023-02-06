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

    function getPeriods() {
        const { token } = req.headers;
        if (!token) return res.status(401).json({ message: 'No token provided' });

        jwt.verify(token, process.env.SECRET_KEY, function(err:any, decoded:any) {
            if (err){
                 return res.status(401).json({ message: 'Unauthorized' });
            }
        });
        fetch(`${api_url}/catalogs/periods/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': api_key
            }
        })
        .then(response => response.json())
        .then(data => {
            return res.status(200).json({data, ok:true});
        })
    }
}