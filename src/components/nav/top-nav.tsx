"use client";

import Container from "../container";
import { ThemeToggle } from "../theme-toggle";

export default function TopNav({ title }: { title: string }) {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Strata Website";

  return (
    <Container className="flex h-24 flex-col justify-center border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">{siteName}</h1>
          <h2 className="text-2xl font-medium text-muted-foreground">{title}</h2>
        </div>
        <ThemeToggle />
      </div>
    </Container>
  );
}
