import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type TabItem = {
  title: string;
  value: string;
  content: React.ReactNode;
};

interface AppTabProps {
  defaultTab: string;
  items: TabItem[];
}

export const AppTab = ({ defaultTab, items }: AppTabProps) => {
  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList>
        {items.map((item) => (
          <TabsTrigger value={item.value} className="cursor-pointer">
            {item.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent value={item.value}>{item.content}</TabsContent>
      ))}
    </Tabs>
  );
};
