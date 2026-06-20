import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function useLogout() {
  const navigate = useNavigate();
  const queyClient = useQueryClient();
  const { mutate: logoutMutation, isLoading } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success("Loged out Successfully!");
      queyClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: () => toast.error("could Not log out , try later"),
  });
  return { logoutMutation, isLoading };
}
