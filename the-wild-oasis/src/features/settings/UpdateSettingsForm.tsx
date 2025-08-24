import { useForm } from "react-hook-form";
import { Tables } from "../../types/supabase";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";
import { useSettings } from "./useSettings";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../ui/Button";

type Settings = Tables<"settings">;
type NewSettingsPayload = Omit<Settings, "id" | "created_at">;

const schema = z.object({
  minBookingLength: z.coerce
    .number()
    .min(1, { message: " Minimum Booking Length Required" }),
  maxBookingLength: z.coerce
    .number()
    .min(1, { message: " Maximum Booking Length Required" }),
  maxGuestPerBooking: z.coerce
    .number()
    .min(1, { message: " Maximum Guests Per Booking Required" }),
  breakFastPrice: z.coerce
    .number()
    .min(0, { message: " Breakfast Price Required" }),
});

function UpdateSettingsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<
    z.input<typeof schema>,
    NewSettingsPayload,
    z.output<typeof schema>
  >({ resolver: zodResolver(schema) });

  const { settings, isLoading } = useSettings();

  const { editSettingsMutation, isUpdating } = useEditSettings();

  const handleSettingsChange = (data: NewSettingsPayload) => {
    editSettingsMutation(data, {
      onSuccess: () => {
        reset();
      },
    });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(handleSettingsChange)}>
      <FormRow
        label="Minimum nights/booking"
        error={errors.minBookingLength?.message}
      >
        <Input
          type="number"
          id="min-nights"
          defaultValue={settings?.minBookingLength || 0}
          {...register("minBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow
        label="Maximum nights/booking"
        error={errors.maxBookingLength?.message}
      >
        <Input
          type="number"
          id="max-nights"
          defaultValue={settings?.maxBookingLength || 0}
          {...register("maxBookingLength")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow
        label="Maximum guests/booking"
        error={errors.maxGuestPerBooking?.message}
      >
        <Input
          type="number"
          id="max-guests"
          defaultValue={settings?.maxGuestPerBooking || 0}
          {...register("maxGuestPerBooking")}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price" error={errors.breakFastPrice?.message}>
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={settings?.breakFastPrice || 0}
          {...register("breakFastPrice")}
          disabled={isUpdating}
        />
      </FormRow>
      <Button type="submit" disabled={isUpdating}>
        {isUpdating ? "Saving..." : "Save changes"}
      </Button>
    </Form>
  );
}

export default UpdateSettingsForm;
