import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useEditCabin() {
  // for the (invalidateQueries) to fetch the data after success on mutation
  const queryClient = useQueryClient();

  // [B] For Editing
  const { mutate: editCabinMutation, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),

    onSuccess: () => {
      toast.success("Cabin has Been Successfully Edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabinMutation, isEditing };
}
