import { ProductStore } from '../../src/models/products';

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

	it('create method should add a product', async () => {
		const result = await store.create({
			name: 'iphone',
			price: 1,
		});
		expect(result).toEqual(jasmine.any(Object));
	});

	it('index method should return a list of products', async () => {
		const result = await store.index();
		expect(result).toBeInstanceOf(Array)
	});

	it('show method should return a product', async () => {
		const result = await store.show('1');
		expect(result).toEqual(jasmine.any(Object));
	});
});