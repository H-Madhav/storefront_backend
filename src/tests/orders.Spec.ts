import { OrderStore } from '../models/orders';

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
});