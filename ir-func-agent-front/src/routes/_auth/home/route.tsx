import useCustomInstance from "@/hooks/useCustomInstance";
import { AXIOS_INSTANCE_SERVER } from "@/lib/apiClient";
import { UserInfo } from "@/types/type";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
  loader: () => {
    return {
      crumb: "Home",
    };
  },
});

function RouteComponent() {
  const customInstance = useCustomInstance<UserInfo>(AXIOS_INSTANCE_SERVER);

  useEffect(() => {
    const authCheck = async () => {
      const response = await customInstance({
        method: "GET",
        url: "/auth",
      });
      console.log(response);
    };
    authCheck();
  }, [customInstance]);
  return <div className="space-y-6">home</div>;
}
