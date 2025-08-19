import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { ButtonTypes, Order } from "../../../types";
import clsx from "clsx";
import Button from "../../ui/Button";
import { useAppDispatch, useAppSelector } from "../../hooks";
import EmptyCart from "../cart/EmptyCart";
import { clearCart, getTotalCartPrice } from "../cart/cartSlice";
import { store } from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

interface OrderErrors {
  phone?: string;
}

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

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

function CreateOrder() {
  const [withPriorityPrice, setWithPriorityPrice] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useAppSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formErrors = useActionData() as OrderErrors;
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useAppSelector((state) => state.cart.cart);
  const totalCartPrice = useAppSelector(getTotalCartPrice);
  const priorityPrice = withPriorityPrice ? totalCartPrice * 0.2 : 0; // Assuming priority adds a fixed price of $5
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text=xl mb-8 font-semibold">Ready to order? Let's go!</h2>

      <Form method="post">
        <div className="mb-5 flex w-full flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            defaultValue={username}
            name="customer"
            required
            className="input grow"
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
          </div>
          {formErrors?.phone && (
            <p className="mt-2 rounded-md bg-red-700 p-2 text-xs text-red-700">
              {formErrors?.phone}
            </p>
          )}
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              disabled={isLoadingAddress}
              required
              defaultValue={address}
              className={clsx(
                "w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 placeholder:text-stone-400",
                "focus:outline-none focus:ring focus:ring-yellow-400",
                "md:px-6 md:py-3",
              )}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-md bg-red-700 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {position && !position.lat && !position.lng && (
            <span className="absolute right-[3px] top-[3px] z-50 sm:right-[5px] sm:top-[5px]">
              <Button
                disabled={isLoadingAddress}
                type={ButtonTypes.small}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            checked={withPriorityPrice}
            className={clsx(
              "h-6 w-6 accent-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2",
            )} // value={withPriority}
            onChange={(e) => setWithPriorityPrice(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position?.lng && position?.lat
                ? `${position?.lat},${position?.lng}`
                : ""
            }
          />
          <Button
            type={ButtonTypes.primary}
            disabled={isSubmitting || isLoadingAddress}
          >
            {isSubmitting
              ? "Placing order..."
              : ` Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as Record<string, string>;

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  } as Order;

  const errors: OrderErrors = {};

  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number. We might need it to contact you.";
  }

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
