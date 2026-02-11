"use client";

import React, { useState, useEffect } from "react";
import type { BlogPost } from "../types/blog";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsletterSubscribe from "../components/NewsletterSubscribe";

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

        const res = await fetch(
          `${BASE_URL}/api/blog/posts/`,
          { cache: "no-store" }
        );


        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }

        const data = await res.json();

        // Handle both array & Django paginated response
        const blogArray = Array.isArray(data)
          ? data
          : data.results || [];

        const formattedBlogs: BlogPost[] = blogArray.map(
          (item: any, index: number) => ({
            id: item.id ?? index + 1,
            title: item.title ?? "Untitled",
            slug:
              item.slug ??
              item.title
                ?.toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
            category:
              item.category_name ||
              item.category ||
              "General",
            date:
              item.published_at ||
              item.created_at ||
              "",
            imageUrl:
              item.image ||
              item.featured_image ||
              "",
            excerpt:
              item.excerpt ||
              item.description ||
              "",
            content:
              item.content ||
              item.body ||
              "",
          })
        );

        setBlogs(formattedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs from API.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter((blog) => {
    if (!blog.title || !blog.category) return false;
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <Header />

      {/* HERO SECTION */}
      <section className="w-full bg-[#f05] h-80 mb-12 align-items-center justify-center flex flex-col position-relative">
        <h1 className="text-white text-4xl font-bold text-center">
          Blogs
        </h1>

        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>

        <div className="relative bg-white w-200 mt-4 mx-auto rounded-full shadow-md">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-body"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
            id="search"
            className="block w-200 p-3 ps-9 border-0 text-sm rounded-base shadow-xs"
            placeholder="Search"
          />
        </div>
      </section>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="container mx-auto">
          <div className="alert alert-warning">{error}</div>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <div className="container mx-auto text-center py-10">
          <p>Loading blogs...</p>
        </div>
      )}

      {/* BLOG GRID */}
      {!isLoading && (
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div key={blog.id}>
                  <BlogCard data={blog} />
                </div>
              ))
            ) : (
              <div className="text-center py-5 col-span-3">
                <h4 className="text-muted">
                  No blogs found matching "{searchQuery}"
                </h4>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB BANNER */}
      <div className="container mx-auto my-12">
        <section className="subbanner bg-[#e8f2e1] dark:bg-gray-800 row align-items-center max-w-3xl mx-auto">
          <div className="subbanner-left col-12 col-md-6">
            <h2>Get our best content in your inbox</h2>
            <p>
              All the tips, stories, and resources you could ever need
              straight to your email.
            </p>
          </div>

          <div className="subbanner-right col-12 col-md-6">
            <NewsletterSubscribe />
            <p>
              Your privacy matters! You may unsubscribe anytime.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default BlogPage;
