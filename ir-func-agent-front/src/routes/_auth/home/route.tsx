import { useConfirmModal } from "@/hooks/useConfirmModal";
import useCustomInstance from "@/lib/getCustomInstance";
import { AXIOS_INSTANCE_SERVER } from "@/api/apiClient";
import { TConfirmModal, UserInfo } from "@/types/type";
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
  const { openConfirmModal } = useConfirmModal();

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
