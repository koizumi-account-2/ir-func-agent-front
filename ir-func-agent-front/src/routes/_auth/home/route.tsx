import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/home")({
  component: RouteComponent,
  loader: () => {
    return {
      crumb: "Home",
    };
  },
});

function RouteComponent() {
  return <div className="space-y-6">home</div>;
}
