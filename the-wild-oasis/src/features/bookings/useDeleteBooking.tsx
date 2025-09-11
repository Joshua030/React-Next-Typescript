import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingFn } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteBooking, isLoading: isDeleting } = useMutation({
    mutationFn: (bookingId: number) => deleteBookingFn(bookingId),
    onSuccess: async () => {
      toast.success("Cabin deleted successfully");
      await Promise.all([queryClient.invalidateQueries({ queryKey: ["booking"] }), queryClient.invalidateQueries({ queryKey: ["bookings"] })]);
    },
    onError: () => {
      toast.error("Error deleting cabin");
    },
  });

  return { deleteBooking, isDeleting };
};
