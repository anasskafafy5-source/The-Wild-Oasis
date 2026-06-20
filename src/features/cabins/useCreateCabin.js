import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useCreateCabin() {
  const queryClient = useQueryClient();
  // for adding a new cabin by useMutation
  const { mutate: createCabinMutation, isLoading } = useMutation({
    mutationFn: (newCabin) => createEditCabin(newCabin),

    onSuccess: () => {
      toast.success("Cabin has Been Added Successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabinMutation, isLoading };
}
