import { ICheckoutProduct, CheckoutPricingRules } from './types';
import { Customers, IProduct } from '../../shared';

class Checkout {
	public products: ICheckoutProduct[];
	public customer: Customers = Customers.default;

	constructor(public pricingRules: CheckoutPricingRules) {
		this.products = [];
		this.pricingRules = pricingRules;
	}

	static new(pricingRules: CheckoutPricingRules): Checkout {
		return new Checkout(pricingRules);
	}

	set setActiveCustomer(c: Customers) {
		this.customer = c;
	}

	add(product: IProduct): ICheckoutProduct[] {
		const existingProduct = this.products.find((p) => p.name === product.name);

		if (!existingProduct) {
			this.products.push({ ...product, qty: 1 });
		} else {
			existingProduct.qty += 1;
		}

		return this.products;
	}

	total(): number {
		let total = 0;
		let discount = 0;

		this.products.forEach((product) => {
			total += product.price * product.qty;
		});

		for (const c in this.pricingRules) {
			if (c !== this.customer) continue;

			for (const product of this.products) {
				const calculateDiscount = this.pricingRules[c][product.name];
				if (!calculateDiscount) continue;

				discount += calculateDiscount(product.qty);
			}
		}

		return total - discount;
	}
}

export default Checkout;
