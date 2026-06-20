import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,

    onSuccess: () => {
      toast.success("Update the setting Successfully");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => toast.error("Could not update, try later"),
  });

  return { isUpdating, updateSetting };
}
