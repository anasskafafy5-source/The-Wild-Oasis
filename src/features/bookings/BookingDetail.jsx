import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./useBooking";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import useCheckOut from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import { MdDelete } from "react-icons/md";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteBooking from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  const { checkoutMutation, isCheckingOut } = useCheckOut();
  const { booking, isLoading } = useBooking();
  const { deleteMutation, isDeleting } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName={"Booking"} />;
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Modal>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkIn/${bookingId}`)}>
            Check In
          </Button>
        )}

        {status === "checked-in" && (
          <Button
            icon={<IoIosLogOut />}
            onClick={() => checkoutMutation(bookingId)}
            disabled={isCheckingOut}
          >
            Check Out
          </Button>
        )}
        <Modal.Open opens={"delete"}>
          <Button variation="danger" icon={<MdDelete />}>
            <span> Delete</span>
          </Button>
        </Modal.Open>
      </ButtonGroup>
      <Modal.Window name={"delete"}>
        <ConfirmDelete
          resourceName={"Booking"}
          onConfirm={() => {
            deleteMutation(bookingId, { onSettled: () => navigate(-1) });
          }}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default BookingDetail;
