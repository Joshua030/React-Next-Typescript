import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
import { BookingStatus, BookingWithRelations } from "./BookyngTypes";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiArrowUpOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
// import { formatDistanceFromNow } from "../../utils/helpers";

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

interface BookingRowProps {
  booking: BookingWithRelations;
}

type TagType = "blue" | "green" | "silver";

function BookingRow({ booking: { id: bookingId, startDate, endDate, numNights, totalPrice, status, guests, cabins } }: BookingRowProps) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  } as const satisfies Record<BookingStatus, TagType>;

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();

  const { name: cabinName } = cabins ?? {};
  const { fullName: guestName, email } = guests ?? {};

  const safeStatus: BookingStatus = status && status in statusToTagName ? (status as BookingStatus) : "unconfirmed";

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        {startDate !== null && endDate !== null && (
          <Stacked>
            <span>
              {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(new Date(startDate))} &rarr; {numNights} night stay
            </span>
            <span>
              {format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
            </span>
          </Stacked>
        )}

        <Tag type={statusToTagName[safeStatus]}>{safeStatus.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice || 0)}</Amount>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)} icon={<HiEye />}>
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)} icon={<HiArrowDownOnSquare />}>
                Check in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button onClick={() => checkout({ bookingId })} disabled={isCheckingOut} icon={<HiArrowUpOnSquare />}>
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete resourceName="booking" disabled={isDeleting} onConfirm={() => deleteBooking(bookingId)} />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
