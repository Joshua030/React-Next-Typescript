import LinkButton from "../../ui/LinkButton";
import Button from "../../ui/Button";
import { ButtonTypes } from "../../../types";
import CartItem from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { clearCart } from "./cartSlice";
import EmptyCart from "./EmptyCart";

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const userName = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {userName}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type={ButtonTypes.primary} to="/order/new">
          Order pizzas
        </Button>
        <Button
          type={ButtonTypes.secondary}
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
