import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: async (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      // ✅ invalidate both queries and wait until done
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["booking"] }), queryClient.invalidateQueries({ queryKey: ["bookings"] })]);
    },

    onError: () => toast.error("There was an error while checking out"),
  });

  return { checkout, isCheckingOut };
};
