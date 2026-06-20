import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckIn() {
  const queryClient = useQueryClient();
  const { mutate: checkedInMutation, isLoading } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true , ...breakfast }),

    onSuccess: (data) => {
      toast.success(`Check-in Successfully #${data.id}`);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: () => toast.error("Could Not Check-in, try later"),
  });

  return { checkedInMutation, isLoading };
}
