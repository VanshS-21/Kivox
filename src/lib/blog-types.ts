/** Shared blog types — safe to import in client components */

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  content: string;
};

export type BlogPostMeta = Omit<BlogPost, "content">;

/** Format a date string into a readable format */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
