import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import { PizzaItem } from "../../../types";
import MenuItem from "./MenuItem";

// Loader
export async function loader() {
  const menu: PizzaItem[] = await getMenu();
  return menu;
}

// Type inference from loader
// type LoaderData = Awaited<ReturnType<typeof loader>>;

function Menu() {
  const menu = useLoaderData() as Awaited<ReturnType<typeof loader>>; // ✅ cast to the loader's return type

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
