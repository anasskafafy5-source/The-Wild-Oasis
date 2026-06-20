import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUserMutation, isLoading: isUpdating } = useMutation({
    mutationFn: ({ fullName, avatar, password }) =>
      updateCurrentUser({ fullName, avatar, password }),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("Updated the account successfully");
    },
    onError: () => toast.error("could not update, try later"),
  });
  return { updateUserMutation, isUpdating };
}
