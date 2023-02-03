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

 set setCustomer(c: Customers) {
  this.customer = c;
 }

 add(product: IProduct): ICheckoutProduct[] {
  const existingProduct = this.products.find((p) => p.name === product.name);

  if (!existingProduct) {
   this.products.push({ ...product, qty: 1 });
  } else {
   this.products = this.products.map((p) => (p.name === product.name ? { ...p, qty: p.qty + 1 } : p));
  }

  return this.products;
 }

 total(): number {
  let total = 0;
  let discount = 0;

  this.products.forEach((product) => {
   total += product.price * product.qty;
  });

  Object.keys(this.pricingRules).forEach((c) => {
   if (c !== this.customer) return;

   this.products.forEach((product: ICheckoutProduct) => {
    discount += this.pricingRules[c][product.name]?.(product.qty) ?? 0;
   });
  });

  return total - discount;
 }
}

export default Checkout;
