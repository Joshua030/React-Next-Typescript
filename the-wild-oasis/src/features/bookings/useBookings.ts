import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export const useBookings = () => {
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get("status");

  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };

  //SORT

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { bookings, isLoading, error };
};
