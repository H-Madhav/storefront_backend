import { ProductStore } from '../models/products';

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

	xit('create method should add a product', async () => {
		const result = await store.create({
			name: 'iphone',
			price: 1,
		});
		expect(result).toEqual({
			id: 1,
			name: 'iphone',
			price: 1,
		});
	});

	xit('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toEqual([{
			id: 1,
			name: 'iphone',
			price: 1,
		}]);
	});

	xit('show method should return a product', async () => {
		const result = await store.show('1');
		expect(result).toEqual({
			id: 1,
			name: 'iphone',
			price: 1,
		});
	});
});