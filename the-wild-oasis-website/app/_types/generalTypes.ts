import { Tables } from "./supabase";

export type Cabin = Tables<"cabins">;
export type booking = Tables<"bookings">;

export type BookingWithRelations = booking & {
  cabins: Cabin;
};
