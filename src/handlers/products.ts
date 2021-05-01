import { Request, Response, Application } from 'express';
import { Product, ProductStore } from '../models/products'
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore()

const index = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await store.index()
        res.json(products)
    } catch(err) {
        res.status(404)
        res.json(err)
    }
}

const show = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await store.show(req.params.id)
        res.json(product)
    } catch(err) {
        res.status(404)
        res.json(err)
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price
        }
        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const productRoutes = (app: Application) => {
  app.get('/products', verifyAuthToken, index)
  app.get('/products/:id', verifyAuthToken, show)
  app.post('/products', verifyAuthToken, create)
}

export default productRoutes;