"use client";

import { MarkdownViewer } from "@/components/markdown-viewer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export interface ModuleContentItem {
  title: string;
  description: string;
  content: string;
}

interface ModuleContentAccordionProps {
  moduleContent: ModuleContentItem;
  defaultOpen?: boolean;
}

export function ModuleContentAccordion({ 
  moduleContent, 
  defaultOpen = false 
}: ModuleContentAccordionProps) {
  const value = defaultOpen ? "content" : undefined;

  return (
    <Accordion type="single" collapsible defaultValue={value} className="w-full">
      <AccordionItem value="content">
        <AccordionTrigger className="text-xl font-semibold hover:no-underline">
          {moduleContent.title}
        </AccordionTrigger>
        <AccordionContent>
          <div className="mb-4 text-muted-foreground">
            {moduleContent.description}
          </div>
          <MarkdownViewer content={moduleContent.content} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
