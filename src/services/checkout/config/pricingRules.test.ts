import { pricingRules } from './pricingRules';
import { Customers, Product, products } from '../../../shared';

describe('pricingRules', () => {
 describe('SecondBite', () => {
  it('gets a 3 for 2 deal on Classic Ads', () => {
   const customer = Customers.secondBite;
   const product = Product.classic;
   const qty = 6;
   const expectedDiscount = products[product].price * 2;

   const actualDiscount = pricingRules[customer][product]?.(qty);

   expect(actualDiscount).toEqual(expectedDiscount);
  });
 });

 describe('Axil Coffee Roasters', () => {
  it('gets a discount on Stand out Ads where the price drops to $299.99 per ad', () => {
   const customer = Customers.axilCoffeeRoasters;
   const product = Product.standout;
   const qty = 4;
   const expectedDiscount = qty * products[product].price - qty * 299.99;

   const actualDiscount = pricingRules[customer][product]?.(qty);

   expect(actualDiscount).toEqual(expectedDiscount);
  });
 });

 describe('MYER', () => {
  it('gets a 5 for 4 deal on Stand out Ads', () => {
   const customer = Customers.myer;
   const product = Product.standout;
   const qty = 10;
   const expectedDiscount = products[product].price * 2;
   const actualDiscount = pricingRules[customer][product]?.(qty);

   expect(actualDiscount).toEqual(expectedDiscount);
  });

  it('gets a discount on Premium Ads where the price drops to $389.99 per ad', () => {
   const customer = Customers.myer;
   const productType = Product.premium;
   const qty = 8;
   const expectedDiscount = (394.99 - 389.99) * qty;
   const actualDiscount = pricingRules[customer][productType]?.(qty);

   expect(actualDiscount).toEqual(expectedDiscount);
  });
 });
});
