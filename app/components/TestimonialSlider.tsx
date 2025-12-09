export default function CustomerFeedback() {
  const testimonials = [
    {
      rating: 3,
      text: `"Switched to GoLite 6 months ago and couldn’t be happier. The 5G speeds are incredible and customer service is top-notch. Best decision I made!"`,
      name: "Rajesh Kumar",
      location: "Mumbai, Maharashtra",
      initial: "RK",
    },
    {
      rating: 5,
      text: `"Love the eco-friendly approach! Knowing that trees are planted with my subscription makes me feel good about my choice. Plus, the network is super reliable."`,
      name: "Priya Sharma",
      location: "Bangalore, Karnataka",
      initial: "PS",
    },
    {
      rating: 5,
      text: `"The app is so easy to use and I can manage everything from my phone. Data rollover feature is a game-changer. Highly recommended for everyone!"`,
      name: "Arjun Mehta",
      location: "Delhi NCR",
      initial: "AM",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Our Customer Feedback</h2>
        <p className="text-gray-600 mt-2">
          Join thousands of satisfied GoLite users
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6 text-left">
                {t.text}
              </p>

              {/* Profile */}
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-full font-semibold">
                  {t.initial}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
