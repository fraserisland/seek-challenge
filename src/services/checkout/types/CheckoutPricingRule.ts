import { Product } from '../../../shared';

type Discount = number;

export type CheckoutPricingRule = {
 [key in Product]?: (qty: number) => Discount;
};
