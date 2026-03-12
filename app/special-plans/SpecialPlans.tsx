"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { link } from "node:fs";
import Link from "next/link";

const plans = [
  { title: "Frequent Travelers", bg: "bg-orange-50", img: "/img/specialTraveler.png", link:"/travel-plans" },
  { title: "Students", bg: "bg-pink-50", img: "/img/specialStudent.png", offer: true, link: "/students-discount-application" },
  { title: "Streaming Enthusiasts", bg: "bg-purple-50", img: "/img/specialStreaming-enthusiasts.png", link: "/streaming-enthusiasts-plans" },
  { title: "First Responders", bg: "bg-teal-50", img: "/img/specialRirst-responder-img.png", offer: true, link: "/first-responder-discount-application" },
  { title: "Age 55+", bg: "bg-blue-50", img: "/img/specialAge-55.png", offer: true, link: "/senior-citizen-discount-enrollment-form" },
  { title: "Military & Veterans", bg: "bg-green-50", img: "/img/specialMilitary.png", offer: true, link: "/military-discount-eligibility-form" },
];

export default function ShopSpecialPlans() {
  const router = useRouter();

  return (
    <>
    <Header />
    <section className="w-full dark:bg-gray-900">
  <div className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-gray-100">
        Shop Community Plans
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {plans.map((item, i) => (
          <div
            key={i}
            className={`relative rounded-2xl dark:bg-gray-800 border border-gray-200 p-6 text-center ${item.bg}`}
          >
            {item.offer && (
              <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                SPECIAL OFFER
              </span>
            )}

            <div className="relative aspect-[7/5] w-full">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-contain"
              />
            </div>

            <h3 className="dark:text-blue-400 text-lg font-semibold text-blue-900 flex items-center justify-center gap-1 pt-8">
              <a
              href={item.link}
              className="flex items-center gap-1 hover:underline"
            >
              {item.title}
              <span>↗</span>
              </a>
            </h3>
          </div>
        ))}
      </div>
      </div>
</section>
      {/* Travel Banner */}
       <section className="dark:bg-gray-900 pb-20 px-4">
  <div className="max-w-7xl mx-auto">
    
    <div className="relative dark:bg-gray-800 bg-green-50 border border-green-200 rounded-2xl overflow-hidden py-10 px-6 md:px-10">

      {/* LEFT IMAGE */}
      <div className="hidden md:block absolute left-4 bottom-0 w-[220px]">
        <Image
          src="/img/special-midBanner-img1.png"
          alt="Travelers"
          width={220}
          height={350}
          className="object-contain"
        />
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden md:block absolute right-4 bottom-0 w-[260px]">
        <Image
          src="/img/special-midBanner-img2.png"
          alt="Family travel"
          width={260}
          height={350}
          className="object-contain"
        />
      </div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-8">
          Stay Connected Anywhere with Affordable Prepaid Travel Plans!
        </h3>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Image
            src="/img/special-midBanner-img3.png"
            alt="Plan features"
            width={520}
            height={120}
            className="object-contain"
          />
        </div>

        <Link
          href="/travel-plans"
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-block"
        >
          View Travel Plans
        </Link>
      </div>

    </div>

  </div>
</section>

   <section className="relative pb-20 px-4 dark:bg-gray-900">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[7fr_6fr] rounded-2xl overflow-hidden">

    {/* LEFT */}
    <div className="bg-[#005EB6] dark:bg-blue-900 p-12 text-white flex flex-col justify-center">
      <h3 className="font-bold mb-6 leading-tight text-[3rem]">
        Supporting Those Who Protect Our Oceans
      </h3>

      <p className="text-base text-blue-100 dark:text-blue-200 mb-4 text-[1.2rem]">
        As a thank-you for your dedication to marine and aquatic life conservation, we're offering exclusive savings on our plans. Stay connected while making a difference!
      </p>

      <button
        onClick={() => router.push("/marine-discount-application")}
        className="bg-white dark:bg-gray-200 text-[#005EB6] font-semibold px-6 py-3 rounded-lg w-fit mt-4 hover:bg-gray-100 transition"
      >
        Apply for Discount
      </button>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative overflow-hidden">
      <Image
        src="/img/resize/specialPlanFooterBanner.jpeg"
        alt="Ocean support"
        fill
        className="object-cover scale-[1.4]"
        priority
      />

      {/* FADE */}
      <div className="absolute inset-y-0 left-0 w-20
        bg-gradient-to-r
        from-[#005EB6] dark:from-blue-900
        via-[#005EB6]/60 dark:via-blue-900/60
        to-transparent" />
    </div>

  </div>
</section>





    <Footer />
    </>
  );
}
