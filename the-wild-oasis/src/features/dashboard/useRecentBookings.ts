import { subDays } from "date-fns";
import { useSearchParams } from "react-router";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

export const useRecentBookings = () => {
  const [serachParams] = useSearchParams();

  const numDays = !serachParams.get("last") ? 7 : Number(serachParams.get("last"));

  const queryDate = subDays(new Date(), 25).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
};
