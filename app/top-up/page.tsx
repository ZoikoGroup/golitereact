"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function GoLiteHero() {
 function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
        <span className="w-8 h-8 bg-white rounded-sm" />
      </div>
      <h3 className="mt-6 font-bold text-orange-500">{title}</h3>
      <p className="mt-2 text-gray-600 max-w-xs mx-auto">{desc}</p>
    </div>
  );
}
function Arrow({ curve }: { curve: "up" | "down" }) {
  return (
    <svg
      width="300"     // ⬅ longer arrow
      height="100"
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="arrowHead"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <path d="M0 0 L10 5 L0 10 Z" fill="#BDBDBD" />
        </marker>
      </defs>

      {/* Box 1 → Box 2 */}
      {curve === "up" && (
        <path
          d="M10 50 C70 5, 150 5, 210 50"
          stroke="#BDBDBD"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          markerEnd="url(#arrowHead)"
        />
      )}

      {/* Box 2 → Box 3 */}
      {curve === "down" && (
        <path
          d="M10 50 C70 95, 150 95, 210 50"
          stroke="#BDBDBD"
          strokeWidth="2"
          strokeDasharray="6 6"
          fill="none"
          markerEnd="url(#arrowHead)"
        />
      )}
    </svg>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="flex items-start gap-4">
      <span className="mt-1 flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white">
        ✓
      </span>
      <p className="text-gray-800 text-lg">
        <strong>{title}</strong> {desc}
      </p>
    </li>
  );
}

/* ---------- Card Component ---------- */

function Card({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 px-8 py-10 text-center shadow-sm">
      <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center">
        {children}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-3">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

/* ---------- Icons ---------- */

function SignalIcon() {
  return (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 20h2v-6H2v6zm4 0h2v-10H6v10zm4 0h2v-14h-2v14zm4 0h2V4h-2v16zm4 0h2V2h-2v18z" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16.5 12.5l-4 4a2 2 0 0 1-2.8 0l-3.7-3.7a2 2 0 0 1 0-2.8l4-4a2 2 0 0 1 2.8 0l3.7 3.7a2 2 0 0 1 0 2.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  );
}

function PriceIcon() {
  return (
    <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 2 7v10l10 5 10-5V7L12 2zm1 14.5h-2V15h-1v-2h1v-1h-1V10h1V9h2v1h1v2h-1v1h1v2h-1v1z" />
    </svg>
  );
}
  return (
    <>
    <Header />
    
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
            GoLite Top-Up Plans:
            <br />
            Big Value for Just <span className="text-black">$10!</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed max-w-xl">
            Stay connected without limits—at a price that works for you.
            With the GoLite Top-Up Plan, you get premium-quality talk,
            text, and data for just $10 per month.
          </p>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed max-w-xl">
            No contracts, no hidden fees, just pure value. Whether you're
            a light user or someone who needs a little extra data,
            GoLite’s Top-Up Plans are designed to keep you connected
            without breaking the bank.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition">
              Buy Plan
            </button>

            <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold px-8 py-3 rounded-full transition">
              Contact Us
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center lg:justify-end">
          <img
            src="/img/topup.webp"
            alt="GoLite Top-Up Plans"
            className="max-w-md w-full"
          />
        </div>

      </div>
    </section>
      <section className="bg-[#FFF1E9] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-20">
          How to Get Started
        </h2>

        {/* DESKTOP LAYOUT */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-6">

          <Step
            title="Choose the GoLite Top-Up Plan"
            desc="Select the $10 plan at checkout."
          />

          <Arrow curve="up" />

          <Step
            title="Activate Your pSIM or eSIM"
            desc="Follow the easy activation steps on our website or app."
          />

          <Arrow curve="down" />

          <Step
            title="Top Up Anytime"
            desc="Renew your plan seamlessly whenever you need more minutes, texts, or data."
          />

        </div>

        {/* MOBILE STACK */}
        <div className="md:hidden space-y-12">
          <Step
            title="Choose the GoLite Top-Up Plan"
            desc="Select the $10 plan at checkout."
          />
          <Step
            title="Activate Your pSIM or eSIM"
            desc="Follow the easy activation steps on our website or app."
          />
          <Step
            title="Top Up Anytime"
            desc="Renew your plan seamlessly whenever you need more minutes, texts, or data."
          />
        </div>
      </div>
    </section>

    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 text-center uppercase mb-16">
          What You Get With The GoLite Top-Up Plan
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}
          <div className="relative flex justify-center">
            <img
              src="/img/topupoffer.png"
              alt="GoLite Plan"
              className="max-w-md w-full"
            />

          </div>

          {/* Right Content */}
          <div>
            <ul className="space-y-6">

              <Feature
                title="2,000 Minutes:"
                desc="Crystal-clear nationwide calls to stay in touch with loved ones."
              />

              <Feature
                title="2,000 SMS:"
                desc="Send unlimited texts to friends and family."
              />

              <Feature
                title="500 MMS:"
                desc="Share photos, videos, and more effortlessly."
              />

              <Feature
                title="2.5GB of High-Speed 5G Data:"
                desc="Browse, stream, and connect on a top-tier network."
              />

            </ul>

            {/* Button */}
            <button className="mt-10 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-3 rounded-lg transition">
              Buy Plan
            </button>
          </div>

        </div>
      </div>
    </section>

    <section className="bg-[#FFF4ED] py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 uppercase mb-20">
          Why Choose The GoLite Top-Up Plan?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          <Card
            title="Nationwide Coverage"
            desc="Enjoy reliable, fast, and always-connected service on one of the nation’s top networks. Whether you’re at home, at work, or on the go, GoLite keeps you connected."
          >
            <SignalIcon />
          </Card>

          <Card
            title="No Contracts, No Commitments"
            desc="With GoLite, you’re in control. Pay as you go, on your terms, with no long-term commitments or hidden fees."
          >
            <HandshakeIcon />
          </Card>

          <Card
            title="Fast & Easy Top-Ups"
            desc="Stay connected with seamless renewals. Top up your plan in seconds through the GoLite Mobile app or website."
          >
            <MailIcon />
          </Card>

        </div>

        {/* Bottom Center Card */}
        <div className="mt-12 flex justify-center">
          <div className="w-full md:w-1/3">
            <Card
              title="Premium Service, Unbeatable Price"
              desc="Get the power of a major network without the major cost. GoLite delivers premium connectivity at a price you’ll love."
            >
              <PriceIcon />
            </Card>
          </div>
        </div>

      </div>
    </section>
    <Footer />
    </>
  );
}
