import React, { useState, MouseEvent } from "react";

import Checkout, { pricingRules } from "../../services/checkout";
import { ICheckoutProduct } from "../../services/checkout/types";

import { Customers, Product, products } from "../../shared";

const co = Checkout.new(pricingRules);

const CheckoutPOC = () => {
  const [currentCustomer, setCurrentCustomer] = useState<Customers>(Customers.default);
  const [checkoutProducts, setCheckoutProducts] = useState<ICheckoutProduct[]>([]);

  const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const p = target.name as Product;

    const newProducts = co.add(products[p]);
    setCheckoutProducts(() => [...newProducts]);
  };

  const handleCustomerUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const c = target.name as Customers;

    co.setActiveCustomer = c;
    setCurrentCustomer(c);
  };

  return (
    <div>
      <section>
        <h2>Current customer: {currentCustomer}</h2>
        {Object.keys(Customers).map((c) => {
          const customer = Customers[c as keyof typeof Customers];
          return (
            <button
              disabled={currentCustomer === customer}
              name={customer}
              key={customer}
              onClick={handleCustomerUpdate}
            >
              {customer}
            </button>
          );
        })}
      </section>

      <section>
        <h2>Products:</h2>
        {(Object.keys(products) as Array<keyof typeof Product>).map((p) => (
          <div key={p}>
            {products[p].name}
            <button name={p} onClick={handleAdd}>
              add
            </button>
            <hr />
          </div>
        ))}
      </section>

      <section>
        <h2>Total ${co.total()}</h2>
        {checkoutProducts.map((item) => (
          <p key={`item-${item.name}`}>
            {item.name}, {item.qty}, {item.price}
          </p>
        ))}
      </section>
    </div>
  );
};

export default CheckoutPOC;
