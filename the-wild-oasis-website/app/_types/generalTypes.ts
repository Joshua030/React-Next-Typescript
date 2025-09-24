import { Tables } from "./supabase";

export type Cabin = Tables<"cabins">;
export type booking = Tables<"bookings">;
export type Guest = Tables<"guests">;
export type Settings = Tables<"settings">

export type BookingWithRelations = booking & {
  cabins: Cabin;
};
