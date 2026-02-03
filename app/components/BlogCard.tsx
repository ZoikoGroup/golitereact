"use client";

import Link from "next/link";
import type { BlogPost } from "../types/blog";

type Props = { data: BlogPost };

export default function BlogCard({ data }: Props) {
  return (
    <Link
      href={`/blog/${encodeURIComponent(data.slug)}`}
      className="block cursor-pointer p-4 hover:shadow-md rounded"
      aria-label={`Read ${data.title}`}
    >
      <img src={data.imageUrl} alt={data.title} className="w-full h-40 object-cover rounded mb-3" />
      <h3 className="font-semibold text-lg">{data.title}</h3>
      <p className="text-sm text-gray-500 mt-2">{data.excerpt}</p>
    </Link>
  );
}