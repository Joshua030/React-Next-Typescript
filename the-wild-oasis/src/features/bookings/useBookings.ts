import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get("status");

  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings(filter),
  });

  return { bookings, isLoading, error };
};
