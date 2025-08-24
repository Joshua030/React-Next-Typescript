import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Tables } from "../../types/supabase";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

type Settings = Tables<"settings">;
type NewSettingsPayload = Omit<Settings, "id" | "created_at">;
export const useEditSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: editSettingsMutation, isLoading: isUpdating } = useMutation<
    Settings,
    Error,
    NewSettingsPayload
  >({
    mutationFn: (newSettings) => updateSetting(newSettings),
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err: Error | null) => {
      toast.error(err && err?.message);
    },
  });

  return { editSettingsMutation, isUpdating };
};
