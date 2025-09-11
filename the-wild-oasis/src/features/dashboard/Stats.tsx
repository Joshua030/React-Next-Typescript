import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBarSquare } from "react-icons/hi2";
import type { BookingComplete } from "../bookings/BookyngTypes";
import Stat from "./Stat";
export type confirmedStays =
  | {
      cabinId: number | null;
      cabinPrice: number | null;
      created_at: string;
      endDate: string | null;
      extrasPrice: number | null;
      guestId: number | null;
      hasBreakfast: boolean | null;
      id: number;
      isPaid: boolean | null;
      numGuests: number | null;
      numNights: number | null;
      observations: string | null;
      startDate: string | null;
      status: string | null;
      totalPrice: number | null;
      guests: {
        fullName: string | null;
      } | null;
    }[]
  | undefined;

interface StatsProps {
  bookings: Pick<BookingComplete, "created_at" | "totalPrice" | "extrasPrice">[];
  confirmedStays: confirmedStays;
  numDays: number;
  cabinCount: number;
}

const Stats = ({ bookings, confirmedStays, numDays, cabinCount }: StatsProps) => {
  console.log("bookings", bookings);
  // 1. Number of bookings
  const numBookings = bookings.length;

  //2. Total  Sales
  const sales = bookings.reduce((acc, cur) => acc + (cur.totalPrice ?? 0), 0);

  //3. Total checkings

  const checkins = confirmedStays?.length || 0;

  //4. Occupancy rate

  const occupation = confirmedStays?.reduce((acc, cur) => acc + (cur?.numNights ?? 0), 0) ?? 0 / (numDays * cabinCount);

  return (
    <>
      <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase />} value={numBookings} />
      <Stat title="Sales" color="green" icon={<HiOutlineBanknotes />} value={sales} />
      <Stat title="Checks ins" color="indigo" icon={<HiOutlineCalendarDays />} value={checkins} />
      <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBarSquare />} value={Math.round(occupation / 100)} />
    </>
  );
};

export default Stats;
