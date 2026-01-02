import useSWR from "swr";
import api from "../libs/axios";

export const useUserSession = () => {
  const { data, error, mutate } = useSWR("/auth/session", async () => {
    const res = await api.get("/auth/session");
    return res.data.data;
  });

  return {
    user: data,
    isLoading: !error && !data,
    isError: !!error,
    mutate,
  };
};
