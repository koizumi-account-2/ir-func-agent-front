import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "@tanstack/react-router";
import { TConfirmModal } from "@/types/type";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useAtomValue } from "jotai";
import { authAtom } from "@/atoms/authAtom";
export const CustomSideBarFooter = () => {
  const { openConfirmModal } = useConfirmModal();
  const auth = useAtomValue(authAtom);
  const confirmModal: TConfirmModal = {
    isOpen: true,
    title: "test",
    description: "test",
    execLabel: "test",
    cancelLabel: "test",
    execHandler: async () => {
      console.log("logout");
      await logout();
      console.log("logout2");
      navigate({ to: "/login" });
    },
    cancelHandler: () => {
      console.log("test");
    },
  };
  const navigate = useNavigate();
  const { logout } = useLogin();
  const handleLogout = async () => {
    openConfirmModal(confirmModal);
  };
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="/icons/fox.png" alt="John Doe" />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {auth?.email ?? "sample@sample.com"}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {auth?.userID ?? "Guest"}
                  </span>
                </div>
                <MoreVerticalIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="right"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src="/icons/fox.png" alt="John Doe" />
                    <AvatarFallback className="rounded-lg">
                      {auth?.email ?? "sample@sample.com"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {auth?.email ?? "sample@sample.com"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {auth?.userID ?? "Guest"}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};
