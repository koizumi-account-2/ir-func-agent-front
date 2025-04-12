import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { RouterContext } from "@/types/type";
import { useEffect } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

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
  useEffect(() => {
    const handleBeforeUnload = () => {
      // リロードやページ遷移を検知
      console.log("ページがリロードされます");

      // 必要に応じて、警告メッセージを表示することも可能
      // event.returnValue = ''; // これにより、警告ダイアログが表示される（ただし、多くのブラウザではカスタムメッセージは表示されない）
      alert("window.location.pathname" + window.location.pathname);
      localStorage.setItem("isReloaded", window.location.pathname);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      localStorage.removeItem("isReloaded");
    };
  }, []);
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
