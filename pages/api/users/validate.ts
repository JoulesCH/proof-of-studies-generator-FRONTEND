// validate token 
const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import type { NextApiRequest, NextApiResponse } from 'next'



export default function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return validate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function validate() {
        const { token } = req.body;
        if (!token) return res.status(401).json({ message: 'No token provided' });
    
        jwt.verify(token, process.env.SECRET_KEY, function(err:any, decoded:any) {
            if (err){
                 return res.status(401).json({ message: 'Unauthorized' });
            }
            res.status(200).json({
                ok:true,
                token
            });
        });
    }
}