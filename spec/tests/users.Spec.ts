import { UserStore, User } from '../../src/models/users';
import axios from 'axios';
let userId: number;
let token: string;
const jwt = require('jsonwebtoken');

const store = new UserStore()

describe("User Model", () => {
	it('should have an index method', () => {
		expect(store.index).toBeDefined();
	});

	it('should have a show method', () => {
		expect(store.show).toBeDefined();
	});

	it('should have a create method', () => {
		expect(store.create).toBeDefined();
	});

	it('create a user', async () => {
		const user: User = {
			"firstname": "Hari",
			"lastname": "jha",
			"password": "Hari@123"
		}
		const userData = await axios.post('http://localhost:3000/users', {...user});
		const decoded = jwt.verify(userData.data, process.env.TOKEN_SECRET)
		userId = decoded.user.id;
		token = userData.data;
		expect(userData.status).toBe(200);
	});

	it('return a list of user', async () => {
		const result = await axios.get('http://localhost:3000/users', {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		expect(result.data).toBeInstanceOf(Array)
	});

	it('return a user', async () => {
		const result = await axios.get(`http://localhost:3000/users/${userId}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			}
		});
		expect(result.data).toEqual(jasmine.any(Object));
	});

});