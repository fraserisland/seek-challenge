import { Customers } from "../../../shared";
import { CheckoutPricingRule } from "./CheckoutPricingRule";

export type CheckoutPricingRules = {
  [key in Customers]: CheckoutPricingRule;
};
