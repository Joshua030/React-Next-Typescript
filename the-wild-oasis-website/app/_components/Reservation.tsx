import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_types/generalTypes";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

interface ReservationsProps {
  cabin: Cabin;
}
const Reservation = async ({ cabin }: ReservationsProps) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id.toString()),
  ]);
  const session = await auth();
  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector settings={settings} bookDates={bookedDates} cabin={cabin} />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
};

export default Reservation;
