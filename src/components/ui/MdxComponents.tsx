import type { ReactNode } from "react";
import Link from "next/link";

/** Custom MDX components that apply the Kivox editorial style */
export function getMdxComponents() {
  return {
    h2: (props: { children?: ReactNode }) => (
      <h2
        className="mt-12 mb-4 studio-h3-sans text-foreground"
        {...props}
      />
    ),
    h3: (props: { children?: ReactNode }) => (
      <h3
        className="mt-8 mb-3 studio-h4-sans text-foreground"
        {...props}
      />
    ),
    p: (props: { children?: ReactNode }) => (
      <p
        className="mb-5 studio-body text-foreground max-w-[65ch]"
        {...props}
      />
    ),
    ul: (props: { children?: ReactNode }) => (
      <ul className="mb-5 pl-5 space-y-2 list-disc" {...props} />
    ),
    ol: (props: { children?: ReactNode }) => (
      <ol className="mb-5 pl-5 space-y-2 list-decimal" {...props} />
    ),
    li: (props: { children?: ReactNode }) => (
      <li
        className="studio-body text-foreground marker:text-accent"
        {...props}
      />
    ),
    strong: (props: { children?: ReactNode }) => (
      <strong className="font-semibold text-foreground" {...props} />
    ),
    a: (props: { children?: ReactNode; href?: string }) => (
      <Link
        href={props.href ?? "#"}
        className="text-accent hover:text-accent-hover underline underline-offset-3 decoration-accent/30 hover:decoration-accent transition-colors duration-200"
        {...(props.href?.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {props.children}
      </Link>
    ),
    blockquote: (props: { children?: ReactNode }) => (
      <blockquote
        className="my-8 pl-6 py-1 border-l-2 border-accent/30 studio-body-serif text-muted-foreground italic"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-border" />,
    code: (props: { children?: ReactNode }) => (
      <code className="font-mono text-accent bg-accent-muted px-1.5 py-0.5 rounded-sm text-[0.9em]" {...props} />
    ),
    pre: (props: { children?: ReactNode }) => (
      <pre className="my-6 p-5 bg-surface rounded-lg border border-border overflow-x-auto font-mono text-sm leading-relaxed" {...props} />
    ),
  };
}
