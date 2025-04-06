import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { LoginForm } from "./-components/LoginForm";
export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const afterLogin = () => {
    navigate({ to: "/home" });
  };

  return (
    <div className="flex items-center justify-center h-screen p-4">
      {/* <TestButton onClick={clickHandler} variant={"danger"}>login</TestButton> */}
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <LoginForm afterLogin={afterLogin} />
      </div>
    </div>
  );
}
