import { DUMMY_BLOGS, type BlogPost } from '../types/blog';

/**
 * Fetch all blogs from an API endpoint if available, otherwise fall back to the
 * bundled `DUMMY_BLOGS`.
 */
export async function fetchAllBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'https://goliteapi.golitemobile.com/api/blog/posts/';
    const res = await fetch(apiUrl);
    if (!res.ok) return DUMMY_BLOGS;

    const data = await res.json();
    if (!Array.isArray(data)) return DUMMY_BLOGS;

    return data.map((item: any, idx: number) => {
      const title = item.title || item.name || "Untitled";
      const slug =
        item.slug ||
        (typeof title === "string"
          ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
          : `post-${idx + 1}`);
      const imageUrl = item.imageUrl || item.image || item.featured_image || item.featuredImage || "";
      return {
        id: Number(item.id ?? idx + 1),
        title,
        category: item.category || item.category_name || "General",
        date: item.date || item.published || item.published_at || "",
        imageUrl,
        slug,
        excerpt: item.excerpt || item.summary || item.description || "",
        content: item.content || item.body || item.html || "",
      } as BlogPost;
    });
  } catch {
    return DUMMY_BLOGS;
  }
}
