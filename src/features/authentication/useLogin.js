import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export function useLogin() {
  const navigate = useNavigate();
  const querClient = useQueryClient();
  const {
    mutate: login,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: async (user) => {
      querClient.setQueryData(["user"], user.user);
      await new Promise((resolve) => setTimeout(resolve, 200));
      navigate("/");
    },
    onError: (err) => {
      console.log("error:", err);
      toast.error("invalid login credentials");
    },
  });
  return { login, isPending, isSuccess };
}
