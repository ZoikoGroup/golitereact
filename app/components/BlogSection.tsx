export default function BlogSection() {
  const blogs = [
    {
      tag: "TECHNOLOGY",
      date: "Dec 1, 2025",
      title: "How 5G is Transforming Mobile Connectivity in India",
      desc: "Discover the revolutionary impact of 5G technology and how it’s changing the way we connect, work, and live.",
      img: "/img/BlogPost1.png",
    },
    {
      tag: "SUSTAINABILITY",
      date: "Nov 28, 2025",
      title: "Our Green Promise: 1 Plan, 1 Tree Initiative",
      desc: "Learn about our commitment to sustainability and how your mobile plan is helping create a greener India.",
      img: "/img/BlogPost2.png",
    },
    {
      tag: "TIPS & TRICKS",
      date: "Nov 25, 2025",
      title: "10 Ways to Maximize Your Mobile Data Usage",
      desc: "Expert tips to get the most out of your data plan and save money on your monthly mobile bill.",
      img: "/img/BlogPost3.png",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold dark:text-white text-gray-900">Our Blogs</h2>
        <p className="dark:text-gray-400 text-gray-600 mt-2">
          Stay updated with the latest news and tips
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {/* Image */}
              <img
                src={b.img}
                className="w-full h-48 object-cover"
                alt={b.title}
              />

              {/* Content */}
              <div className="p-6 text-left">
                <div className="text-xs font-semibold text-orange-500 uppercase mb-1">
                  {b.tag}{" "}
                  <span className="text-gray-400 ml-2">{b.date}</span>
                </div>

                <h3 className="font-semibold text-lg dark:text-gray-200 mb-2 leading-tight">
                  {b.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 dark:text-gray-400">{b.desc}</p>

                <a className="text-orange-500 font-semibold text-sm flex items-center gap-1 cursor-pointer">
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>

        <button className="mt-10 bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
          View All Articles
        </button>
      </div>
    </section>
  );
}
