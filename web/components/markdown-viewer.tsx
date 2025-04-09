"use client";

import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({
  content,
  className = "",
}: MarkdownViewerProps) {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6 prose dark:prose-invert max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </CardContent>
    </Card>
  );
}
