import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./useUpdateUser";

// Define the form data type
interface UpdatePasswordFormData {
  password: string;
  passwordConfirm: string;
}

function UpdatePasswordForm() {
  // Type the useForm hook with your form data interface
  const { register, handleSubmit, formState, getValues, reset } = useForm<UpdatePasswordFormData>();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  // Type the onSubmit function properly
  const onSubmit: SubmitHandler<UpdatePasswordFormData> = ({ password }) => {
    updateUser({ password }, { onSuccess: () => reset() });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => getValues("password") === value || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <>
          <Button onClick={reset} type="reset" variation="secondary" disabled={isUpdating}>
            Cancel
          </Button>
          <Button disabled={isUpdating}>Update password</Button>
        </>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
