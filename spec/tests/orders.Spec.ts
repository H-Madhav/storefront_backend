import axios from 'axios';
import { OrderStore, Order } from '../../src/models/orders';
import { User } from '../../src/models/users';
import {Product} from '../../src/models/products';
const jwt = require('jsonwebtoken');
let userId: string;
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
			"firstname": "Hari",
			"lastname": "jha",
			"password": "Hari@123"
		}
		const product: Product = {
			'name': 'iphone',
			'price': 600,
		}
		const userData = await axios.post('http://localhost:3000/users', {...user});
		const decoded = jwt.verify(userData.data, process.env.TOKEN_SECRET)
		userId = decoded.user.id;
		const productData = await axios.post('http://localhost:3000/products', product, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userData.data}`
			}
		});
		const order: Order = {
			quantity: 1,
			status: 'active',
			product_id: productData.data.id,
			user_id: decoded.user.id
		}
		const result = await axios.post('http://localhost:3000/orders', order, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${userData.data}`
			}
		});
		expect(result.status).toBe(200)
	});

	it('index method should return a list of orders', async () => {
		const result = await axios.get('http://localhost:3000/orders');
		expect(result.status).toBe(200)
	});

	it('currentOrderByUser method should return an orders', async () => {
		const result = await store.currentOrderByUser(userId);
		expect(result.user_id.toString()).toEqual(userId.toString());
	});

});