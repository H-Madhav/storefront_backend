import { OrderStore } from '../../src/models/orders';

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
	
	xit('create method should add a book', async () => {
		const result = await store.create({
			quantity: 1,
			status: 'active',
			product_id: 1,
			user_id: 1
		});
		expect(result).toEqual({
			id: 1,
			quantity: 1,
			status: 'active',
			product_id: 1,
			user_id: 1
		});
	});

	xit('index method should return a list of orders', async () => {
		const result = await store.index();
		expect(result).toEqual([{
			id: 1,
			quantity: 1,
			status: 'active',
			product_id: 1,
			user_id: 1
		}]);
	});

	xit('currentOrderByUser method should return an orders', async () => {
		const result = await store.currentOrderByUser('1');
		expect(result).toEqual({
			id: 1,
			quantity: 1,
			status: 'active',
			product_id: 1,
			user_id: 1
		});
	});

});