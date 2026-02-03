"use client"
import React, { useState, useEffect } from 'react';
import { DUMMY_BLOGS, type BlogPost } from '../types/blog'; 
import BlogCard from '../components/BlogCard';
import { fetchAllBlogs } from '../services/BlogServices';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all blogs on component mount
  useEffect(() => {
    const loadBlogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchAllBlogs();
        console.log("Fetched blogs:", data);
        
        // If API returns data, use it; otherwise use dummy blogs
        if (data && Array.isArray(data) && data.length > 0) {
          console.log("Using API blogs:", data.length);
          setBlogs(data);
        } else {
          console.log("No data from API, using dummy blogs:", DUMMY_BLOGS.length);
          setBlogs(DUMMY_BLOGS);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        // Fallback to dummy blogs on any error
        console.log("Error occurred, using dummy blogs");
        setBlogs(DUMMY_BLOGS);
        setError("Failed to load from API. Showing cached content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = (blogs || []).filter(blog => {
    if (!blog || !blog.title || !blog.category) return false;
    return (
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
    <Header />
      {/* HERO SECTION WITH INTEGRATED SEARCH BAR */}
      <section className="w-full bg-[#f05] h-80 mb-12 align-items-center justify-center flex flex-col position-relative">
        <h1 className="text-white text-4xl font-bold text-center">Blogs</h1>

        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative bg-white w-200 mt-4 mx-auto rounded-full shadow-md">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isLoading} id="search" 
              className="block w-200 p-3 ps-9 bg-neutral-secondary-medium border-0 text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
        </div>
        
      </section>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="container mx-auto">
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>
      )}

      {/* LOADING STATE */}
      {isLoading && (
        <div className="container mx-auto blog-grid-section">
          <div className="blog-row-margin g-4">
            <div className="grid grid-flow-col row-span-12 text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading blogs...</p>
            </div>
          </div>
        </div>
      )}

      {/* BLOG GRID SECTION */}
      {!isLoading && (
        <div className="container mx-auto">
          <div className="grid grid-cols-3 gap-4">
            {blogs && blogs.length > 0 ? (
              blogs.map((blog: BlogPost) => (
                <div key={blog.id}>
                  <BlogCard data={blog} />
                </div>
              ))
            ) : (
              <div className="text-center py-5 row-span-12">
                <h4 className="text-muted">No blogs found matching "{searchQuery}"</h4>
                <p className="text-muted">Try a different search term or browse all blogs.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB BANNER SECTION */}
      <div className="container mx-auto my-12">
        <section className="subbanner row align-items-center max-w-3xl mx-auto">
          
          {/* LEFT CONTENT */}
          <div className="subbanner-left col-12 col-md-6">
            <h2>Get our best content in your inbox</h2>
            <p>
              All the tips, stories, and resources you could ever need or want straight to your email.
            </p>
          </div>

          {/* RIGHT CONTENT */}
          <div className="subbanner-right col-12 col-md-6">
            {/* FORM ROW */}
            <div className="form-row">
              <input
                type="email"
                className="sub-input"
                placeholder="Email address"
              />
              <button className="sub-btn">Subscribe</button>
            </div>
            {/* PRIVACY TEXT */}
            <p className="privacy-text">
              Your privacy matters! Smaile only uses this info to send content
              and updates. You may unsubscribe anytime. View our privacy policy
              for more.
            </p>
          </div>
        </section>
      </div>
    <Footer />
    </>
  );
};

export default BlogPage;