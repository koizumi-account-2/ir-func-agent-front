import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LoginForm } from "./-components/LoginForm";
import { healthCheck } from "@/api/springServer";
import { authAtom } from "@/atoms/authAtom";
import { useSetAtom } from "jotai";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const setAuth = useSetAtom(authAtom);
  const afterLogin = () => {
    console.log("afterLogin");
    navigate({ to: "/home" });
  };
  const checkAuth = async () => {
    console.log("checkAuthが実行されました");
    try {
      const res = await healthCheck();
      console.log("healthCheck", res);
      setAuth(res);
      const from = localStorage.getItem("isReloaded");
      console.log("from", from);
      if (from) {
        //localStorage.removeItem("isReloaded");
        navigate({ to: from });
      } else {
        afterLogin();
      }
    } catch (error) {
      console.error(error);
      setAuth(null);
    }
  };
  checkAuth();

  return (
    <div className="flex items-center justify-center h-screen p-4">
      {/* <TestButton onClick={clickHandler} variant={"danger"}>login</TestButton> */}
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <LoginForm afterLogin={afterLogin} />
      </div>
    </div>
  );
}
