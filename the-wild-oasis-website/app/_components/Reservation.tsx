import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import { Cabin } from "../_types/generalTypes";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

interface ReservationsProps {
  cabin:Cabin;
}
const Reservation = async ({ cabin }: ReservationsProps) => {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin?.id.toString()),
  ]);
  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector settings={settings} bookDates={bookedDates} cabin={cabin} />
      <ReservationForm cabin={cabin} />
    </div>
  );
};

export default Reservation;
