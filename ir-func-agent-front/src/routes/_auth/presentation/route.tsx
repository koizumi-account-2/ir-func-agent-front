import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { userContextAtom } from "@/atoms/userContextAtom";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { authAtom } from "@/atoms/authAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { useUserContextData } from "@/hooks/useUserContextData";
import { processLabels } from "./-util/getLabelData";
import { presentationAgentStateAtom } from "@/atoms/presentationAgentStateAtom";
export const Route = createFileRoute("/_auth/presentation")({
  component: RouteComponent,
  pendingComponent: () => <div>Loading...</div>,
});

function RouteComponent() {
  const auth = useAtomValue(authAtom);
  const setUserContext = useSetAtom(userContextAtom);

  // UserContextを取得し、グローバルにセット
  const { data } = useUserContextData();
  setUserContext({
    userContext: data?.userContext ?? "",
    totalTokens: data?.totalTokens ?? 0,
  });
  console.log("auth here", auth);
  return (
    <div className="flex h-full flex-col gap-4">
      <RequestBreadCrumb />
      <div className="h-[calc(100%-20px)]">
        <Outlet />
      </div>
    </div>
  );
}
const RequestBreadCrumb = () => {
  const presentationAgentState = useAtomValue(presentationAgentStateAtom);
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {processLabels.map((item, index) => (
          <BreadcrumbItem key={item.href}>
            <Link
              activeProps={{
                className: "text-accent-foreground bg-primary/10",
              }}
              to={item.href}
              disabled={!item.condition(presentationAgentState)}
            >
              {item.label}
            </Link>
            {index !== processLabels.length - 1 && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
