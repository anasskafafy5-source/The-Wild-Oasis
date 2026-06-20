import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteMutation, isLoading: isDeleting } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
      toast.success(`Deleted Successfully`);
    },
    onError: () => toast.error("Could Not Delete, Try Later"),
  });
  return { deleteMutation, isDeleting };
}
