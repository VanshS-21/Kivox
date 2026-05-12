import Link from "next/link";

import { brand } from "@/content/brand";
import { navigation } from "@/content/navigation";
import { ThemeToggle } from "@/components/site/ThemeToggle";
import { Container } from "@/components/ui/Container";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex items-center justify-between py-4">
        <Link className="text-sm font-semibold tracking-tight text-foreground" href="/">
          {brand.name}
        </Link>
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
            {navigation.primary.map((item) => (
              <Link
                className="text-sm text-muted-foreground transition hover:text-foreground"
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
