import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isLoading: isLogin } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (data) => {
      toast.success("Successfully Sign in");
      // put log in data in the cash of react query
      queryClient.setQueryData(["user", data.user]);
  
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("The Password or The Email Is Invailed.");
    },
  });
  return { loginMutation, isLogin };
}
