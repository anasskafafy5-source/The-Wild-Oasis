import styled from "styled-components";
import { format, isToday } from "date-fns";
import { FaEye } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { MdDelete } from "react-icons/md";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import useCheckOut from "../check-in-out/useCheckOut";
import useDeleteBooking from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: name },
  },
}) {
  const navigate = useNavigate();
  const { checkoutMutation, isCheckingOut } = useCheckOut();
  const { deleteMutation, isDeleting } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{name}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<FaEye />}
              onClick={() => navigate(`/booking/${bookingId}`)}
            >
              Deatails
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<MdLibraryAdd />}
                onClick={() => navigate(`/checkIn/${bookingId}`)}
              >
                Check In
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                icon={<IoIosLogOut />}
                onClick={() => checkoutMutation(bookingId)}
                disabled={isCheckingOut}
              >
                Check Out
              </Menus.Button>
            )}
            <Modal.Open opens={"delete"}>
              <Menus.Button icon={<MdDelete />}>
                <span> Delete</span>
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus>
        <Modal.Window name={"delete"}>
          <ConfirmDelete
            resourceName={"Booking"}
            onConfirm={() => deleteMutation(bookingId)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
