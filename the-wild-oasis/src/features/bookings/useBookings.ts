import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";
import { PAGE_SIZE } from "../../utils/constants";

export const useBookings = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER

  const filterValue = searchParams.get("status");

  const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue, method: "eq" };

  //SORT

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";

  //PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  //QUERY

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //PREFECTH QUERY
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { bookings, count, isLoading, error };
};
