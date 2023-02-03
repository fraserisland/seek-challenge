import { IProduct, Product } from './types';

export const products: Record<Product, IProduct> = {
 [Product.classic]: {
  name: Product.classic,
  price: 269.99,
 },
 [Product.standout]: {
  name: Product.standout,
  price: 322.99,
 },
 [Product.premium]: {
  name: Product.premium,
  price: 394.99,
 },
};

export default products;
