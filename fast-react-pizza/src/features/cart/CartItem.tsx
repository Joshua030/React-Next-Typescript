import { PizzaDetails } from "../../../types";
import { useAppSelector } from "../../hooks";
import { formatCurrency } from "../../utils/helpers";
import { getCurrentQuantityById } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

interface CartItemProps {
  item: PizzaDetails;
}

function CartItem({ item }: CartItemProps) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useAppSelector((state) =>
    getCurrentQuantityById(state, pizzaId),
  );
  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb- sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem PizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
