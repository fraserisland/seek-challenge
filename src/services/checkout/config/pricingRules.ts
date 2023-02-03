import { CheckoutPricingRules } from "../types";
import { Customers, Product, products } from "../../../shared";

export const pricingRules: CheckoutPricingRules = {
  [Customers.myer]: {
    [Product.premium]: (qty) => {
      const discount = qty * products[Product.premium].price - qty * 389.99;
      return discount;
    },
    [Product.standout]: (qty) => {
      const discount = (qty / 5) * products[Product.standout].price;
      return discount;
    },
  },
  [Customers.secondBite]: {
    [Product.classic]: (qty) => {
      const discount = Math.floor(qty / 3) * products[Product.classic].price;
      return discount;
    },
  },
  [Customers.axilCoffeeRoasters]: {
    [Product.standout]: (qty) => {
      const discount = qty * (products[Product.standout].price - 299.99);
      return discount;
    },
  },
  [Customers.default]: {},
};

export default pricingRules;
