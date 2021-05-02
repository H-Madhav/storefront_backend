import axios from 'axios';
import { OrderStore, Order } from '../../src/models/orders';
import { User } from '../../src/models/users';
import {Product} from '../../src/models/products';
const jwt = require('jsonwebtoken');
let userId: number;
let orderId: number;
let token: string;

const store = new OrderStore()

describe("Order Model", () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a currentOrderByUser method', () => {
		expect(store.currentOrderByUser).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});
	
	it('create method should add an order', async () => {
		const user: User = {
			"firstname": "Ram",
			"lastname": "mohan",
			"password": "Ram@123"
		}

		const userData = await axios.post('http://localhost:3000/users', {...user});
		const decoded = jwt.verify(userData.data, process.env.TOKEN_SECRET)
		userId = decoded.user.id;
		token = userData.data;

		const order: Order = {
			status: 'active',
			user_id: decoded.user.id
		}

		const result = await axios.post('http://localhost:3000/orders', order, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userData.data}`
			}
		});

		orderId = result.data.id;
		expect(result.status).toBe(200)
	});

	it('addProduct method should add a product in order', async () => {
		const product: Product = {
			'name': 'iphone',
			'price': 600,
		}

		const productData = await axios.post('http://localhost:3000/products', {...product}, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		
		const data: {quantity: number, product_id: number} = {
			quantity: 1,
			product_id: productData.data.id
		}

		const result = await axios.post(`http://localhost:3000/orders/${orderId}/products`, data, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		expect(result.status).toBe(200)
	});


	it('return a list of orders', async () => {
		const result = await axios.get('http://localhost:3000/orders');
		expect(result.data).toBeInstanceOf(Array)
	});

	it('currentOrderByUser method should return an orders', async () => {
		const result = await axios.get(`http://localhost:3000/current_order_by_user/${userId.toString()}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		expect(result.data).toEqual(jasmine.any(Object));
	});

});