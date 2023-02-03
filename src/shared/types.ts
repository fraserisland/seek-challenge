export enum Product {
 classic = 'classic',
 premium = 'premium',
 standout = 'standout',
}

export enum Customers {
 myer = 'Myer',
 secondBite = 'Second Bite',
 axilCoffeeRoasters = 'Axil Coffee Roasters',
 default = 'Default',
}

export interface IProduct {
 name: Product;
 price: number;
}
