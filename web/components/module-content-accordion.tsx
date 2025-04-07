"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ExternalLink, Plus as PlusIcon } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";

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
}: ModuleContentAccordionProps) {
  // Parse the markdown to extract sections
  const { title, sections } = parseMarkdownSections(moduleContent.content);

  // Custom components for ReactMarkdown
  const components: Components = {
    a: ({ children, ...props }) => (
      <a
        {...props}
        className="text-blue-500 hover:text-blue-700 inline-flex items-center gap-1 transition-colors font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <ExternalLink className="h-3.5 w-3.5 inline" />
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul {...props} className="list-disc pl-5 my-3 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol {...props} className="list-decimal pl-5 my-3 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li {...props} className="ml-2">
        {children}
      </li>
    ),
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
          <p className="text-muted-foreground">{moduleContent.description}</p>
        </div>

        <Accordion type="multiple" className="w-full">
          {sections.map((section, index) => (
            <AccordionItem
              key={index}
              value={`section-${index}`}
              className="border-b border-muted py-2"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 rounded-md py-2 text-left text-lg font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>svg>path:last-child]:rotate-90 [&[data-state=open]>svg>path:last-child]:opacity-0">
                  {section.title}
                  <PlusIcon
                    size={16}
                    className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                    aria-hidden="true"
                  />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="pt-2 pb-4 px-3">
                <div className="max-w-none">
                  <ReactMarkdown components={components}>
                    {section.content}
                  </ReactMarkdown>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}

// Function to parse markdown content into sections
function parseMarkdownSections(markdown: string) {
  // Extract title and introduction
  const titleMatch = markdown.match(/^# (.+?)(?:\n|$)/);
  const title = titleMatch ? titleMatch[1].trim() : "Module Content";

  // Find all section headings and their content
  const sectionRegex =
    /## ([^\n]+)(?:\r?\n)([\s\S]*?)(?=\n## |\n# |\n\n## |\n\n# |$)/g;

  // Prepare array to store sections
  const sections: { title: string; content: string }[] = [];
  let match;

  // Extract all sections with their content
  while ((match = sectionRegex.exec(markdown)) !== null) {
    sections.push({
      title: match[1].trim(),
      content: match[2].trim(),
    });
  }

  return { title, sections };
}
