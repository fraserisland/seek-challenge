import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutPOC from ".";

describe("CheckoutPOC component", () => {
  it("renders elements correctly", () => {
    render(<CheckoutPOC />);

    expect(
      screen.getByRole("heading", { name: /current customer: default/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /default/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /axil coffee roasters/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /second bite/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /myer/i })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /products:/i })
    ).toBeInTheDocument();
    within(screen.getByText(/classic/i)).getByRole("button", { name: /add/i });
    within(screen.getByText(/standout/i)).getByRole("button", { name: /add/i });
    within(screen.getByText(/premium/i)).getByRole("button", { name: /add/i });

    expect(
      screen.getByRole("heading", { name: /total \$0/i })
    ).toBeInTheDocument();
  });

  it("updates the current customer type", () => {
    render(<CheckoutPOC />);

    const customerType = screen.getByRole("heading", {
      name: /current customer: default/i,
    });
    const targetBtn = screen.getByRole("button", { name: /second bite/i });

    userEvent.click(targetBtn);

    expect(customerType).toHaveTextContent(/current customer: second bite/i);
  });

  it("displays the added checkout items total", () => {
    render(<CheckoutPOC />);

    const total = screen.getByRole("heading", { name: /total \$0/i });
    const premiumAddBtn = within(screen.getByText(/premium/i)).getByRole(
      "button",
      { name: /add/i }
    );
    const stadoutAddBtn = within(screen.getByText(/standout/i)).getByRole(
      "button",
      { name: /add/i }
    );

    userEvent.click(premiumAddBtn);
    userEvent.click(stadoutAddBtn);

    expect(screen.getByText(/premium, 1, 394\.99/i)).toBeInTheDocument();
    expect(screen.getByText(/standout, 1, 322\.99/i)).toBeInTheDocument();
    expect(total).toHaveTextContent(/total \$717\.98/i);
  });
});
