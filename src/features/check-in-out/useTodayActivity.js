import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export default function useTodayActivity() {
  const {
    data: todayActivity,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });
  return { todayActivity, isLoading, error };
}
