import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { BookingInsert } from "../bookings/BookyngTypes";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: checkin, isPending: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }: { bookingId: number; breakfast: BookingInsert | object }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        breakfast,
      }),

    onSuccess: async (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      // ✅ invalidate both queries and wait until done
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["booking"] }), queryClient.invalidateQueries({ queryKey: ["bookings"] })]);
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in"),
  });

  return { checkin, isCheckingIn };
};
