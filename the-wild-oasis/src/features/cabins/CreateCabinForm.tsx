import styled from "styled-components";

import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import Input from "../../ui/Input";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Tables } from "../../types/supabase";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

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

interface CreateCabinFormProps {
  cabinToEdit?: Cabin;
  onClose?: () => void;
}

function CreateCabinForm({ cabinToEdit, onClose }: CreateCabinFormProps) {
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditing = Boolean(editId);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<NewCabinPayload>({
    defaultValues: isEditing ? editValues : {},
  });

  const { createCabinMutation, isCreating } = useCreateCabin(reset);

  const { editCabinMutation, inEditing } = useEditCabin(reset);

  const isWorking = isCreating || inEditing;

  const onSubmit: SubmitHandler<NewCabinPayload> = (data) => {
    // const file = data.image?.[0].toString(); // File | undefined
    // if (!file) return;
    console.log("isEditing", isEditing);
    console.log("editId", editId);

    if (isEditing && editId) {
      editCabinMutation(
        { cabinToEdit: data, editId },
        {
          onSuccess: (data) => {
            // Handle success
            onClose?.();
            console.log("Cabin edited successfully:", data);
          },
        }
      );
    } else {
      createCabinMutation(data, {
        onSuccess: () => {
          // Handle success
          onClose?.();
        },
      });
    }
  };

  const onError: SubmitErrorHandler<NewCabinPayload> = (errors) => {
    console.error("Form submission error:", errors);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onClose ? "modal" : "regular"}
    >
      <FormRow label="Cabin name" error={errors.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "Cabin name is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Regular price is required",
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
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
          disabled={isWorking}
          defaultValue=""
          {...register("description", { required: "Description is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors.image?.message}>
        <FileInput
          id="image"
          type="file"
          disabled={isWorking}
          accept="image/*"
          {...register("image", {
            required: !isEditing ? "Cabin photo is required" : false,
          })}
        />
      </FormRow>

      <FormRowDefault>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isWorking}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isWorking}>
          {isEditing ? "Save changes" : "Create cabin"}
        </Button>
      </FormRowDefault>
    </Form>
  );
}

export default CreateCabinForm;
