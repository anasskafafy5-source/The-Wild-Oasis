import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckOut() {
  const queryClient = useQueryClient();
  const { mutate: checkoutMutation, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),
    onSuccess: (data) => {
      toast.success(`Checked-out Successfully #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: "bookings",
      });
    },
    onError: () => toast.error("Could Not Checked-out, Try Later."),
  });
  return { checkoutMutation, isCheckingOut };
}
