import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

import type { BlogPost, BlogPostMeta } from "./blog-types";

export type { BlogPost, BlogPostMeta };
export { formatDate } from "./blog-types";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const SAFE_SLUG_PATTERN = /^[a-z0-9-]+$/;

/** Return all .mdx filenames from the blog content directory */
function getBlogFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .sort();
}

/** Parse a single .mdx file into a BlogPost */
function parsePost(filename: string): BlogPost {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug: filename.replace(/\.mdx$/, ""),
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "Insight",
    readingTime: stats.text,
    content,
  };
}

/** Get all posts sorted by date (newest first) */
export function getAllPosts(): BlogPostMeta[] {
  return getBlogFiles()
    .map(parsePost)
    .map((post) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...meta } = post;
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Get all slugs for static generation */
export function getAllSlugs(): string[] {
  return getBlogFiles().map((f) => f.replace(/\.mdx$/, ""));
}

/** Get a single post by slug (includes content) */
export function getPostBySlug(slug: string): BlogPost | null {
  if (!SAFE_SLUG_PATTERN.test(slug)) return null;

  const filename = `${slug}.mdx`;
  const filePath = path.join(BLOG_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return parsePost(filename);
}
