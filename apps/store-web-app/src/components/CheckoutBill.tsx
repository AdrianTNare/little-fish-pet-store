import { checkoutBillItems } from "@/fixtures/fishProducts";
import { CheckoutBillItem } from "./CheckoutBillItem";

export const CheckoutBill = () => {
  return (
    <div>
      <h5>Checkout </h5>

      <div>
        {checkoutBillItems.map((billItem) => (
          <CheckoutBillItem key={billItem.name} item={billItem} />
        ))}
      </div>
    </div>
  );
};
