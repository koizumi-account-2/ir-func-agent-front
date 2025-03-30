import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { RouterContext } from "@/types/type";
import { useEffect } from "react";
import { LayoutA } from "./-layout/LayoutA";
export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    return;
    const { auth } = context as RouterContext;
    console.log(auth);
    if (!auth.isLogged()) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log("beforeunload");
      e.preventDefault(); // 一部ブラウザではこれが必要
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  return (
    <div>
      <LayoutA
        header={<div>header</div>}
        content={<Outlet />}
        footer={<div>footer</div>}
      />
    </div>
  );
}
