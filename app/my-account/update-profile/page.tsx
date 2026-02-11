import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  content: string;
  featured_image: string;
  created_at: string;
}

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!BASE_URL) {
    console.error("NEXT_PUBLIC_API_BASE_URL not defined");
    return notFound();
  }

  try {
    const res = await fetch(
      `${BASE_URL}/api/blog/posts/${slug}/`,
      { cache: "no-store" }
    );

    if (!res.ok) return notFound();

    const post: BlogPost = await res.json();

    // ✅ Fix relative image paths inside blog content
    const fixedContent = post.content.replace(
      /src="\/media/g,
      `src="${BASE_URL}/media`
    );

    return (
      <>
        <Header />

        {/* 🔥 Increased Width */}
        <div className="container mx-auto py-16 px-6">
          <div className="max-w-5xl mx-auto">

            {/* Featured Image */}
            {post.featured_image && (
              <img
                src={
                  post.featured_image.startsWith("http")
                    ? post.featured_image
                    : `${BASE_URL}${post.featured_image}`
                }
                alt={post.title}
                className="w-full h-[420px] object-cover rounded-xl mb-8"
              />
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Date */}
            <p className="text-gray-500 mb-10 text-sm">
              {new Date(post.created_at).toDateString()}
            </p>

            {/* Blog Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: fixedContent }}
            />

            {/* Back Button */}
            <div className="mt-12">
              <a
                href="/blog"
                className="text-[#DF1E5A] font-semibold hover:underline"
              >
                ← Back to Blogs
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </>
    );
  } catch (error) {
    console.error("Blog fetch error:", error);
    return notFound();
  }
}
