import { ButtonTypes, PizzaItem } from "../../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

interface MenuItemProps {
  pizza: PizzaItem;
}

function MenuItem({ pizza }: MenuItemProps) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useAppDispatch();
  const currentQuantity = useAppSelector((state) =>
    getCurrentQuantityById(state, pizza.id),
  );

  const isInCart = currentQuantity > 0;

  const handleAddToCart = () => {
    const cartItem = {
      pizzaId: pizza.id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(cartItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={pizza.id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem PizzaId={pizza.id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type={ButtonTypes.small}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
