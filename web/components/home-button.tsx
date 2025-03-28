"use client";

import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function HomeButton() {
  return (
    <Link href="/" passHref>
      <Button
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 flex items-center gap-1 z-10"
      >
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Button>
    </Link>
  );
}
