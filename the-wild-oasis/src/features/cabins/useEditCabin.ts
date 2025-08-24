import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../types/supabase";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";

type Cabin = Tables<"cabins">;
type NewCabinPayload = Omit<Cabin, "image"> & { image: FileList };
type EditVars = { cabinToEdit: NewCabinPayload; editId: number };
export const useEditCabin = (reset: UseFormReset<NewCabinPayload>) => {
  const queryClient = useQueryClient();
  const { mutate: editCabinMutation, isLoading: inEditing } = useMutation<
    Cabin,
    Error,
    EditVars
  >({
    mutationFn: ({ cabinToEdit, editId }) =>
      createEditCabin(cabinToEdit, editId),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error | null) => {
      toast.error(err && err?.message);
    },
  });

  return { editCabinMutation, inEditing };
};
