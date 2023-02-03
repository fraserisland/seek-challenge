import { CheckoutPricingRules } from '../types';
import { Customers, Product, products } from '../../../shared';

export const pricingRules: CheckoutPricingRules = {
	[Customers.myer]: {
		[Product.premium]: (qty) => qty * products[Product.premium].price - qty * 389.99,
		[Product.standout]: (qty) => (qty / 5) * products[Product.standout].price,
	},
	[Customers.secondBite]: {
		[Product.classic]: (qty) => Math.floor(qty / 3) * products[Product.classic].price,
	},
	[Customers.axilCoffeeRoasters]: {
		[Product.standout]: (qty) => qty * (products[Product.standout].price - 299.99),
	},
	[Customers.default]: {},
};

export default pricingRules;
