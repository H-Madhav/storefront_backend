import { Request, Response, Application } from 'express';
import { Order, OrderStore } from '../models/orders'
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await store.index()
        res.json(orders)
    } catch(e) {
        res.status(404)
        res.json(e)
    }
}

const currentOrderByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const order = await store.currentOrderByUser(req.params.user_id)
        res.json(order)
    } catch(e) {
        res.status(404)
        res.json(e)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {

    try {
        const order: Order = {
            quantity: parseInt(req.body.quantity),
            status: req.body.status,
            product_id: parseInt(req.body.product_id),
            user_id: parseInt(req.body.user_id)
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

 
const orderRoutes = (app: Application) => {
    app.get('/orders', index)
    app.post('/orders', verifyAuthToken, create)
    app.get('/current_order_by_user/:user_id', verifyAuthToken, currentOrderByUser)
}

export default orderRoutes;