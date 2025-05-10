import { CartItem  } from "@/types/product";

interface Props {
  item: CartItem;
}

export const CheckoutBillItem = ({ item }: Props) => {
  return (
    <div>
      <h4>Name : {item.name}</h4>
      <h4>Price : {item.price}</h4>
      <p>Subtotal : {item.price * item.quantity}</p>
    </div>
  );
};
