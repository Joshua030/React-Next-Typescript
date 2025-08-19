import styled from "styled-components";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { Tables } from "../../types/supabase";
import FormRow from "../../ui/FormRow";

const FormRowDefault = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

type Cabin = Tables<"cabins">;
type NewCabinPayload = Omit<Cabin, "image"> & { image: FileList };

function CreateCabinForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<NewCabinPayload>();
  const { mutate: createCabinMutation, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin created successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
    },
    onError: (err: Error | null) => {
      toast.error(err && err?.message);
    },
  });

  console.log("errors", errors);
  const onSubmit: SubmitHandler<NewCabinPayload> = (data) => {
    // const file = data.image?.[0].toString(); // File | undefined
    // if (!file) return;

    createCabinMutation(data);
  };

  const onError: SubmitErrorHandler<NewCabinPayload> = (errors) => {
    console.error("Form submission error:", errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Maximum capacity is required",
            min: {
              value: 1,
              message: "Minimum capacity is 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            valueAsNumber: true,
            required: "Discount is required",
            validate: (value) => {
              const rp = getValues("regularPrice");

              if (rp == null || Number.isNaN(rp))
                return "Enter a regular price first";
              console.log("rp", rp);
              console.log("value", value);
              return (
                (value as number) <= rp ||
                "Discount cannot exceed regular price"
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          type="file"
          disabled={isCreating}
          accept="image/*"
          {...register("image", { required: "Cabin photo is required" })}
        />
      </FormRow>

      <FormRowDefault>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          Edit cabin
        </Button>
      </FormRowDefault>
    </Form>
  );
}

export default CreateCabinForm;
