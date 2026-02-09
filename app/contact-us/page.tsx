"use client"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="max-w-4xl mx-auto py-12 px-6 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 dark:text-white">
            Contact Us
          </h1>
          <p className="text-lg text-gray-700 mb-8 dark:text-gray-300">
            Fast, friendly, and reliable support—whether you need a new plan, an upgrade, or quick troubleshooting.
          </p>
        </section>
        <div className="dark:bg-gray-900 bg-gray-50 mb-12 pb-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-0 aligns-center">
                    
                    <div className="relative h-64 md:h-auto">
                        <Image
                            src="/img/contact-us.webp"
                            alt="Three friends looking at a smartphone together"
                            className="w-full h-full object-cover"
                            width={600}
                            height={200}
                        />
                    </div>

                    <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}