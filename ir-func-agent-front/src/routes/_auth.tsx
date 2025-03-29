import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { RouterContext } from "@/types/type";
import { useEffect } from "react";
export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
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
      e.returnValue = "やめとけ";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  return (
    <div>
      <>AUTH</>
      <Outlet />
    </div>
  );
}
