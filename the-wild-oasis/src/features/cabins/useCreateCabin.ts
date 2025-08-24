import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";
import { Tables } from "../../types/supabase";

type Cabin = Tables<"cabins">;
type NewCabinPayload = Omit<Cabin, "image"> & { image: FileList };

export const useCreateCabin = (reset?: UseFormReset<NewCabinPayload>) => {
  const queryClient = useQueryClient();

  const { mutate: createCabinMutation, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset?.();
    },
    onError: (err: Error | null) => {
      toast.error(err && err?.message);
    },
  });

  return { createCabinMutation, isCreating };
};
