import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signupMutation, isSign } = useSignup();
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  function onSubmit({ email, password, fullName }) {
    signupMutation({ email, password, fullName });
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            required: "This Field Is Requered",
          })}
          disabled={isSign}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This Field Is Requered",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "please sign in with valid email.",
            },
          })}
          disabled={isSign}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This Field Is Requered",
            minLength: {
              value: 8,
              message: "at least 8 character.",
            },
          })}
          disabled={isSign}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This Field Is Requered",
            validate: (value) =>
              value === getValues().password || "password Not Matches",
          })}
          disabled={isSign}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isSign} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isSign}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
