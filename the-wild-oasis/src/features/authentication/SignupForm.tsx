import * as z from "zod";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NewUser } from "../../services/servicesTypes";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

const schema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character"),
    passwordConfirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  });

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    criteriaMode: "all",
  });

  function onSubmit({ fullName, email, password }: NewUser) {
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" {...register("fullName")} disabled={isLoading} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" {...register("email")} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" {...register("password")} disabled={isLoading} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" {...register("passwordConfirm")} disabled={isLoading} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <>
          <Button variation="secondary" type="reset">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create new user
          </Button>
        </>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
