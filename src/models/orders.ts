
import client from '../database';

export type Order = {
    id?: number;
    status: string,
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
			const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
			const conn = await client.connect()
			const result = await conn.query(sql, [o.status, o.user_id])
			const order = result.rows[0]
			conn.release()
			return order
		} catch (err) {
			throw new Error(`Could not add new order for ${o.user_id}. Error: ${err}`)
		}
	}

	async addProduct(quantity: number, orderId: number, productId: number): Promise<Order> {
		try {
			const ordersql = 'SELECT * FROM orders WHERE id=($1)'
			const conn = await client.connect()
			const result = await conn.query(ordersql, [orderId])
			const order = result.rows[0]
			if (order.status !== "active") {
			  throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
			}
			conn.release()
		} catch (err) {
			throw new Error(`${err}`)
		}
	
		try {
			const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
			const conn = await client.connect()
			const result = await conn.query(sql, [quantity, orderId, productId])
			const order = result.rows[0]
			conn.release()
			return order
		} catch (err) {
			  throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
		}
	  }

}