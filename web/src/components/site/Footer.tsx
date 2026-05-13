import Link from "next/link";

import { brand } from "@/content/brand";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand section */}
          <div className="flex flex-col gap-3">
            <div className="text-lg font-sans font-bold tracking-tight text-foreground">{brand.name}</div>
            <div className="studio-caption">{brand.locationLine}</div>
          </div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-4 text-sm">
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Email</div>
              <a
                className="text-foreground hover:text-accent transition-colors"
                href={`mailto:${brand.contact.email}`}
              >
                {brand.contact.email}
              </a>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Phone</div>
              <div className="text-foreground">{brand.contact.phone}</div>
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="studio-eyebrow text-muted-foreground opacity-60">Social</div>
              <div className="flex items-center gap-4">
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.linkedin}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  LinkedIn
                </a>
                <a
                  className="text-foreground hover:text-accent transition-colors"
                  href={brand.socials.instagram}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-3">
            <div className="studio-eyebrow text-muted-foreground opacity-60">Legal</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                className="text-foreground hover:text-accent transition-colors"
                href="/privacy"
              >
                Privacy Policy
              </Link>
              <Link
                className="text-foreground hover:text-accent transition-colors"
                href="/terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="studio-caption">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
