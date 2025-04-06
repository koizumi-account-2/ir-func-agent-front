import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_auth/Setting/tsx"!</div>;
}
