const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    switch (req.method) {
        case 'POST':
            return authenticate();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function authenticate() {
        const { username, password } = req.body;
        if (username != process.env.USER_ADMIN || password != process.env.USER_PASSWORD) 
          return res.status(400).json({ message: 'Username or password is incorrect' });
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
    
        // return basic user details and token
        return res.status(200).json({
            ok:true,
            token
        });
    }
}