import { ButtonTypes } from "../../../types";
import { useAppDispatch } from "../../hooks";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";

interface DeleteItemProps {
  PizzaId: number;
}
const DeleteItem = ({ PizzaId }: DeleteItemProps) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      type={ButtonTypes.small}
      onClick={() => dispatch(deleteItem(PizzaId))}
    >
      Delete
    </Button>
  );
};

export default DeleteItem;
