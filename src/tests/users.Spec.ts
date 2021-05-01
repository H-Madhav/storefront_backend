import { UserStore } from '../models/users';

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

	xit('create method should add a user', async () => {
		const result = await store.create({
			firstname: "Hari", 
			lastname: "Jha", 
			password: "Hari@123"
		});
		expect(result.firstname).toEqual("Hari");
	});

	xit('index method should return a list of user', async () => {
		const result = await store.index();
		expect(result[0].firstname).toEqual("Hari");
	});

	xit('show method should return a user', async () => {
		const result = await store.show('1');
		expect(result.firstname).toEqual("Hari");
	});

});