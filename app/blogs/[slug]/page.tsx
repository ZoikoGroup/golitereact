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

const BASE_URL = "https://goliteapi.golitemobile.com";

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  if (!slug) return notFound();

  try {
    const res = await fetch(
      `${BASE_URL}/api/blog/posts/${slug}/`,
      { cache: "no-store" }
    );

    if (!res.ok) return notFound();

    const post: BlogPost = await res.json();

    // ✅ Fix relative image URLs inside content
    const fixedContent = post.content.replace(
      /src="\/media/g,
      `src="${BASE_URL}/media`
    );

    return (
      <>
        <Header />

        <div className="container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto">

            {/* Featured Image */}
            {post.featured_image && (
              <img
                src={
                  post.featured_image.startsWith("http")
                    ? post.featured_image
                    : `${BASE_URL}${post.featured_image}`
                }
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
            )}

            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <p className="text-sm text-gray-500 mb-6">
              {new Date(post.created_at).toDateString()}
            </p>

            {/* Blog Content */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: fixedContent }}
            />

            <div className="mt-8">
              <a href="/blog" className="text-[#DF1E5A] font-medium">
                ← Back to Blogs
              </a>
            </div>

          </div>
        </div>

        <Footer />
      </>
    );
  } catch {
    return notFound();
  }
}
