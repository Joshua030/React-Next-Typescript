import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

const useDuplicateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: duplicateCabinMMutation, isLoading: isDuplicating } =
    useMutation({
      mutationFn: duplicateCabin,
      onSuccess: () => {
        toast.success("Cabin duplicated successfully!");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (err: Error | null) => {
        toast.error(err && err?.message);
      },
    });

  return { duplicateCabinMMutation, isDuplicating };
};

export default useDuplicateCabin;
