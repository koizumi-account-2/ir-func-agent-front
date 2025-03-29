import { useLogin } from "@/hooks/useLogin";
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
    <div>
      <LoginForm afterLogin={afterLogin} />
      <button onClick={() => navigate({ to: "/home" })}>ホーム</button>
    </div>
  );
}
