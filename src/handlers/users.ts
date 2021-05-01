import { Request, Response, Application } from 'express';
import { User, UserStore } from '../models/users'
const jwt = require('jsonwebtoken');
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index()
        res.json(users)
    }catch(err) {
        res.status(404)
        res.json(`No data found ${err}`)
    }
}

const show = async (req: Request, res: Response) => {
   try {
        const user = await store.show(req.params.id);
        if(user) {
            res.json(user)
        }else {
            throw new Error("No Data found");
        }
   }catch(err) {
    res.status(404)
    res.json(err)
   }
}

const create = async (req: Request, res: Response) => {
    const user: User = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    }
    try {
        const newUser = await store.create(user)
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token)
    } catch(err) {
        res.status(400)
        res.json(err + user)
    }
}

const userRoutes = (app: Application) => {
    app.get('/users',verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/users', create)
}

export default userRoutes;