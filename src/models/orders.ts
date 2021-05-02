
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
		const status: string = "active"
		try {
			const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
			const conn = await client.connect()
			const result = await conn.query(sql, [user_id, status])
			conn.release()
			return result.rows[0]
		} catch (err) {
			throw new Error(`Could not find order ${user_id}. Error: ${err}`)
		}
	}

	async create(o: Order): Promise<Order> {
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