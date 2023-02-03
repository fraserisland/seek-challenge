import Checkout, { pricingRules } from './';
import { Customers, Product, products } from '../../shared';

describe('Checkout', () => {
	let checkout: Checkout;

	beforeEach(() => {
		checkout = Checkout.new(pricingRules);
	});

	it('creates an instance of the checkout', () => {
		expect(checkout).toBeInstanceOf(Checkout);
	});

	it('adds products to the checkout', () => {
		checkout.add(products[Product.classic]);

		expect(checkout.products).toHaveLength(1);
	});

	it('calculates the total price with no discounts', () => {
		checkout.setActiveCustomer = Customers.default;

		checkout.add(products[Product.classic]);
		checkout.add(products[Product.standout]);

		expect(checkout.total()).toEqual(products[Product.classic].price + products[Product.standout].price);
	});

	it('calculates the total price with discounts for Default customer', () => {
		checkout.setActiveCustomer = Customers.default;

		checkout.add(products[Product.classic]);
		checkout.add(products[Product.standout]);
		checkout.add(products[Product.premium]);

		expect(checkout.total()).toEqual(987.97);
	});

	it('calculates the total price with discounts for Second Bite customer', () => {
		checkout.setActiveCustomer = Customers.secondBite;

		checkout.add(products[Product.classic]);
		checkout.add(products[Product.classic]);
		checkout.add(products[Product.classic]);
		checkout.add(products[Product.premium]);

		expect(checkout.total()).toEqual(934.97);
	});

	it('calculates the total price with discounts for Axil Coffee Roasters customer', () => {
		checkout.setActiveCustomer = Customers.axilCoffeeRoasters;

		checkout.add(products[Product.standout]);
		checkout.add(products[Product.standout]);
		checkout.add(products[Product.standout]);
		checkout.add(products[Product.premium]);

		expect(checkout.total()).toEqual(1294.96);
	});
});
