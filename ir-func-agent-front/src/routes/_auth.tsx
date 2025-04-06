import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { RouterContext } from "@/types/type";
import { Suspense, useEffect } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { createStore, Provider, useSetAtom } from "jotai";
import { useUserContextData } from "@/hooks/useUserContextData";

import { userContextAtom } from "@/atoms/userContextAtom";
export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
  beforeLoad: async ({ context }) => {
    const { auth } = context as RouterContext;
    console.log(auth);
    if (!auth.isLogged()) {
      throw redirect({ to: "/login" });
    } else {
      console.log("auth header", auth.isLogged());
    }
  },
});

function RouteComponent() {
  const setUserContext = useSetAtom(userContextAtom);
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.log("beforeunload");
      e.preventDefault();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);
  // const { data, isLoading, error } = useUserContextData();
  // console.log("useUserContextData", data);
  // setUserContext({
  //   userContext: data?.userContext ?? "",
  //   totalTokens: data?.totalTokens ?? 0,
  // });

  return (
    <SidebarProvider className="h-full">
      <AppSidebar />
      <SidebarInset className="flex flex-col h-full ">
        <div className="sticky top-0 z-50 bg-white border-b">
          <SiteHeader />
        </div>
        <div className="flex flex-col gap-4 p-4 md:gap-6 md:py-6 overflow-y-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
