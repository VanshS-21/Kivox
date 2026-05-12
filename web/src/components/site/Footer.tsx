import Link from "next/link";

import { brand } from "@/content/brand";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold tracking-tight text-foreground">{brand.name}</div>
          <div className="text-sm text-muted-foreground">{brand.locationLine}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <div className="text-muted-foreground">Email</div>
          <div>
            <a
              className="text-foreground hover:text-foreground/80"
              href={`mailto:${brand.contact.email}`}
            >
              {brand.contact.email}
            </a>
          </div>
          <div className="text-muted-foreground">Phone</div>
          <div className="text-foreground">{brand.contact.phone}</div>
          <div className="text-muted-foreground">Social</div>
          <div className="flex items-center gap-4">
            <a
              className="text-foreground hover:text-foreground/80"
              href={brand.socials.linkedin}
              rel="noopener noreferrer"
              target="_blank"
            >
              LinkedIn
            </a>
            <a
              className="text-foreground hover:text-foreground/80"
              href={brand.socials.instagram}
              rel="noopener noreferrer"
              target="_blank"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Link
              className="hover:text-foreground"
              href="/privacy"
            >
              Privacy
            </Link>
            <Link
              className="hover:text-foreground"
              href="/terms"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
