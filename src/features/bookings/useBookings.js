import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constance";

export default function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //1. FILTER_BOOKING
  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { feild: "status", value: filterValue, method: "eq" };

  // 2. SORTING THE BOOKING

  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [sortByFeild, sortByOrder] = sortByRow.split("-");
  const sortBy = { feild: sortByFeild, direction: sortByOrder };

  //3. pagination
  const page = Number(searchParams.get("pages")) || 1;

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filterValue, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  // preFetching
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });
  }

  if(page > 1){
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterValue, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });
  }

  return { isLoading, bookings, count, error };
}
