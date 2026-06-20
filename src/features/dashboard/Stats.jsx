import Stat from "./Stat";
import { FaBagShopping } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { MdOutlineDateRange } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
  //1.
  const numBookings = bookings.length;
  //2.
  const sales = bookings.reduce(
    (total, booking) => total + booking.totalPrice,
    0,
  );
  //3.
  const numCheckIns = confirmedStays.length;
  //4. occaptions
  const occupations =
    confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
    (numDays * cabinsCount);
  return (
    <>
      <Stat
        title="Bookings"
        value={numBookings}
        color="blue"
        icon={<FaBagShopping />}
      />
      <Stat
        title="Sales"
        value={formatCurrency(sales)}
        color="green"
        icon={<FaMoneyCheckDollar />}
      />
      <Stat
        title="Check-ins"
        value={numCheckIns}
        color="indigo"
        icon={<MdOutlineDateRange />}
      />
      <Stat
        title="Occupancy rate"
        value={Math.round(occupations * 100) + "%"}
        color="yellow"
        icon={<CiWifiOn />}
      />
    </>
  );
}

export default Stats;
