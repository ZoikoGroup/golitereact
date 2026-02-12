"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/api/blog/posts/`, {
      next: { revalidate: 60 }, // caching (important)
    });

    if (!res.ok) throw new Error("Blog fetch failed");

    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

    fetchBlogs();
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900">
          Our Blogs
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {blogs.slice(0, 3).map((b: any) => (
            <div
              key={b.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <img
                src={b.featured_image}
                className="w-full h-48 object-cover"
                alt={b.title}
              />

              {/* Content */}
              <div className="p-6 text-left">
                <div className="text-xs font-semibold text-orange-500 uppercase mb-1">
                  {b.category?.name}
                  <span className="text-gray-400 ml-2">
                    {new Date(b.created_at).toDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-lg dark:text-gray-200 mb-2 leading-tight">
                  {b.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">
                  {b.excerpt}
                </p>

                <Link
                  href={`/blog/${b.slug}`}
                  className="text-orange-500 font-semibold text-sm"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <Link href="/blog">
          <button className="mt-10 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
            View All Articles
          </button>
        </Link>

      </div>
    </section>
  );
}

