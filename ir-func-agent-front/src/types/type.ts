import { QueryClient } from "@tanstack/react-query";

export type AuthContext = {
  isLogged: () => UserInfo | null;
};

export type UserInfo = {
  id: string;
  email: string;
  password: string;
};


export type RouterContext = {
  auth: AuthContext;
  queryClient: QueryClient;
};
