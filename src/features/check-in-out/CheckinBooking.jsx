import { useEffect, useState } from "react";
import styled from "styled-components";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/useBooking";
import useCheckIn from "./useCheckIn";
import { formatCurrency } from "../../utils/helpers";
import useSettings from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isBreakfast, setIsBreakfast] = useState(false);

  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();

  const { checkedInMutation, isLoading: isChecking } = useCheckIn();
  const { settings, isLoading: isLoadingSetting } = useSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking]);

  if (isLoading || isChecking || isLoadingSetting) return <Spinner />;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const totalPriceOfBreakfast = settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (isBreakfast) {
      checkedInMutation({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalPriceOfBreakfast,
          totalPrice: totalPriceOfBreakfast + totalPrice,
        },
      });
    } else {
      checkedInMutation({ bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <CheckBox
            checked={isBreakfast}
            id={"breakfast"}
            onChange={() => {
              setIsBreakfast((i) => !i);
              setConfirmPaid(false);
            }}
          >
            Want To Add A BreakFast For {formatCurrency(totalPriceOfBreakfast)}
          </CheckBox>
        </Box>
      )}
      <Box>
        <CheckBox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((c) => !c)}
          disabled={confirmPaid}
        >
          I Confirm That {guests.fullName} has Paid The Total Amount{" "}
          {formatCurrency(totalPrice + totalPriceOfBreakfast)} (
          {formatCurrency(totalPrice)} + {formatCurrency(totalPriceOfBreakfast)}
          )
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
