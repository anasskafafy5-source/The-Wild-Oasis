import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export default function useSignup() {
  const { mutate: signupMutation, isLoading: isSign } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      //   console.log(data);
      toast.success("account successfully created! please verify the email");
    },
    onError: () => toast.error("Could not sign up try later"),
  });
  return { signupMutation, isSign };
}
