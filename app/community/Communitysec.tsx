
import React from "react";
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
    icon: "/img/👥.png",
  },
  {
    value: "28,000+",
    label: "Solved Discussions",
    icon: "/img/✅.png",
  },
  {
    value: "92%",
    label: "Helpfulness Rating",
    icon: "/img/⭐.png",
  },
  {
    value: "24/7",
    label: "Moderated & Verified",
    icon: "/img/🛡️.png",
  },
];

/* CATEGORIES */
const categories = [
  {
    title: "Network & Coverage",
    icon: "/img/Background.png",
  },
  {
    title: "Devices & eSIM",
    icon: "/img/Background (1).png",
  },
  {
    title: "Billing & Payments",
    icon: "/img/Background (2).png",
  },
  {
    title: "Plans & Account",
    icon: "/img/Background (3).png",
  },
  {
    title: "Roaming & International",
    icon: "/img/Background (9).png",
  },
  {
    title: "Technical Support",
    icon: "/img/Background (4).png",
  },
  {
    title: "Business Solutions",
    icon: "/img/Background (5).png",
  },
  {
    title: "Blue Economy & Sustainability",
    icon: "/img/Background (6).png",
  },
  {
    title: "Product Feedback",
    icon: "/img/Background (7).png",
  },
  {
    title: "Announcements",
    icon: "/img/Background (8).png",
  },
];

/* POSTS */
const posts = [
  {
    tag: "Solved",
    title: "How do I switch from 4G to 5G on my Samsung Galaxy S24?",
    author: "Priya Patel",
  },
  {
    tag: "Official",
    title: "Why was I charged twice for my recharge this month?",
    author: "Arjun Mehta",
  },
  {
    tag: "Needs Attention",
    title:
      "eSIM activation stuck at ‘Downloading Profile’ on iPhone 15 Pro",
    author: "Sneha Kulkarni",
  },
  {
    tag: "Guide",
    title:
      "Complete guide: Porting your number to GoLife in under 10 minutes",
    author: "Vikram Nair",
  },
];

export default function Communitysec() {
  return (
    <>
    <div className="w-full dark:bg-gray-900 dark:text-white bg-gray-50 text-gray-800">

      {/* HERO */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 dark:text-white text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Connect, Learn and Solve Together
        </h1>
        <p className="text-sm md:text-base mb-6 opacity-90  ">
          Get answers from the GoLite Mobile community, verified experts, and
          official support resources — all in one place.
        </p>

        <div className="flex justify-center gap-2 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search discussions, guides, or ask a question..."
            className="flex-1 px-4 py-2 rounded-full bg-white text-black outline-none"
          />
          <button className="bg-orange-500 px-5 py-2 rounded-full font-medium">
            Search the Community
          </button>
        </div>
      </section>

      {/* FEATURE BAR */}
      <div className="bg-gray-100 py-6 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {features.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Image src={item.icon} alt="" width={40} height={40} />
              </div>
              <div>
                <p className="text-sm font-semibold dark:bg-gray-900 dark:text-white  ">{item.title}</p>
                <p className="text-xs text-gray-500 dark:bg-gray-900 dark:text-white">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 dark:border-amber-100">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 text-center dark:bg-gray-900 dark:text-white dark:border-amber-100"
            >
              <div className="flex justify-center mb-2">
                <Image src={stat.icon} alt="" width={24} height={24} />
              </div>
              <p className="text-xl font-bold ">{stat.value}</p>
              <p className="text-sm text-gray-500  dark:bg-gray-900 dark:text-white dark:border-amber-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="py-12 px-4 max-w-6xl mx-auto  dark:bg-gray-900 dark:text-white  dark:border-amber-800-20 dark:border-2 border-blue-400">
        <h2 className="text-3xl font-semibold text-center mb-6">
             What Can We Help You With?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 ">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition  dark:bg-gray-900 dark:text-white"
            >
              <div className="mb-3">
                <Image src={cat.icon} alt="" width={38} height={38} />
              </div>
              <p className="text-sm font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT'S HAPPENING */}
<section className="py-12 px-4 bg-gray-50 dark:bg-gray-900 dark:text-white ">
  <div className="max-w-6xl mx-auto text-center">
    
    <h2 className="text-2xl md:text-3xl font-semibold mb-2">
      What’s Happening in the Community
    </h2>
    <p className="text-gray-500 text-sm mb-6 dark:bg-gray-900 dark:text-white ">
      Official updates, trending discussions, and expert-verified answers.
    </p>

    {/* TABS */}
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      <button className="px-4 py-1.5 rounded-full bg-orange-500  dark:text-white  text-white text-sm">
        Official Updates
      </button>
      <button className="px-4 py-1.5 rounded-full  dark:bg-orange-500  dark:text-white  bg-gray-200 text-sm">
        Trending
      </button>
      <button className="px-4 py-1.5 rounded-full dark:bg-orange-500  dark:text-white  bg-gray-200 text-sm">
        Recently Solved
      </button>
      <button className="px-4 py-1.5 rounded-full dark:bg-orange-500  dark:text-white  bg-gray-200 text-sm">
        Popular Guides
      </button>
    </div>

    {/* CARDS */}
    <div className="grid md:grid-cols-3 gap-6 text-left">
      
      {/* Card 1 */}
      <div className="border border-orange-400 rounded-xl p-5 bg-white dark:bg-gray-900 dark:text-white">
        <h3 className="font-semibold mb-2">
          5G Network Expansion — New Cities Added This Month
        </h3>
        <p className="text-sm text-gray-600 mb-4 dark:bg-gray-900 dark:text-white">
          We’ve expanded 5G coverage to 14 new cities across India, including Pune,
          Ahmedabad, and Jaipur.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full dark:bg-gray-900 dark:text-white" />
          <div>
            <p className="text-sm font-medium">GoLite Team</p>
            <p className="text-xs text-gray-500 dark:bg-gray-900 dark:text-white">
              Official Announcement · 2 days ago
            </p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="border border-orange-400 rounded-xl p-5 bg-white dark:bg-gray-900 dark:text-white   ">
        <h3 className="font-semibold mb-2">
          Scheduled Maintenance Notice — March 22, 2:00–4:00 AM IST
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Brief planned maintenance may affect data services in select areas.
          Calls and SMS remain unaffected.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full" />
          <div>
            <p className="text-sm font-medium">GoLite Network Ops</p>
            <p className="text-xs text-gray-500">
              Official Notice · 6 hours ago
            </p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="border border-orange-400 rounded-xl p-5 dark:bg-gray-900 dark:text-white bg-white">
        <h3 className="font-semibold mb-2">
          Go Unlimited Plan Now Includes Free Roaming
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          From April 1st, subscribers get free roaming in Canada & Mexico.
        </p>
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-orange-500 rounded-full" />
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
      <section className="bg-gray-100 py-12 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-6">
            Join the Conversation
          </h2>

          <div className="space-y-4">
            {posts.map((post, i) => (
              <div
                key={i}
                className=" dark:bg-gray-900 dark:text-white bg-white p-4 rounded-xl shadow flex justify-between items-start"
              >
                <div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                    {post.tag}
                  </span>
                  <p className="mt-2 font-medium">{post.title}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {post.author}
                  </p>
                </div>
                <button className="text-sm text-indigo-500 ">View</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-12 px-4 max-w-6xl mx-auto dark:bg-gray-900 dark:text-white">
        <h2 className="text-xl font-semibold text-center mb-6">
          Helpful Resources Before You Post
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Activate your eSIM",
            "Check Coverage",
            "Network Status",
            "Manage Plan",
            "Billing FAQs",
            "Switch to GoLife",
          ].map((item, i) => (
            <div key={i} className= " dark:bg-gray-900 dark:text-white bg-white p-4 rounded-xl shadow">
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GREEN SECTION */}
      <section className="bg-green-100 py-12 px-4 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-xl font-bold  text-green-800 mb-3">
              A Community Built Around a Greener Future
            </h2>
            <ul className="text-sm space-y-2 text-green-900">
              <li>✔ 1 Tree planted across India</li>
              <li>✔ Ocean plastic offset</li>
              <li>✔ Renewable energy powered network</li>
              <li>✔ Quarterly sustainability challenges</li>
            </ul>

            <button className="mt-4  bg-green-600 text-white px-4 py-2 rounded-full">
              Explore Sustainability
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {["48K+", "12T", "100%", "1.2K"].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl text-center shadow"
              >
                <p className="text-lg font-bold text-green-700">{stat}</p>
                <p className="text-xs  text-gray-500">Impact</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>


    



</>

  );
}