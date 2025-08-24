import { Tables } from "../../types/supabase";

export type BookingRow = Tables<"bookings">;
export type BookingInsert = Omit<BookingRow, "cabinPrice" | "extrasPrice" | "id" | "numNights" | "status" | "totalPrice">;
type CabinMini = Pick<Tables<"cabins">, "name">;
type GuestMini = Pick<Tables<"guests">, "fullName" | "email">;

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export type BookingWithRelations = BookingRow & {
  cabins: CabinMini | null;
  guests: GuestMini | null;
};
