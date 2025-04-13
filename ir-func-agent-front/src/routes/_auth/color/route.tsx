import { createFileRoute } from "@tanstack/react-router";
import { ColorAgentForm } from "./-components/ColorAgentForm";

export const Route = createFileRoute("/_auth/color")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ColorAgentForm />;
}
