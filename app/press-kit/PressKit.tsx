"use client";

import Image from "next/image";
import { useState } from "react";

export default function PressKit() {
  const [activeFilter, setActiveFilter] = useState("All");

  // ✅ LOGO / BRAND ASSETS DATA
  const assets = [
    {
      title: "Primary Logo – Light",
      desc: "Full-colour logo on white/light backgrounds",
      img: "/img/Frame 6.png",
      formats: ["PNG", "SVG", "EPS"],
      variant: "light",
      updated: "Mar 2025",
    },
    {
      title: "Primary Logo – Dark",
      desc: "Reversed logo for dark/navy backgrounds",
      img: "/img/Background (11).png",
      formats: ["PNG", "SVG", "EPS"],
      variant: "dark", //  important (navy header)
      updated: "Mar 2025",
    },
    {
      title: "Icon Mark",
      desc: "Standalone icon for apps, favicons, and social media",
      img: "/img/Vector.png",
      formats: ["PNG", "SVG", "ICO"],
      variant: "light",
      updated: "Mar 2025",
    },
    {
      title: "Brand Colour Palette",
      desc: "Primary green, orange, deep navy + neutrals",
      img: "/img/Background (10).png",
      formats: ["ASE", "HEX", "PDF"],
      variant: "gradient", //  matches colorful card
      updated: "Mar 2025",
    },
    {
      title: "Poppins",
      desc: "Regular · Medium · SemiBold · Bold · ExtraBold",
      img: "/img/Paragraph+Background+HorizontalBorder.png",
      formats: ["PDF", "DOC"],
      variant: "light",
      updated: "Mar 2025",
    },
    {
      title: "Download All Brand Assets",
      desc: "Complete package — logos, icons, colours, and typography",
      img: "/img/Paragraph+Background.png",
      formats: ["ZIP (4.2 MB)"],
      variant: "dark", //  dark header like screenshot
      highlight: true, //  green border highlight
      updated: "Mar 2025",
    },
  ];

  // 👤 LEADERSHIP DATA
  const leaders = [
    {
      name: "Lennox G. McLeod",
      role: "Founder & Executive Chairman · Zoiko Group Inc.",
      companies: "GoLite Mobile · Zoiko Communications Group Inc.",
      bio: "Lennox G. McLeod is the Founder and Executive Chairman of Zoiko Group Inc., leading the development of global telecommunications, technology, and infrastructure platforms. He is responsible for the strategic direction and governance of GoLite Mobile and the broader Zoiko Group portfolio.",
      img: "/img/image 193.png",
    },
  ];

  // 📰 NEWS & ANNOUNCEMENTS DATA
  const newsFilters = [
    "All",
    "Product",
    "Partnership",
    "Corporate",
    "Sustainability",
  ];

  const news = [
    {
      day: "18",
      month: "MAR",
      year: "2026",
      tags: ["📣LATEST", "PRODUCT"],
      title: "GoLite Mobile Launches 5G Network Across 14 New Indian Cities",
      desc: "GoLite Mobile today announced the expansion of its 5G network to 14 additional cities across India, including Pune, Ahmedabad, and Jaipur, bringing its total 5G footprint to 38 cities nationwide.",
      hasPdf: true,
    },
    {
      day: "04",
      month: "MAR",
      year: "2026",
      tags: ["CORPORATE"],
      title:
        "GoLite Mobile Achieves ISO 27001 Certification for Information Security",
      desc: "GoLite Mobile has been awarded ISO 27001 certification, affirming its commitment to the highest standards of information security management across all operations.",
      hasPdf: true,
    },
    {
      day: "14",
      month: "FEB",
      year: "2026",
      tags: ["PARTNERSHIP"],
      title:
        "GoLite Mobile Partners with Zoiko Financial Group to Launch Integrated Mobile Banking",
      desc: "GoLite Mobile has entered a strategic partnership with Zoiko Financial Group to offer integrated mobile banking and payment features directly within the GoLite app for eligible customers.",
      hasPdf: true,
    },
    {
      day: "22",
      month: "JAN",
      year: "2026",
      tags: ["SUSTAINABILITY"],
      title:
        "GoLite Mobile Reaches 50,000 Trees Planted Through Its 1 Plan, 1 Tree Initiative",
      desc: "GoLite Mobile's flagship sustainability programme has surpassed 50,000 trees planted across India, marking a significant milestone in its Blue Economy commitment to environmental impact.",
      hasPdf: true,
    },
    {
      day: "08",
      month: "NOV",
      year: "2025",
      tags: ["PRODUCT"],
      title:
        "GoLite Mobile Introduces Go Unlimited — Premium Unlimited Data Plan with Free International Calls",
      desc: "GoLite Mobile unveiled its flagship Go Unlimited plan, offering unlimited high-speed data, free international calls to 200+ countries, and free roaming across Canada and Mexico starting at $59/month.",
      hasPdf: true,
    },
  ];

  // 📸 PHOTOGRAPHY & VISUAL ASSETS DATA
  const visualAssets = [
    {
      title: "Product Screenshots",
      desc: "App UI · 8 images · 12 min Print",
      bg: "bg-green-50",
      img: "/img/Presskit/mobile.png",
    },
    {
      title: "Network Visuals",
      desc: "Infrastructure · 6 images · 4K",
      bg: "bg-blue-50",
      img: "/img/Presskit/network.png",
    },
    {
      title: "Campaign Imagery",
      desc: "Brand Visuals · 11 images · 12 min",
      bg: "bg-orange-50",
      img: "/img/Presskit/star.png",
    },
    {
      title: "Sustainability Initiatives",
      desc: "Green programme · 8 images · 2K",
      bg: "bg-green-50",
      img: "/img/Presskit/sustainability.png",
      emoji: "🌿",
    },
    {
      title: "Corporate & Office",
      desc: "HQ & team · 10 images · 10 min",
      bg: "bg-slate-100",
      img: "/img/Presskit/business.png",
      emoji: "🏢",
    },
    {
      title: "Executive Headshots",
      desc: "Leadership team · 4 images · 1K+",
      bg: "bg-gray-800",
      img: "/img/Presskit/account.png",
      emoji: "👤",
      dark: true,
    },
    {
      title: "Brand Videos",
      desc: "Deep hero, product demos · OTT",
      bg: "bg-gray-900",
      img: "/img/Presskit/video.png",
      emoji: "▶️",
      dark: true,
    },
    // {
    //   title: "B-Roll Footage",
    //   desc: "Network & lifestyle · 16 clips",
    //   bg: "bg-gray-900",
    //   img: "/img/Presskit/broll.png",
    //   emoji: "",
    //   dark: true,
    // },
  ];

  // 🌿 SUSTAINABILITY STATS
  const sustainabilityStats = [
    { value: "50K+", label: "Trees planted since launch" },
    { value: "12T", label: "Carbon plastic offset (tonnes)" },
    { value: "100%", label: "Renewables powered in HQ facilities" },
    { value: "2030", label: "Net-zero commitment target" },
  ];

  const sustainabilityFeatures = [
    {
      icon: "🌱",
      title: "1 Plan, 1 Tree",
      desc: "Every active subscription funds tree-planting across India.",
    },
    {
      icon: "🌊",
      title: "Ocean Impact",
      desc: "GoLite Mobile's Blue Economy programme links to ocean conservation growth.",
    },
    {
      icon: "⚡",
      title: "Renewable Energy",
      desc: "100% renewable power at HQ and core data infrastructure.",
    },
    {
      icon: "📊",
      title: "Transparent Reporting",
      desc: "Annual sustainability report published publicly each year.",
    },
  ];

  // 📞 MEDIA CONTACT DATA
  const responseCommitments = [
    { type: "Breaking news / Urgent", time: "Within 2 hours" },
    { type: "Standard media enquiry", time: "Within 24 hours" },
    { type: "Interview / spokesperson request", time: "Within 48 hours" },
    { type: "Asset / imagery request", time: "Same business day" },
  ];

  const tagColorMap = {
    LATEST: "bg-green-500 text-white",
    PRODUCT: "bg-blue-100 text-blue-700",
    CORPORATE: "bg-purple-100 text-purple-700",
    PARTNERSHIP: "bg-orange-100 text-orange-700",
    SUSTAINABILITY: "bg-green-100 text-green-700",
  };

  const contacts = [
    {
      icon: "/img/Presskit/email.png",
      label: "Media Enquiries",
      value: "press@golitemobile.com",
    },
    {
      icon: "/img/Presskit/phone.png",
      label: "Press Hotline",
      value: "+44 (0) 20 8001 5030",
    },
    {
      icon: "/img/Presskit/sms.png",
      label: "Paid Partnerships",
      value: "partnerships@golitemobile.com",
    },
  ];
  const filteredNews =
    activeFilter === "All"
      ? news
      : news.filter((n) =>
          n.tags.some((t) => t.toLowerCase() === activeFilter.toLowerCase()),
        );

  return (
    <div className="bg-[#f5f6f7]  dark:bg-gray-950 dark:text-white  text-black">
      {/*  HERO */}
      <section className="bg-linear-to-r from-indigo-500 to-purple-500 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-3">GoLite Mobile Press Kit</h1>
        <p className="opacity-90 max-w-2xl mx-auto">
          Official resources for media, partners, and stakeholders — company
          info, brand assets, and press materials.
        </p>
      </section>

      {/*  COMPANY COPY */}
      <section className="max-w-6xl mx-auto px-4 py-12  dark:bg-gray-950 dark:text-white ">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Media Ready Company Copy</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto  dark:bg-gray-950 dark:text-white ">
            Approved for direct use by journalists, editors, and partners
            without modification.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT — Descriptions */}
          <div className="space-y-5">
            <div className="bg-white border  dark:bg-gray-950 dark:text-white  border-gray-200 rounded-xl p-6 shadow-sm">
              <p className="text-xs font-semibold  dark:bg-gray-950 dark:text-white    text-gray-400 uppercase tracking-widest mb-3">
                Short Description — 50–75 Words
              </p>
              <p className="text-sm  dark:bg-gray-950 dark:text-white  text-gray-700 leading-relaxed mb-4">
                GoLite Mobile is a next-generation telecommunications provider
                delivering reliable, accessible, and sustainable connectivity
                solutions. Built on a governance-first foundation, the company
                integrates advanced digital infrastructure with a commitment to
                the Blue Economy, supporting responsible innovation and
                long-term environmental impact.
              </p>
              <div className="bg-green-50 dark:bg-gray-950  text-green-700 text-xs p-3 rounded-lg border border-green-200">
                Safe for direct publication. Approved for use in editorial copy,
                introductions, and feature articles without modification.
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm  dark:bg-gray-950 dark:text-white ">
              <p className="text-xs font-semibold  dark:bg-gray-950 dark:text-white  text-gray-400 uppercase tracking-widest mb-3">
                Extended Description — 150–200 Words
              </p>
              <p className="text-sm  dark:bg-gray-950 dark:text-white  text-gray-700 leading-relaxed">
                GoLite Mobile is a telecommunications company focused on
                delivering high-quality, reliable, and scalable mobile
                connectivity across multiple markets. Designed with a
                governance-first approach, the company combines robust network
                infrastructure with modern digital systems to provide seamless
                voice, data, and mobile services.
              </p>
              <p className="mt-4 text-sm  dark:bg-gray-950 dark:text-white  text-gray-700 leading-relaxed">
                Positioned within the Blue Economy, GoLite Mobile integrates
                sustainability into its operational and strategic framework,
                supporting responsible technology deployment and environmentally
                conscious growth. The company prioritizes transparency,
                compliance, and customer trust, ensuring that services are
                delivered with consistency and accountability.
              </p>
              <p className=" mt-4 text-sm  dark:bg-gray-950 dark:text-white  text-gray-700 leading-relaxed">
                Through continuous innovation and a commitment to operational
                excellence, GoLite Mobile aims to redefine how
                telecommunications services are delivered — balancing
                performance, accessibility, and long-term impact.
              </p>
            </div>
          </div>

          {/* RIGHT — Fact Sheet */}
          <div className="bg-white border  dark:bg-gray-950 dark:text-white  border-gray-200 rounded-xl shadow-sm overflow-hidden h-fit">
            <div className="px-5 py-3 border-b  border-gray-100">
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">
                📋 Fact Sheet
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y  dark:bg-gray-950 dark:text-white  divide-gray-100">
              {[
                { label: "Company", value: "GoLite Mobile" },
                { label: "Industry", value: "Telecommunications" },
                { label: "Headquarters", value: "India (Global Operations)" },
                { label: "Founded", value: "2020" },
                {
                  label: "Markets Served",
                  value: "India, UK, Caribbean & Global",
                },
                { label: "Core Services", value: "Mobile data, Voice, eSIM" },
                { label: "Network", value: "4G / 5G" },
                {
                  label: "Parent Group",
                  value: "Zoiko Communications Group Inc.",
                },
              ].map((item, i) => (
                <div key={i} className="p-4">
                  <p className="text-xs  dark:bg-gray-950 dark:text-white  text-gray-400 uppercase tracking-wide mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold  dark:bg-gray-950 dark:text-white  text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t  dark:bg-gray-950 dark:text-white  border-gray-100 bg-gray-50">
              <p className="text-xs  dark:bg-gray-950 dark:text-white  text-gray-400">
                Fact Sheet — March 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*  BRAND ASSETS */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-[#f3f4f6] dark:bg-gray-950 transition-colors duration-300">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Controlled Brand Distribution
        </h2>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 mb-10">
          Official assets provided for media and partner use. All usage must
          comply with brand guidelines.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((item) => (
            <div
              key={item.title}
              className={`
          rounded-xl overflow-hidden border bg-white dark:bg-gray-900
          shadow-sm hover:shadow-md transition
          ${
            item.highlight
              ? "border-green-500 dark:border-green-400"
              : "border-gray-200 dark:border-gray-700"
          }
        `}
            >
              {/*  TOP VISUAL SECTION */}
              <div
                className={`h-32 flex items-center justify-center
          ${
            item.variant === "dark"
              ? "bg-[#1e293b]"
              : item.variant === "gradient"
                ? "bg-linear-to-r from-green-500 via-orange-500 to-indigo-900"
                : "bg-gray-100 dark:bg-gray-800"
          }`}
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  width={120}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/*  CONTENT */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-3">
                  {item.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {item.formats.map((f) => (
                    <span
                      key={f}
                      className="text-[11px] px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Metadata */}
                {item.updated && (
                  <p className="text-[11px] text-gray-400 dark:text-gray-500">
                    Updated {item.updated}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/*  USAGE GUIDELINES */}
        <div className="mt-10 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            Usage Guidelines
          </h3>

          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-semibold text-gray-700 dark:text-green-400 mb-2">
                Permitted
              </p>
              <p className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg text-gray-600 dark:text-gray-300 text-xs border border-green-400">
                Use logos on approved light or dark backgrounds. Maintain
                minimum clear space. Use only provided colour variants.
                Reproduce with correct proportions.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-600 dark:text-red-400 mb-2">
                Not Permitted
              </p>
              <p className="bg-red-100 p-3.5 rounded-lg dark:bg-red-900/20 text-gray-600 dark:text-gray-300 text-xs border border-red-400">
                Modify, recolour, or distort the logo. Add effects such as
                shadows or outlines. Use unapproved colour combinations. Place
                on visually busy or conflicting backgrounds.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Minimum Clear Space
              </p>
              <p className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-gray-600 dark:text-gray-400 text-xs border border-gray-400">
                Maintain a minimum clear space equal to the height of the "G"
                letterform on all sides of the logo. This applies in all digital
                and print contexts.
              </p>
            </div>
          </div>
          <div className="bg-black text-white w-full p-3 text-sm mt-5 rounded-xl">
            <span>⚖️ </span>Use of GoLite Mobile brand assets must comply with
            official brand guidelines. Unauthorized modification, commercial
            misuse, or reproduction outside of approved media contexts is
            strictly prohibited. For licensing enquiries contact
            press@golitemobile.com.
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
            FOUNDER & EXECUTIVE LEADERSHIP
      ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16  dark:bg-gray-950 dark:text-white ">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Founder & Executive Leadership</h2>
          <p className="text-sm  dark:bg-gray-950 dark:text-white  text-gray-500 mt-1">
            Media-ready biographies and approved headshots for editorial use.
          </p>
        </div>

        <div className="space-y-6 rounded-xl">
          {leaders.map((leader, i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm gap-6 items-start"
            >
              {/* Image */}
              <div className="relative w-full md:w-56 h-64 shrink-0 overflow-hidden">
                <Image
                  src={leader.img}
                  alt={leader.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col p-6">
                <p className="text-xs font-semibold  dark:bg-gray-950 dark:text-white  text-green-600 uppercase tracking-widest mb-1">
                  {leader.role}
                </p>
                <h3 className="text-xl font-bold text-black mb-0.5">
                  {leader.name}
                </h3>
                <p className="text-xs  dark:bg-gray-950 dark:text-white  text-gray-500 mb-3">
                  {leader.companies}
                </p>
                <blockquote className="border-l-4  dark:bg-gray-950 dark:text-white  border-green-400 pl-4 text-sm text-gray-600 leading-relaxed">
                  {leader.bio}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────
            NEWS & ANNOUNCEMENTS
      ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">News & Announcements</h2>
          <p className="text-sm text-gray-500 mt-1">
            Official press releases and corporate announcements, latest first.
          </p>
        </div>
        {/* Filter Pills */}
        <div className="flex gap-2 flex-wrap justify-center mb-8">
          {newsFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-sm px-4 py-1.5 rounded-full border transition-all ${
                activeFilter === f
                  ? "bg-green-500 text-white border-green-500"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* News Items */}
        <div className="space-y-3 ">
          {filteredNews.map((item, i) => (
            <div
              key={i}
              className={` hover:bg-green-100 dark:bg-gray-950 dark:text-white  bg-white rounded-xl shadow-sm p-5 flex gap-5 items-start border-l-4 ${
                item.tags.includes("LATEST")
                  ? "border-green-500"
                  : "border-transparent"
              }`}
            >
              {/* Date */}
              <div className="shrink-0 text-center w-10">
                <p className="text-2xl font-bold leading-none">{item.day}</p>
                <p className="text-xs text-gray-400 font-medium">
                  {item.month}
                </p>
                <p className="text-xs text-gray-300">{item.year}</p>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex gap-2 flex-wrap mb-1.5">
                  {item.tags.map((tag, ti) => (
                    <span
                      key={ti}
                      className={`text-xs px-2 py-0.5 rounded font-semibold ${
                        tagColorMap[tag as keyof typeof tagColorMap] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="shrink-0 flex flex-col items-end gap-2">
                <button className="text-xs text-green-700 font-medium hover:underline whitespace-nowrap">
                  Read More →
                </button>
                {item.hasPdf && (
                  <span className="text-xs text-green-700 px-2 py-0.5 rounded flex items-center gap-1">
                    📄 PDF
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-8">
          <button className="text-sm border border-gray-300 px-6 py-2 rounded-full hover:bg-gray-100 transition-all">
            View All Press Releases →
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
            PHOTOGRAPHY & VISUAL ASSETS
      ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16 dark:bg-gray-950">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
            Photography & Visual Assets
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 max-w-xl mx-auto">
            High-resolution images and video assets approved for editorial and
            media publication.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {visualAssets.map((asset, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-900"
            >
              {/* Top Icon Area */}
              <div
                className={`h-28 flex items-center justify-center ${asset.bg} relative`}
              >
                {/* Replace emoji with icon later */}
                <span className="text-3xl">
                  <Image
                    src={asset.img}
                    alt={asset.title}
                    width={28}
                    height={28}
                  />
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition rounded-t-xl" />
              </div>

              {/* Bottom Content */}
              <div className="p-3">
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                  {asset.title}
                </p>
                <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                  {asset.desc}
                </p>
              </div>
            </div>
          ))}
          <div className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group bg-white dark:bg-gray-900">
            {/* Top Icon Area */}
            <div
              className={`h-28 bg-gray-900 flex items-center justify-center relative`}
            >
              {/* Replace emoji with icon later */}
              <span className="text-3xl">🎬</span>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition rounded-t-xl" />
            </div>

            {/* Bottom Content */}
            <div className="p-3">
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-100">
                B-Roll Footage
              </p>
              <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                Network & lifestyle · 16 clips
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
            SUSTAINABILITY AT THE CORE
      ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="rounded-2xl p-8 bg-linear-to-r from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* LEFT SIDE */}
            <div>
              {/* Header */}
              <p className="flex text-xs font-semibold text-green-600 uppercase tracking-widest mb-2">
                <span><Image src="/img/Presskit/leaf.png" alt="Blue Economy" width={16} height={16} className="inline-block" /> Blue Economy Positioning</span> 
              </p>

              <h2 className="text-3xl font-bold text-green-600 dark:text-white mb-3">
                Sustainability at the Core
              </h2>

              <p className="text-sm text-green-600 dark:text-gray-400 max-w-md mb-6 leading-relaxed">
                GoLite Mobile's sustainability framework is not peripheral — it
                is embedded into the company's operational model, brand
                identity, and strategic vision. This section provides approved
                messaging and materials for journalists covering ESG and
                responsible technology.
              </p>

              {/* Feature Cards (2x2) */}
              <div className="grid grid-cols-2 gap-4">
                {sustainabilityFeatures.map((feat, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm"
                  >
                    <p className="text-xl mb-2">{feat.icon}</p>
                    <h4 className="font-semibold text-sm text-green-600 dark:text-white mb-1">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-green-700 dark:text-gray-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {sustainabilityStats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-900 rounded-xl p-5 text-center shadow-sm"
                >
                  <p className="text-2xl font-bold text-green-600">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-700 dark:text-gray-400 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
            MEDIA CONTACT
      ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div
          className="rounded-2xl p-5 md:p-8 
    bg-linear-to-r from-[#1e2f4d] to-[#243b5a] 
    dark:from-[#0f172a] dark:to-[#1e293b] text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div>
              <span className="text-xs bg-white/10 px-3 py-1 rounded-full font-semibold tracking-widest uppercase">
                Media Contact
              </span>

              <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2">
                Speak with Our Media Team
              </h2>

              <p className="text-sm text-gray-300 mb-6 leading-relaxed">
                Our media relations team supports journalists and partners with
                fast, accurate information.
              </p>

              <div className="space-y-3">
                {contacts.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/5 rounded-xl p-3 w-full"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                      <Image src={item.icon} alt={item.label} width={18} height={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-gray-400 uppercase">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="w-full">
              <div className="bg-white/5 backdrop-blur rounded-xl p-4 md:p-5 border border-white/10 w-full">
                <h3 className="font-semibold mb-4 text-sm">
                  Response Commitments
                </h3>

                <div className="space-y-3 mb-6">
                  {responseCommitments.map((r, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-start text-sm border-b border-white/10 pb-2 gap-2"
                    >
                      <span className="text-gray-300 wrap-break-word">
                        {r.type}
                      </span>
                      <span className="font-semibold whitespace-nowrap">
                        {r.time}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl text-sm font-semibold">
                  Send a Media Enquiry
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}