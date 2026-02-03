import { notFound } from 'next/navigation';
import { DUMMY_BLOGS, type BlogPost } from '../../types/blog';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Props {
  params: { slug: string } | Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };
  if (!slug) return notFound();

  // Fetch blogs from API (prefer external API if provided, otherwise internal route)
  let post: BlogPost | undefined;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? '/api/blog/posts/';
    const res = await fetch(apiUrl, { cache: 'no-store' });
    const data = res.ok ? await res.json() : null;
    const blogs = Array.isArray(data) && data.length ? (data as BlogPost[]) : DUMMY_BLOGS;
    post = blogs.find((p) => p.slug === slug);
  } catch (e) {
    // fallback to bundled data
    post = DUMMY_BLOGS.find((p) => p.slug === slug);
  }

  if (!post) return notFound();

  return (
    <>
    <Header />
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <img src={post.imageUrl} alt={post.title} className="w-full h-64 object-cover rounded-lg mb-6" />

        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-6">{post.category} • {post.date}</p>

        <div className="prose max-w-none">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="mt-8">
          <a href="/blog" className="text-[#DF1E5A] font-medium">← Back to Blogs</a>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}
