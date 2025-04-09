"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Lightbulb } from "lucide-react";
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

interface ContentSection {
  title: string;
  content: string;
  position: number;
  type: string;
}

interface HeadingSection {
  title: string;
  position: number;
  type: string;
}

export function ModuleContentAccordion({
  moduleContent,
  defaultOpen = false,
}: ModuleContentAccordionProps) {
  // Parse the markdown to extract sections
  const { title, introduction, headings, sections } = parseMarkdownSections(
    moduleContent.content
  );

  // Custom components for ReactMarkdown
  const components: Components = {
    a: ({
      href,
      children,
      ...props
    }: React.ComponentPropsWithoutRef<"a"> & { node?: any }) => {
      if (!href) return <>{children}</>;

      return (
        <a
          href={href}
          {...props}
          className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 transition-colors font-medium break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <ExternalLink
            className="h-3.5 w-3.5 inline-block flex-shrink-0"
            aria-hidden="true"
          />
        </a>
      );
    },
    ul: ({ children, ...props }: React.ComponentPropsWithoutRef<"ul">) => (
      <ul {...props} className="list-disc pl-5 my-3 space-y-1">
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: React.ComponentPropsWithoutRef<"ol">) => (
      <ol {...props} className="list-decimal pl-5 my-3 space-y-1">
        {children}
      </ol>
    ),
    li: ({ children, ...props }: React.ComponentPropsWithoutRef<"li">) => (
      <li {...props} className="ml-2">
        {children}
      </li>
    ),
    p: ({ children, ...props }: React.ComponentPropsWithoutRef<"p">) => (
      <p {...props} className="my-2 break-words">
        {children}
      </p>
    ),
  };

  // Function to render content blocks - renders sections and headings in order
  const renderContentBlocks = () => {
    // Define a common type for all blocks
    type ContentBlock = HeadingSection | ContentSection;

    // Combine headings and sections into a single array to maintain order
    const allBlocks: ContentBlock[] = [...headings, ...sections].sort(
      (a, b) => a.position - b.position
    );

    return allBlocks.map((block, index) => {
      if (block.type === "heading") {
        // Render headings as normal headers
        // Import BookOpen at the top of your file
        // Add this with your other imports: import { BookOpen, ExternalLink } from "lucide-react";
        return (
          <div key={`heading-${index}`} className="my-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              {block.title}
            </h3>
          </div>
        );
      } else {
        // Render sections as accordion items
        // TypeScript check - ensure that 'content' is available
        const sectionBlock = block as ContentSection;
        return (
          <AccordionItem
            key={`section-${index}`}
            value={`section-${index}`}
            className="border-b border-muted py-2"
          >
            <AccordionTrigger className="text-lg py-2">
              {sectionBlock.title}
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-4 px-3">
              <div className="max-w-none">
                <ReactMarkdown components={components}>
                  {sectionBlock.content}
                </ReactMarkdown>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      }
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-primary mb-2">{title}</h2>
          <p className="text-muted-foreground">{moduleContent.description}</p>
        </div>

        {/* Introduction text */}
        {introduction && (
          <div className="mb-6">
            <ReactMarkdown components={components}>
              {introduction}
            </ReactMarkdown>
          </div>
        )}

        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={
            defaultOpen ? sections.map((_, i) => `section-${i}`) : undefined
          }
        >
          {renderContentBlocks()}
        </Accordion>
      </CardContent>
    </Card>
  );
}

// Function to parse markdown content into sections, headings and introduction
function parseMarkdownSections(markdown: string) {
  // Extract title (level 1 heading)
  const titleMatch = markdown.match(/^# (.+?)(?:\n|$)/);
  const title = titleMatch ? titleMatch[1].trim() : "Module Content";

  // Extract introduction text (content between the title and the first heading)
  let introduction = "";
  if (titleMatch) {
    const introMatch = markdown
      .substring(titleMatch[0].length)
      .match(/^([\s\S]*?)(?=\n## |\n# |$)/);
    if (introMatch) {
      introduction = introMatch[1].trim();
    }
  }

  // Find all section headings and their content
  const sectionRegex =
    /(?:^|\n)(#{2,3}) ([^\n]+)(?:\r?\n)([\s\S]*?)(?=\n#{2,3} |\n# |$)/g;

  // Prepare arrays to store sections and headings
  const sections: ContentSection[] = [];
  const headings: HeadingSection[] = [];

  // Extract all sections with their content
  let match;
  let position = 0;

  // Reset regex
  sectionRegex.lastIndex = 0;

  while ((match = sectionRegex.exec(markdown)) !== null) {
    position++;
    const headingLevel = match[1].length; // Count # symbols to determine heading level
    const sectionTitle = match[2].trim();
    let sectionContent = match[3].trim();

    // Check if this is a heading without significant content
    // A heading with no content or just whitespace or with very short content (likely not a real section)
    if (!sectionContent || sectionContent.length < 10) {
      headings.push({
        title: sectionTitle,
        position: position,
        type: "heading",
      });
    } else {
      // Regular section with content
      sections.push({
        title: sectionTitle,
        content: sectionContent,
        position: position,
        type: "section",
      });
    }
  }

  return { title, introduction, headings, sections };
}
