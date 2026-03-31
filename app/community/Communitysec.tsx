"use client";
import { useState } from "react";
import Image from "next/image";

/* FEATURE BAR */
const features = [
  {
    title: "Check Network Status",
    desc: "Live outage maps & alerts",
    icon: "/img/Overlay.png",
  },
  {
    title: "Set Up Your eSIM",
    desc: "Activate in minutes",
    icon: "/img/Overlay (1).png",
  },
  {
    title: "Billing & Payments Help",
    desc: "Invoices, refunds, top-ups",
    icon: "/img/Overlay (2).png",
  },
  {
    title: "Ask the Community",
    desc: "120K+ members ready to help",
    icon: "/img/Overlay (3).png",
  },
];

/* STATS */
const stats = [
  {
    value: "120K+",
    label: "Community Members",
    icon: "👥",
  },
  {
    value: "28,000+",
    label: "Solved Discussions",
    icon: "✅",
    badge: "✓ Verified Answers",
  },
  {
    value: "92%",
    label: "Helpfulness Rating",
    icon: "⭐",
  },
  {
    value: "24/7",
    label: "Moderated & Verified",
    icon: "🛡️",
    badge: "✓ Expert Moderated",
  },
];

/* CATEGORIES */
const categories = [
  {
    title: "Network & Coverage",
    desc: "5G speeds, signal issues, and coverage queries",
    discussions: "4,821 discussions",
    time: "2 min ago",
    icon: "/img/Background.png",
  },
  {
    title: "Devices & eSIM",
    desc: "eSIM activation, device compatibility, and setup",
    discussions: "3,189 discussions",
    time: "5 min ago",
    icon: "/img/Background (1).png",
  },
  {
    title: "Billing & Payments",
    desc: "Invoices, refunds, recharges, and payment methods",
    discussions: "2,640 discussions",
    time: "12 min ago",
    icon: "/img/Background (2).png",
  },
  {
    title: "Plans & Account",
    desc: "Plan changes, SIM management, and account settings",
    discussions: "3,823 discussions",
    time: "8 min ago",
    icon: "/img/Background (3).png",
  },
  {
    title: "Roaming & International",
    desc: "Travel plans, roaming rates, and global coverage",
    discussions: "1,465 discussions",
    time: "1 hr ago",
    icon: "/img/Background (9).png",
  },
  {
    title: "Technical Support",
    desc: "APN settings, connectivity issues, and troubleshooting",
    discussions: "5,310 discussions",
    time: "Just now",
    icon: "/img/Background (4).png",
  },
  {
    title: "Business Solutions",
    desc: "Enterprise plans, multi-line accounts, and APIs",
    discussions: "870 discussions",
    time: "3 hr ago",
    icon: "/img/Background (5).png",
  },
  {
    title: "Blue Economy & Sustainability",
    desc: "Ocean initiatives, green tech, and sustainability projects",
    discussions: "120 discussions",
    time: "45 min ago",
    icon: "/img/Background (6).png",
  },
  {
    title: "Product Feedback",
    desc: "Share ideas, feature requests, and suggestions",
    discussions: "2,010 discussions",
    time: "30 min ago",
    icon: "/img/Background (7).png",
  },
  {
    title: "Announcements",
    desc: "Official GoLite news, service updates, and notices",
    discussions: "342 posts",
    time: "Today",
    icon: "/img/Background (8).png",
  },
];

/* POSTS */
export const filters = [
  "All",
  "Latest",
  "Unanswered",
  "Solved",
  "Official",
  "Trending",
  "My Topics",
];

export const posts = [
  {
    tag: "SOLVED",
    category: "NETWORK & COVERAGE",
    title: "How do I switch from 4G to 5G on my Samsung Galaxy S24?",
    desc: "I recently moved to a 5G area but my phone seems to be staying on 4G. I've tried restarting but no change...",
    author: "Kiyo Patel",
    role: "Verified Expert",
    location: null,
    replies: 24,
    views: "2,140",
    time: "35 min ago",
  },
  {
    tag: "OFFICIAL REPLY",
    category: "BILLING & PAYMENTS",
    title: "Why was I charged twice for my recharge this month?",
    desc: "My bank statement shows two GoLite charges on the 10th. I only recharged once via the app. Has anyone else experienced this?",
    author: "Arjun Mehta",
    role: null,
    location: "Delhi NCR",
    replies: 19,
    views: "1,870",
    time: "1 hr ago",
  },
  {
    tag: "NEEDS ATTENTION",
    category: "DEVICES & ESIM",
    title: "eSIM activation stuck at 'Downloading Profile' on iPhone 15 Pro",
    desc: "I've been trying to activate my GoLite eSIM for 2 hours. The iPhone shows 'Downloading Profile' and then fails. The QR code was scanned correctly...",
    author: "Sneha Krishnan",
    role: null,
    location: "Bangalore",
    replies: 8,
    views: "890",
    time: "2 hr ago",
  },
  {
    tag: "SOLVED",
    category: "PLANS & ACCOUNT",
    title: "Complete guide: Porting your number to GoLite in under 10 minutes",
    desc: "I just completed a number port from Jio and it was surprisingly easy. Here's a full step-by-step that helped me avoid the common mistakes...",
    author: "Vikram Nair",
    role: "Community Champion",
    location: null,
    replies: 89,
    views: "14,200",
    time: "3 days ago",
  },
  {
    tag: "TRENDING",
    category: "TECHNICAL SUPPORT",
    title: "Mobile hotspot dropping connection every 20 minutes — fix found?",
    desc: "There's been a pattern of hotspot disconnections for Go Lite users since last Friday's update. I've found a temporary APN fix that seems to be working...",
    author: "Priya Sharma",
    role: "Moderator",
    location: null,
    replies: 132,
    views: "2,500",
    time: "4 hr ago",
  },
];

const tabs = [
  "Official Updates",
  "Trending",
  "Recently Solved",
  "Popular Guides",
];

const tagStyles: Record<string, { bg: string; text: string; icon: string }> = {
  SOLVED: {
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: "✓",
  },
  "OFFICIAL REPLY": {
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    icon: "★",
  },
  "NEEDS ATTENTION": {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-600 dark:text-orange-400",
    icon: "!",
  },
  TRENDING: {
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-600 dark:text-rose-400",
    icon: "↑",
  },
  GUIDE: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    text: "text-blue-600 dark:text-blue-400",
    icon: "📖",
  },
};

const roleStyles: Record<string, { bg: string; text: string; icon: string }> = {
  "Verified Expert": {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    text: "text-emerald-700 dark:text-emerald-400",
    icon: "✓",
  },
  Staff: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    text: "text-blue-700 dark:text-blue-400",
    icon: "★",
  },
  "Community Champion": {
    bg: "bg-purple-50 dark:bg-purple-900/20",
    text: "text-purple-700 dark:text-purple-400",
    icon: "🏆",
  },
  Moderator: {
    bg: "bg-orange-50 dark:bg-orange-900/20",
    text: "text-orange-700 dark:text-orange-400",
    icon: "🛡",
  },
};

const resources = [
  {
    title: "Activate Your eSIM",
    desc: "Step-by-step guide for iOS and Android devices",
    icon: "📱",
  },
  {
    title: "Check Coverage in Your Area",
    desc: "Interactive 4G and 5G coverage map",
    icon: "📶",
  },
  {
    title: "Network Status Live",
    desc: "Real-time outage alerts and planned maintenance",
    icon: "⚡",
  },
  {
    title: "Manage or Change Your Plan",
    desc: "Upgrade, downgrade, or switch plan anytime",
    icon: "⚙️",
  },
  {
    title: "Billing FAQs",
    desc: "Understand your bill, set up auto-pay, get refunds",
    icon: "💳",
  },
  {
    title: "Switch to GoLife",
    desc: "How to port your number in under 10 minutes",
    icon: "📦",
  },
];

export default function Communitysec() {
  const [activeTab, setActiveTab] = useState("Official Updates");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <>
      <div className="w-full dark:bg-gray-950 dark:text-white bg-gray-50 text-gray-800">
        {/* HERO */}
        <section className="bg-linear-to-r from-indigo-500 to-purple-500 dark:text-white text-white py-16 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Connect, Learn and Solve Together
          </h1>
          <p className="text-sm md:text-base mb-6 opacity-90  ">
            Get answers from the GoLite Mobile community, verified experts, and
            official support resources — all in one place.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex items-center bg-white rounded-full p-1 shadow-md">
              {/* Input */}
              <input
                type="text"
                placeholder="Search discussions, guides, or ask a question..."
                className="flex-1 min-w-0 px-5 py-3 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              />

              {/* Button */}
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-3 py-2 md:px-6 md:py-3 rounded-full transition">
                Search the Community
              </button>
            </div>
          </div>
        </section>

        {/* FEATURE BAR */}
        <div className="bg-gray-100 py-6 px-4 dark:bg-gray-950 dark:text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 ">
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Image src={item.icon} alt="" width={40} height={40} />
                </div>
                <div>
                  <p className="text-sm font-semibold dark:bg-gray-950 dark:text-white  ">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:bg-gray-950 dark:text-white">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="py-10 px-4">
          <div className="max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className={`
            flex flex-col items-center justify-center text-center p-6
            ${i !== stats.length - 1 ? "border-r border-gray-200 dark:border-gray-700" : ""}
          `}
                >
                  {/* Icon */}
                  <div className="mb-3 text-2xl">{stat.icon}</div>

                  {/* Value */}
                  <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    {stat.value}
                  </p>

                  {/* Label */}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>

                  {/* Optional Badge */}
                  {stat.badge && (
                    <span className="mt-2 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
                      {stat.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CATEGORIES */}
        <section className="py-12 px-4 max-w-6xl mx-auto bg-[#f8fafc] dark:bg-gray-950 transition">
          {/* Heading */}
          <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
            What Can We Help You With?
          </h2>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8">
            Choose a category to find answers, share knowledge, and connect with
            the community.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition cursor-pointer"
              >
                {/* Icon with background */}
                <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 mb-3">
                  <Image
                    src={cat.icon}
                    alt={cat.title}
                    width={56}
                    height={56}
                  />
                </div>

                {/* Title */}
                <p className="text-sm font-semibold text-gray-800 dark:text-white">
                  {cat.title}
                </p>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                  {cat.desc}
                </p>

                {/* Stats */}
                <div className="flex justify-between text-[11px] text-gray-400 dark:text-gray-500 mt-5">
                  <span>{cat.discussions}</span>
                  <span>{cat.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT'S HAPPENING */}
        <section className="py-12 px-4 bg-gray-50 dark:bg-gray-950 dark:text-white ">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              What’s Happening in the Community
            </h2>
            <p className="text-gray-500 text-sm mb-6 dark:bg-gray-950 dark:text-white ">
              Official updates, trending discussions, and expert-verified
              answers.
            </p>

            {/* TABS */}
            <div className="flex justify-center mb-8">
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`
          px-2 py-1 md:px-4 md:py-1 text-xs md:text-base font-semibold rounded-full transition
          ${
            activeTab === tab
              ? "bg-white dark:bg-gray-900 text-orange-500 shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
          }
        `}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {/* Card 1 */}
              <div className="border border-orange-400 rounded-xl p-5 bg-white dark:bg-gray-950 dark:text-white">
                <h3 className="font-semibold mb-2">
                  5G Network Expansion — New Cities Added This Month
                </h3>
                <p className="text-sm text-gray-600 mb-4 dark:bg-gray-950 dark:text-white">
                  We're excited to announce 5G coverage has expanded to 14 new
                  cities across India, including Pune, Ahmedabad, and Jaipur.
                  Check if your area is now covered.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full dark:bg-gray-950 text-white p-1 text-center">
                    GL
                  </div>
                  <div>
                    <p className="text-sm font-medium">GoLite Team</p>
                    <p className="text-xs text-gray-500 dark:bg-gray-950 dark:text-white">
                      Official Announcement · 2 days ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-orange-400 rounded-xl p-5 bg-white dark:bg-gray-950 dark:text-white   ">
                <h3 className="font-semibold mb-2">
                  Scheduled Maintenance Notice — March 22, 2:00–4:00 AM IST
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Brief planned maintenance window may affect data services in
                  select areas. SMS and calls will remain unaffected during this
                  period.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full dark:bg-gray-950 text-white p-1 text-center">
                    GL
                  </div>
                  <div>
                    <p className="text-sm font-medium">GoLite Network Ops</p>
                    <p className="text-xs text-gray-500">
                      Official Notice · 6 hours ago
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-orange-400 rounded-xl p-5 dark:bg-gray-950 dark:text-white bg-white">
                <h3 className="font-semibold mb-2">
                  Go Unlimited Plan Now Includes Free Roaming to Canada & Mexico
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Effective from April 1st, all Go Unlimited subscribers will
                  automatically receive free roaming in Canada and Mexico at no
                  extra charge.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-full dark:bg-gray-950 text-white p-1 text-center">
                    GL
                  </div>
                  <div>
                    <p className="text-sm font-medium">GoLite Plans Team</p>
                    <p className="text-xs text-gray-500">
                      Official Update · 1 day ago
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMMUNITY POSTS */}
        <section className="bg-gray-100 dark:bg-gray-950 py-12 px-4 min-h-screen">
          <div className="max-w-5xl mx-auto">
            {/* Heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Join the Conversation
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                Browse recent discussions from the community — filter by topic,
                status, or sort by relevance.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                    activeFilter === f
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:text-green-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Post Cards */}
            <div className="space-y-3">
              {posts.map((post, i) => {
                const tag = tagStyles[post.tag] ?? {
                  bg: "bg-gray-100",
                  text: "text-gray-600",
                  icon: "",
                };
                const role = post.role ? roleStyles[post.role] : null;

                return (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl px-4 sm:px-5 py-4 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group"
                  >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase ${tag.bg} ${tag.text}`}
                      >
                        {tag.icon} {post.tag}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-[15px] font-semibold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-[13px] text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                      {post.desc}
                    </p>

                    {/* Meta */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">
                        {post.author}
                      </span>

                      {role && (
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${role.bg} ${role.text}`}
                        >
                          {role.icon} {post.role}
                        </span>
                      )}

                      {post.location && <span>{post.location}</span>}

                      <span>•</span>
                      <span>💬 {post.replies} replies</span>
                      <span>•</span>
                      <span>👁 {post.views} views</span>
                      <span>•</span>
                      <span>🕐 {post.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section className="py-12 px-4 max-w-6xl mx-auto bg-[#f8fafc] dark:bg-gray-950 transition">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-white">
            Helpful Resources Before You Post
          </h2>

          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 text-center mt-2 mb-8">
            Quick answers to the most common questions — verified and kept up to
            date by our team.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 hover:shadow-sm transition cursor-pointer"
              >
                {/* Left Content */}
                <div className="flex items-center gap-3">
                  {/* Icon */}
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-100 dark:bg-gray-800 text-lg">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Arrow */}
                <span className="text-gray-400 dark:text-gray-500 text-lg">
                  →
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* GREEN SECTION */}
        <section className="py-12 px-4 bg-linear-to-r from-green-100 to-green-50 dark:from-gray-900 dark:to-gray-800 transition">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-400">
                A Community Built Around a Greener Future
              </h2>

              <p className="text-sm text-green-900 dark:text-gray-300 mt-3">
                GoLife’s Blue Economy mission goes beyond mobile connectivity.
                Our community is a platform for discussing sustainable
                technology, ocean conservation, and responsible digital
                practices.
              </p>

              {/* Bullet Points */}
              <ul className="mt-4 space-y-2 text-sm text-green-900 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">🌿</span>1Plan =1 Tree planted
                  across India
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-green-600">🌿</span>
                  Ocean plastic offset with every subscription
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-green-600">🌿</span>
                  Renewable energy powering our network infrastructure
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-green-600">🌿</span>
                  Community-driven sustainability challenges each quarter
                </li>
              </ul>

              {/* CTA */}
              <button className="mt-5 bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-full transition">
                Explore Sustainability Discussions
              </button>
            </div>

            {/* RIGHT STATS */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
                <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                  48K+
                </p>
                <p className="text-xs text-green-600 dark:text-gray-400 mt-1">
                  Trees planted by our community this year
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
                <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                  12T
                </p>
                <p className="text-xs text-green-600 dark:text-gray-400 mt-1">
                  Ocean plastic offset by GoLife subscriptions
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
                <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                  100%
                </p>
                <p className="text-xs text-green-600 dark:text-gray-400 mt-1">
                  Renewable energy at HQ and data centers
                </p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 md:p-6">
                <p className="text-xl md:text-2xl font-bold text-green-700 dark:text-green-400">
                  1.2K
                </p>
                <p className="text-xs text-green-600 dark:text-gray-400 mt-1">
                  Sustainability discussions this month
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
