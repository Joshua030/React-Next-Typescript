export interface PizzaItem {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
}

/**
 * A reusable interface for the core details of a pizza item.
 */
interface PizzaDetails {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

/**
 * Represents a single item in the order's shopping cart.
 * It extends the `PizzaDetails` to reuse its properties.
 */
export interface CartItem extends PizzaDetails {
  addIngredients: string[];
  removeIngredients: string[];
}

/**
 * Represents the main data object for a single order.
 */
interface OrderData {
  customer: string;
  status: string; // Consider making this a union type like "pending" | "delivered" if possible
  priority: boolean;
  cart: CartItem[];
  id: string;
  estimatedDelivery: string; // The API returns this as a string, you might convert it to a Date object later
  orderPrice: number;
  priorityPrice: number;
}

/**
 * The top-level type for the entire API response.
 *
 * This type uses a literal string for the `status` to ensure
 * it can only be "success", which is a common pattern for API responses.
 */
export interface OrderApiResponse {
  status: "success";
  data: OrderData;
}

export interface Order {
  customer: string;
  phone: string;
  address: string;
  cart: PizzaDetails[];
  priority: boolean;
}
