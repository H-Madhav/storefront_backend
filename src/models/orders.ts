
import client from '../database';

export type Order = {
    id?: number;
    quantity: number,
    status: string,
    product_id: number,
    user_id: number
}

export class OrderStore {

	async index(): Promise<Order[]> {
		try {
			const conn = await client.connect()
			const sql = 'SELECT * FROM orders'
			const result = await conn.query(sql)
			conn.release()
			return result.rows 
		} catch (err) {
			throw new Error(`Could not get orders. Error: ${err}`)
		}
	}
  
	async currentOrderByUser(user_id: string): Promise<Order> {
		try {
			const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=active'
			const conn = await client.connect()
			const result = await conn.query(sql, [user_id])
			conn.release()
			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not find order ${user_id}. Error: ${err}`)
		}
	}

	async create(o: Order): Promise<Order> {
		try {
			const productsql = 'SELECT * FROM product WHERE id=($1)'
			const conn = await client.connect()
			const result = await conn.query(productsql, [o.product_id])
			const product = result.rows[0]
			conn.release()
			if (!product) {
				throw new Error(`Could not add order, product don't exist`)
			}
		} catch (err) {
			throw new Error(`${err}`)
		}

		try {
			const usersql = 'SELECT * FROM users WHERE id=($1)'
			const conn = await client.connect()
			const result = await conn.query(usersql, [o.user_id])
			const user = result.rows[0]
			conn.release()
			if (!user) {
				throw new Error(`Could not add order, user don't exist`)
			}
		} catch (err) {
			throw new Error(`${err}`)
		}

		try {
			const sql = 'INSERT INTO orders (quantity, status, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *'
			const conn = await client.connect()
			const result = await conn.query(sql, [o.quantity, o.status, o.product_id, o.user_id])
			const order = result.rows[0]
			conn.release()
			return order
		} catch (err) {
			throw new Error(`Could not add new order for ${o.user_id}. Error: ${err}`)
		}
	}

}