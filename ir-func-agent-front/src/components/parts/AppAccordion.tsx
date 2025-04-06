import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React, { useState } from "react";

export type AppAccordionItem = {
  title: string;
  triger: React.ReactNode;
  content: React.ReactNode;
};

export const AppAccordion = ({
  items,
  defaultOpenItems,
}: {
  items: AppAccordionItem[];
  defaultOpenItems: string[];
}) => {
  console.log(defaultOpenItems);
  const [openItems, setOpeningAccordionItem] =
    useState<string[]>(defaultOpenItems);

  const onValueChange = (values: string[]) => {
    setOpeningAccordionItem(values);
  };
  return (
    <>
      {/* <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          onClick={() =>
            setOpeningAccordionItem(items.map((item) => item.title))
          }
        >
          全てOPEN
        </Button>
        <Button variant="outline" onClick={() => setOpeningAccordionItem([])}>
          全てCLOSE
        </Button>
      </div> */}
      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={onValueChange}
      >
        {items.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger className="cursor-pointer">
              {item.triger}
            </AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
