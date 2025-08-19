import { ButtonTypes } from "../../../types";
import { useAppDispatch } from "../../hooks";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

interface UpdateItemQuantityProps {
  pizzaId: number;
  currentQuantity: number;
}

const UpdateItemQuantity = ({
  pizzaId,
  currentQuantity,
}: UpdateItemQuantityProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type={ButtonTypes.round}
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button
        type={ButtonTypes.round}
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
};

export default UpdateItemQuantity;
