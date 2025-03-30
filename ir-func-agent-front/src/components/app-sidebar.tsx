import { Sidebar } from "@/components/ui/sidebar";
import { CustomSideBarHeader } from "./sideBar/CustomSideBarHeader";
import { CustomSideBarContent } from "./sideBar/CustomSideBarContent";
import { CustomSideBarFooter } from "./sideBar/CustomSideBarFooter";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="offcanvas">
      <CustomSideBarHeader />
      <CustomSideBarContent />
      <CustomSideBarFooter />
    </Sidebar>
  );
}
