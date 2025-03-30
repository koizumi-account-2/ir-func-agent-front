import { QueryClient } from "@tanstack/react-query";

export type AuthContext = {
  isLogged: () => UserInfo | null;
};

export type UserInfo = {
  userID: string;
  email: string;
  role: string[];
};


export type RouterContext = {
  auth: AuthContext;
  queryClient: QueryClient;
};
