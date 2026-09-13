import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, userLogin, userLogOut } from "../api";

export function useLogin() {
  return useMutation({
    mutationFn: userLogin,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: userLogOut,
  });
}

export function useGetMe() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
}
