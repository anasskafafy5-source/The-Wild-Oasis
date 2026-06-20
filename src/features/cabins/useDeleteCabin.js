import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useDeleteCabin() {
  // for the invalidQueries which make re-fetching after deleting successfly
  const queryClient = useQueryClient();

  // --using for mutatuins the data (delete , edit ...)
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    // the main function here
    mutationFn: (id) => deleteCabinApi(id),
    // when success do something...
    onSuccess: () => {
      toast.success("cabin Deleted Successfully");
      // to refetching it after deleting successufully
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}
