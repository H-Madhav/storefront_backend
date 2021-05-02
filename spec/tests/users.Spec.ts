import { UserStore } from '../../src/models/users';

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

	it('create method should add a user', async () => {
		const result = await store.create({
			firstname: "Hari", 
			lastname: "Jha", 
			password: "Hari@123"
		});
		expect(result).toEqual(jasmine.any(Object));
	});

	it('index method should return a list of user', async () => {
		const result = await store.index();
		expect(result).toBeInstanceOf(Array)
	});

	it('show method should return a user', async () => {
		const result = await store.show('1');
		expect(result).toEqual(jasmine.any(Object));
	});

});