"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { link } from "node:fs";

const plans = [
  { title: "Frequent Travelers", bg: "bg-orange-50", img: "/img/specialTraveler.png" },
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
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center mb-12">
        Shop Special Plans
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {plans.map((item, i) => (
          <div
            key={i}
            className={`relative rounded-2xl border border-gray-200 p-6 text-center ${item.bg}`}
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

            <h3 className="text-lg font-semibold text-blue-900 flex items-center justify-center gap-1 pt-8">
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
</section>
      {/* Travel Banner */}
       <section className="relative max-w-7xl mx-auto mb-20 px-4">
      <div className="relative bg-green-50 border border-green-200 rounded-2xl overflow-hidden py-10 px-6 md:px-10">

        {/* LEFT IMAGE (Traveler Couple) */}
        <div className="hidden md:block absolute left-4 bottom-0 w-[220px]">
          <Image
            src="/img/special-midBanner-img1.png"
            alt="Travelers"
            width={220}
            height={350}
            className="object-contain"
          />
        </div>

        {/* RIGHT IMAGE (Family Luggage) */}
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

          {/* FEATURE BADGES */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Image
              src="/img/special-midBanner-img3.png"
              alt="Plan features"
              width={520}
              height={120}
              className="object-contain"
            />
          </div>

          {/* CTA */}
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition">
            View Travel Plans
          </button>
        </div>
      </div>
    </section>
   <section className="relative max-w-7xl mx-auto mb-20 px-4">
  <div className="grid grid-cols-1 md:grid-cols-[7fr_6fr] rounded-2xl overflow-hidden">

    {/* LEFT – SOLID BLUE (NO GRADIENT) */}
    <div className="bg-[#005EB6] p-12 text-white flex flex-col justify-center">
      <h3 className="font-bold mb-6 leading-tight text-[3rem]">
        Supporting Those Who Protect Our Oceans
      </h3>

      <p className="text-base text-blue-100 mb-4 text-[1.2rem]">
        As a thank-you for your dedication to marine and aquatic life conservation, we're offering exclusive savings on our plans. Stay connected while making a difference!
      </p>

      <button onClick={() => router.push("/marine-discount-application")} className="bg-white text-[#005EB6] font-semibold px-24 py-3 rounded-lg w-fit px-6 py-3 mt-4 hover:bg-gray-100 transition">
        Apply for Discount
      </button>
    </div>

    {/* RIGHT – IMAGE WITH WHITE FADE ON LEFT */}
    <div className="relative overflow-hidden">
      <Image
    src="/img/specialPlanFooterBanner.jpg"
    alt="Ocean support"
    fill
    className="object-cover scale-[1.4]"
    priority
  />

      {/* ✅ WHITE IMAGE FADE (THIS IS THE KEY) */}
      <div className="absolute inset-y-0 left-0 w-20
        bg-gradient-to-r
        from-[#005EB6]
        via-[#005EB6]/60
        to-transparent" />
    </div>

  </div>
</section>




    <Footer />
    </>
  );
}
