var jwt = require('jsonwebtoken');
import { Request, Response } from 'express';

const verifyAuthToken = (req: Request, res: Response, next: Function) => {
    try {
        const authorizationHeader: string = req.headers.authorization || ''
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        next()
    } catch (error) {
        res.status(401)
    }
}

export default verifyAuthToken;