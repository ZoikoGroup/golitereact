"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Service = {
  name: string;
  status: "Operational" | "Degraded" | "Outage";
  description: string;
  updated: string;
  icon: string;
};

type Metrics = {
  uptime: string;
  uptimeSub: string;
  incidents: number;
  incidentsSub: string;
  responseTime: string;
  responseTimeSub: string;
  sla: string;
  slaSub: string;
};

const helpItems = [
  {
    icon: "/img/Networkstatus/headphone.png",
    title: "Contact Support",
    desc: "Speak directly with a GoLite support specialist. Available 24/7 via chat, phone, or callback.",
    btn: "Contact Support",
    type: "primary",
    bgclr: "orange-100",
  },
  {
    icon: "/img/Networkstatus/sms.png",
    title: "Community Forum",
    desc: "Browse solved discussions and get advice from 120K+ community members and verified experts.",
    btn: "Visit Forum",
    type: "success",
    bgclr: "green-100",
  },
  {
    icon: "/img/Networkstatus/guide.png",
    title: "Troubleshooting Guide",
    desc: "Step-by-step guides for common issues: data settings, eSIM setup, roaming configuration, and more.",
    btn: "View Guides",
    type: "outline",
    bgclr: "blue-100",
  },
];

const services=[
      {
        name: "Mobile Data",
        status: "Operational",
        description:
          "4G and 5G services running at full capacity. Average speeds nominal across all regions.",
        updated: "1 min ago",
        icon: "/img/Networkstatus/mdata.png",
      },
      {
        name: "Voice Calls",
        status: "Operational",
        description:
          "All voice call services including HD Voice and VoLTE are fully operational with no disruptions.",
        updated: "1 min ago",
        icon: "/img/Networkstatus/phone.png",
      },
      {
        name: "SMS / Messaging",
        status: "Operational",
        description:
          "Standard SMS, MMS, and messaging services are delivering without delay nationwide.",
        updated: "2 min ago",
        icon: "/img/Networkstatus/sms.png",
      },
      {
        name: "eSIM Activation",
        status: "Degraded",
        description:
          "Some customers may experience delays of up to 15 minutes during eSIM provisioning. Investigation underway.",
        updated: "6 min ago",
        icon: "/img/Networkstatus/mobile.png",
      },
      {
        name: "Roaming",
        status: "Operational",
        description:
          "International roaming across all 200+ partner countries is functioning normally with no reported issues.",
        updated: "3 min ago",
        icon: "/img/Networkstatus/earth.png",
      },
      {
        name: "Customer Portal & App",
        status: "Operational",
        description:
          "The GoLite app and web portal are fully operational. Login, billing, and plan management all functioning normally.",
        updated: "1 min ago",
        icon: "/img/Networkstatus/desktop.png",
      },
    ];
export default function NetworkStatus() {
  // const [services, setServices] = useState<Service[]>([]);
  const [metrics, setMetrics] = useState<Metrics>({
    uptime: "",
    uptimeSub: "",
    incidents: 0,
    incidentsSub: "",
    responseTime: "",
    responseTimeSub: "",
    sla: "",
    slaSub: "",
  });

  useEffect(() => {
    setMetrics({
      uptime: "99.97%",
      uptimeSub: "↑ 0.22% vs prior month",
      incidents: 2,
      incidentsSub: "↓ 3 fewer than Feb",
      responseTime: "34 min",
      responseTimeSub: "↑ Improved from 52 min",
      sla: "99.91%",
      slaSub: "↑ Above SLA target",
    });
  }, []);

  const statusDotColor = (status: string) => {
    if (status === "Operational") return "#16a34a";
    if (status === "Degraded") return "#ca8a04";
    return "#dc2626";
  };

  const statusTextColor = (status: string) => {
    if (status === "Operational") return "text-green-600";
    if (status === "Degraded") return "text-yellow-600";
    return "text-red-600";
  };

  // Generate bar chart data
  const bars = Array.from({ length: 90 }, (_, i) => {
    const rand = Math.random();
    if (rand > 0.97) return "outage";
    if (rand > 0.93) return "degraded";
    return "operational";
  });

  return (
    <section className="bg-gray-100 dark:bg-gray-950 dark:text-white text-gray-800 min-h-screen">
      
      {/* HERO */}
      <div className="bg-linear-to-r from-[#7085EA] to-[#9476B2] text-white text-center py-12 px-4">
        <h1 className="text-4xl font-bold">All Systems Operational</h1>
        <p className="text-sm mt-2 text-white/80">
          All GoLite Mobile services are running normally. No disruptions
          detected across any region.
        </p>

        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <span className="text-sm dark:text-white text-white/70 self-center">
            Demo Simulate status:
          </span>
          {[
            { label: "Operational", color: "bg-green-600" },
            { label: "Degraded", color: "bg-yellow-500" },
            { label: "Partial Outage", color: "bg-orange-500" },
            { label: "Major Outage", color: "bg-red-500" },
          ].map((s) => (
            <span
              key={s.label}
              className={`px-4 py-1 text-xs rounded-full text-white font-medium ${s.color}`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>

      {/* LOCAL STATUS */}
      <div className="bg-[#f5f7f6] dark:bg-gray-950 py-10 px-4">
        <div className="max-w-5xl mx-auto bg-[#f9fbfa] dark:bg-gray-900 rounded-2xl shadow-md p-8">
          {/* Header */}
          <p className="bg-green-100 max-w-fit p-2 rounded-2xl text-xs text-green-600 font-semibold uppercase tracking-wide mb-2">
            📍 Check Your Area
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            Get Your Local Network Status
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6 max-w-md">
            Enter your postcode or let us detect your location to see real-time
            network performance specific to you.
          </p>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-8 items-center">
            {/* LEFT */}
            <div>
              {/* Input + Button */}
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <input
                  placeholder="Enter postcode or city..."
                  className="flex-1 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-sm font-medium shadow-sm">
                  Check
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
              </div>

              {/* Auto detect */}
              <div className="text-center">
                <button className="text-green-600 dark:text-green-400 text-sm font-semibold hover:underline">
                  Auto-detect my location
                </button>
              </div>
            </div>

            {/* RIGHT RESULT */}
            <div className="relative md:-top-12 bg-green-100/70 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-xl p-5">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                <span className="text-lg">
                  <Image src="/img/Networkstatus/tic.png" alt="Checkmark" width={24} height={24} />
                  </span>
                No known issues in your area
              </div>

              <p className="text-xs text-green-700/80 dark:text-green-300 mt-1">
                Mumbai, Maharashtra · Updated 2 min ago
              </p>

              <div className="flex gap-2 mt-3 flex-wrap">
                {["Mobile Data", "Voice Calls", "SMS", "5G Active"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="text-xs bg-white/70 dark:bg-green-800 text-green-700 dark:text-green-200 px-2 py-1 rounded-full border border-green-200 dark:border-green-700"
                    >
                      • {chip}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICES */}
      <section className="bg-[#f5f7f6] dark:bg-gray-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Heading */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Service-by-Service Status
          </h2>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            A real-time view of all GoLite Mobile services across the network.
          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {services.map((service, i) => (
              <div
                key={i}
                className={`
            rounded-xl p-4 border border-t-4 transition
            bg-white dark:bg-gray-900
            ${
              service.status === "Operational"
                ? "border-green-500 dark:border-green-700"
                : "border-yellow-500 dark:border-yellow-700"
            }
          `}
              >
                {/* Top Row */}
                <div className="flex justify-between items-start mb-3">
                  {/* Icon */}
                  <div
                  className={`w-12 h-12 bg-gray-200 flex items-center justify-center rounded-lg  dark:bg-gray-800 mb-4`}
                >
                  <Image
                  src={service.icon} 
                  alt={service.name}
                  width={28}
                  height={28}
                />
                </div>

                  {/* Status */}
                  <div
                    className={`
              text-[11px] font-medium flex items-center gap-1 px-2 py-0.5 rounded-full
              ${
                service.status === "Operational"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              }
            `}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {service.status}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom */}
                <div className="flex justify-between items-center mt-4 text-xs">
                  <span className="text-gray-400 dark:text-gray-500">
                    Updated {service.updated}
                  </span>

                  <button
                    className={`font-medium hover:underline ${
                      service.status === "Degraded"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {service.status === "Degraded"
                      ? "View incident →"
                      : "View details →"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <div className=" bg-white text-black mt-12 py-12 px-4 dark:bg-gray-950 dark:text-white">
        <h2 className="text-center text-2xl font-bold">
          Network Reliability Last 90 Days
        </h2>
        <p className="text-center text-sm dark:bg-gray-950 dark:text-white text-gray-400 mt-1">
          Our track record of uptime, incident frequency, and service
          consistency.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
          {[
            {
              value: metrics.uptime,
              label: "Network Uptime\nlast 30 days",
              sub: metrics.uptimeSub,
            },
            {
              value: String(metrics.incidents),
              label: "Incidents\nThis Month",
              sub: metrics.incidentsSub,
            },
            {
              value: metrics.responseTime,
              label: "Avg. Resolution Time\n30-day average",
              sub: metrics.responseTimeSub,
            },
            {
              value: metrics.sla,
              label: "Network Uptime\nlast 90 days",
              sub: metrics.slaSub,
            },
          ].map((m, i) => (
            <div
              key={i}
              className="border border-gray-200 dark:bg-gray-950 dark:text-white bg-white text-black p-5 rounded-xl text-center"
            >
              <p className="text-3xl font-bold text-green-600">{m.value}</p>
              <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 mt-1 whitespace-pre-line leading-snug">
                {m.label}
              </p>
              <p className="text-xs text-green-600 mt-2 font-medium">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* 90-Day Uptime History bar chart */}
        <div className="max-w-4xl mx-auto mt-8 bg-white/5 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">90-Day Uptime History</h3>
            <div className="flex gap-4 text-xs  dark:text-white text-gray-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />{" "}
                Operational
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />{" "}
                Degraded
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />{" "}
                Outage
              </span>
            </div>
          </div>
          <div className="flex items-end gap-0.5 h-16">
            {bars.map((status, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height:
                    status === "outage"
                      ? "40%"
                      : status === "degraded"
                        ? "70%"
                        : "100%",
                  backgroundColor:
                    status === "outage"
                      ? "#ef4444"
                      : status === "degraded"
                        ? "#eab308"
                        : "#22c55e",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs dark:bg-gray-950 dark:text-white text-gray-500 mt-2">
            <span>Jan 10</span>
            <span>Feb 1</span>
            <span>Feb 15</span>
            <span>Mar 1</span>
            <span>Mar 10</span>
          </div>
        </div>
      </div>

      {/* SUBSCRIBE */}
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto bg-linear-to-r from-[#7085EA] to-[#9476B2] rounded-2xl p-8 text-white grid md:grid-cols-[1.2fr_1fr] gap-8 items-center shadow-md">
          {/* LEFT */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold">
              Get Real-Time Network Updates
            </h2>

            <p className="text-sm text-white/80 mt-2 max-w-md">
              Never be caught off guard. Subscribe to instant alerts the moment
              an incident starts, updates, or is resolved — delivered how you
              prefer.
            </p>

            {/* Options */}
            <div className="flex flex-wrap gap-2 mt-4">
              {["Email", "SMS", "Push Notification"].map((btn) => (
                <button
                  key={btn}
                  className="flex items-center gap-1 bg-white/20 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur"
                >
                  {btn === "Email" && "📧"}
                  {btn === "SMS" && "💬"}
                  {btn === "Push Notification" && "🔔"}
                  {btn}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT FORM (GLASS CARD) */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20">
            {/* Email */}
            <label className="text-xs text-white/70 block mb-1">
              Your email address
            </label>

            <input
            type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-full bg-white/90 text-gray-800 text-sm mb-3 outline-none"
            />

            {/* Services */}
            <label className="text-xs text-white/70 block mb-1">
              Services to monitor (optional)
            </label>

            <input
              placeholder="e.g. Mobile Data, eSIM, Roaming..."
              className="w-full px-4 py-2.5 rounded-full bg-white/90 text-gray-800 text-sm mb-4 outline-none"
            />

            {/* Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-full text-sm font-semibold">
              Subscribe to Alerts
            </button>

            <p className="text-xs text-white/60 mt-2 text-center">
              1-click to unsubscribe at any time · No spam — updates only
            </p>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="bg-[#f5f7f6] dark:bg-gray-950 py-14 px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block bg-orange-100 text-orange-600 text-[11px] px-3 py-1 rounded-full font-semibold mb-3">
            NEED HELP?
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Still Experiencing an Issue?
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8">
            If your problem isn't reflected above, our team and community are
            ready to help.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {helpItems.map((item) => (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-sm transition"
              >
                {/* Icon Box */}
                <div
                  className={`w-12 h-12 mx-auto flex items-center justify-center rounded-lg bg-${item.bgclr} dark:bg-gray-800 mb-4`}
                >
                  <Image
                  src={item.icon} 
                  alt={item.title}
                  width={28}
                  height={28}
                />
                </div>

                {/* Title */}
                <h3 className="font-semibold text-sm text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  {item.desc}
                </p>

                {/* Button */}
                <button
                  className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                    item.type === "primary"
                      ? "bg-orange-500 hover:bg-orange-600 text-white"
                      : item.type === "success"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.btn}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API */}
      <section className="px-4 py-10">
        <div className="max-w-5xl mx-auto bg-linear-to-r from-[#1b1e3a] to-[#1f2245] text-white rounded-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-md">
          {/* LEFT CONTENT */}
          <div>
            {/* Badge */}
            <span className="inline-block bg-green-200 text-green-700 text-[11px] px-3 py-1 rounded-full font-semibold mb-3">
              ⚙ ENTERPRISE API
            </span>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold">System Status API</h3>

            {/* Description */}
            <p className="text-sm text-gray-300 mt-2 max-w-md">
              Integrate GoLite network status directly into your own dashboards,
              NOC tools, or operations platforms. Fully documented, JSON-based,
              and publicly accessible.
            </p>

            {/* Code Box */}
            <div className="bg-white/10 border border-white/10 rounded-lg px-4 py-3 mt-4 text-xs font-mono text-green-400 max-w-md">
              GET https://api.golite.com/v1/status
              <br />
            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-green-500 hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-sm">
              View API Docs →
            </button>

            <button className="border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-medium">
              Get API Key
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}
