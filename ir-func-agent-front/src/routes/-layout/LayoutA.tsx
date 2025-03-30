import { ReactNode } from "react";

interface LayoutProps {
  header: ReactNode;
  content: ReactNode;
  footer: ReactNode;
}

export const LayoutA = ({ header, content, footer }: LayoutProps) => {
  return (
    <div className="h-svh max-h-svh">
      <div className="flex w-full">
        <div>SIDE</div>
        <div className="flex flex-1 flex-col h-screen">
          {header}
          <div className="p-4 overflow-auto">{content}</div>
        </div>
      </div>
    </div>
  );
};
