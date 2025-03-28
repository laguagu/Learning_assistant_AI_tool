"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ExternalLink, GraduationCap, Plus as PlusIcon } from "lucide-react";
import ReactMarkdown, { Components } from "react-markdown";

interface MarkdownPlanViewerProps {
  markdown: string;
  loading?: boolean;
}

/**
 * Enhanced component that parses markdown into sections and displays them as accordions
 * with better styling and handling of duplicate content
 */
export function MarkdownPlanViewer({
  markdown,
  loading = false,
}: MarkdownPlanViewerProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-24 w-full" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!markdown) {
    return (
      <Alert>
        <AlertTitle>No learning plan available</AlertTitle>
        <AlertDescription>
          There is no learning plan for this user.
        </AlertDescription>
      </Alert>
    );
  }

  // Preprocess the markdown to replace <br> tags with proper Markdown line breaks
  let processedMarkdown = markdown.replace(/<br>/g, "  \n");

  // Convert plain URLs to Markdown links
  // This regex finds URLs starting with http:// or https:// that aren't already part of a Markdown link
  processedMarkdown = processedMarkdown.replace(
    /(?<!!)\[(https?:\/\/[^\s\]]+)\]|\b(https?:\/\/[^\s]+)\b/g,
    (match, p1, p2) => {
      const url = p1 || p2;
      return `[${url}](${url})`;
    }
  );

  // Extract title and introduction
  const titleMatch = processedMarkdown.match(/^# (.+?)(?:\n|$)/);
  const title = titleMatch ? titleMatch[1] : "Learning Plan";

  // Find introduction - text between the title and first section heading
  const introMatch = processedMarkdown.match(
    /^# .+?\n\n(.*?)(?=\n## |\n# |\n\n## |\n\n# |$)/s
  );
  const introduction = introMatch ? introMatch[1] : "";

  // Find all section headings and their content
  const sectionRegex =
    /## (\d+\.\s*[^\n]+)(?:\r?\n)([\s\S]*?)(?=\n## |\n# |\n\n## |\n\n# |$)/g;

  // Prepare array to store sections
  const sections = [];
  let match;

  // Extract all sections with their content
  while ((match = sectionRegex.exec(processedMarkdown)) !== null) {
    sections.push({
      title: match[1].trim(),
      content: match[2].trim(),
    });
  }

  // Find conclusion - any text after the last section that isn't already captured
  // and doesn't start with a heading
  let conclusion = "";
  if (sections.length > 0) {
    const lastSectionEnd = sectionRegex.lastIndex;
    if (lastSectionEnd < processedMarkdown.length) {
      const remainingText = processedMarkdown.substring(lastSectionEnd).trim();
      // Only include text that doesn't start with a heading
      if (remainingText && !remainingText.startsWith("#")) {
        conclusion = remainingText;
      }
    }
  }

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
      <CardHeader className="pb-4 border-b border-muted flex justify-between items-start">
        <div>
          <CardTitle className="text-2xl font-bold text-primary mb-2">
            {title}
          </CardTitle>
          {introduction && (
            <div className="text-base text-muted-foreground mt-2 prose prose-sm max-w-none">
              <ReactMarkdown components={components}>
                {introduction}
              </ReactMarkdown>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
          <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          <span>Your personalized learning material</span>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
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

        {conclusion && (
          <>
            <Separator className="my-6" />
            <div className="pt-2 max-w-none">
              <ReactMarkdown components={components}>
                {conclusion}
              </ReactMarkdown>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
