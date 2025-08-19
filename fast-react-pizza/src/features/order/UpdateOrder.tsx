import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import { ButtonTypes, OrderData } from "../../../types";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

interface UpdateOrderProps {
  order: OrderData;
}

const UpdateOrder = ({ order }: UpdateOrderProps) => {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type={ButtonTypes.primary}> Make priority</Button>
    </fetcher.Form>
  );
};

// Loader
export async function action({ params }: ActionFunctionArgs) {
  const data = { priority: true };
  await updateOrder(params.orderId as string, data);
  return null;
}

export default UpdateOrder;
