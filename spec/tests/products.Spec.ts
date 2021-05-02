import { ProductStore, Product } from '../../src/models/products';
import { User } from '../../src/models/users';
import axios from 'axios';
const jwt = require('jsonwebtoken');
let productId: number;
let token: string;

const store = new ProductStore()

describe("Product Model", () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('create a product', async () => {
		const user: User = {
			"firstname": "Keshav",
			"lastname": "jha",
			"password": "Keshav@123"
		}

		const userData = await axios.post('http://localhost:3000/users', {...user});
		token = userData.data;

		const product: Product = {
			'name': 'iphone',
			'price': 600,
		}

		const result = await axios.post('http://localhost:3000/products', product, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		productId = result.data.id? result.data.id : 1;
		expect(result.data).toEqual(jasmine.any(Object));
	});

	it('return a list of products', async () => {
		const result = await axios.get('http://localhost:3000/products')
		expect(result.data).toBeInstanceOf(Array)
	});

	it('return a product', async () => {
		const result = await axios.get(`http://localhost:3000/products/${productId}`)
		expect(result.data).toEqual(jasmine.any(Object));
	});
});