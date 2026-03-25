"use client";

import React, { useEffect, useState } from "react";

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

export default function NetworkStatus() {
  const [services, setServices] = useState<Service[]>([]);
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
    setServices([
      {
        name: "Mobile Data",
        status: "Operational",
        description:
          "4G and 5G services running at full capacity. Average speeds nominal across all regions.",
        updated: "1 min ago",
        icon: "📶",
      },
      {
        name: "Voice Calls",
        status: "Operational",
        description:
          "All voice call services including HD Voice and VoLTE are fully operational with no disruptions.",
        updated: "1 min ago",
        icon: "📞",
      },
      {
        name: "SMS / Messaging",
        status: "Operational",
        description:
          "Standard SMS, MMS, and messaging services are delivering without delay nationwide.",
        updated: "2 min ago",
        icon: "💬",
      },
      {
        name: "eSIM Activation",
        status: "Degraded",
        description:
          "Some customers may experience delays of up to 15 minutes during eSIM provisioning. Investigation underway.",
        updated: "6 min ago",
        icon: "📱",
      },
      {
        name: "Roaming",
        status: "Operational",
        description:
          "International roaming across all 200+ partner countries is functioning normally with no reported issues.",
        updated: "3 min ago",
        icon: "🌐",
      },
      {
        name: "Customer Portal & App",
        status: "Operational",
        description:
          "The GoLite app and web portal are fully operational. Login, billing, and plan management all functioning normally.",
        updated: "1 min ago",
        icon: "🖥️",
      },
    ]);

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
    <section className="bg-gray-100 text-gray-800 min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-12 px-4">
        <h1 className="text-4xl font-bold">All Systems Operational</h1>
        <p className="text-sm mt-2 text-white/80">
          All GoLite Mobile services are running normally. No disruptions detected across any region.
        </p>

        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          <span className="text-sm text-white/70 self-center">Demo Simulate status:</span>
          {[
            { label: "Operational", color: "bg-green-500" },
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
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow mt-6 mx-4">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-1">
          📍 Check Your Area
        </p>
        <h2 className="font-bold text-xl mb-1">Get Your Local Network Status</h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter your postcode or let us detect your location to see real-time network performance specific to you.
        </p>

        <div className="flex gap-2 items-center">
          <div className="flex gap-3 flex-1">
            <input
              placeholder="Enter postcode or city..."
              className="border border-gray-300 p-2 rounded w-full text-sm focus:outline-none focus:border-green-500"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium text-sm whitespace-nowrap">
              Check
            </button>
          </div>

          {/* Result panel */}
          <div className="ml-4 bg-green-50 border border-green-200 p-3 rounded-lg flex-1 text-sm">
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <span className="text-green-500">✅</span> No known issues in your area
            </div>
            <p className="text-green-600 text-xs mt-1">Mumbai, Maharashtra · Updated 2 min ago</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["Mobile Data", "Voice Calls", "SMS", "5G Active"].map((chip) => (
                <span key={chip} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  + {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400 mt-3">or</div>
        <div className="text-center mt-1">
          <button className="text-green-600 text-sm hover:underline">Auto-detect my location</button>
        </div>
      </div>

      {/* SERVICES */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-center text-2xl font-bold">Service-by-Service Status</h2>
        <p className="text-center text-sm text-gray-500 mt-1">
          A real-time view of all GoLite Mobile services across the network.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-6">
          {services.map((service, i) => (
            <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-2xl">{service.icon}</span>
                <span
                  className={`text-xs font-semibold flex items-center gap-1 ${statusTextColor(service.status)}`}
                >
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: statusDotColor(service.status) }}
                  />
                  {service.status}
                </span>
              </div>
              <h3 className="font-bold text-sm">{service.name}</h3>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">{service.description}</p>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xs text-gray-400">Updated {service.updated}</p>
                <button
                  className={`text-xs font-medium hover:underline ${
                    service.status === "Degraded" ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {service.status === "Degraded" ? "View Incident →" : "View details →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* METRICS */}
      <div className="bg-white text-black mt-12 py-12 px-4">
        <h2 className="text-center text-2xl font-bold">Network Reliability Last 90 Days</h2>
        <p className="text-center text-sm text-gray-400 mt-1">
          Our track record of uptime, incident frequency, and service consistency.
        </p>

        <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
          {[
            { value: metrics.uptime, label: "Network Uptime\nlast 30 days", sub: metrics.uptimeSub },
            { value: String(metrics.incidents), label: "Incidents\nThis Month", sub: metrics.incidentsSub },
            { value: metrics.responseTime, label: "Avg. Resolution Time\n30-day average", sub: metrics.responseTimeSub },
            { value: metrics.sla, label: "Network Uptime\nlast 90 days", sub: metrics.slaSub },
          ].map((m, i) => (
            <div key={i} className="bg-white text-black p-5 rounded-xl text-center">
              <p className="text-3xl font-bold text-green-600">{m.value}</p>
              <p className="text-xs text-gray-500 mt-1 whitespace-pre-line leading-snug">{m.label}</p>
              <p className="text-xs text-green-600 mt-2 font-medium">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* 90-Day Uptime History bar chart */}
        <div className="max-w-4xl mx-auto mt-8 bg-white/5 rounded-xl p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold">90-Day Uptime History</h3>
            <div className="flex gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Operational</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" /> Degraded</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" /> Outage</span>
            </div>
          </div>
          <div className="flex items-end gap-0.5 h-16">
            {bars.map((status, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: status === "outage" ? "40%" : status === "degraded" ? "70%" : "100%",
                  backgroundColor:
                    status === "outage" ? "#ef4444" : status === "degraded" ? "#eab308" : "#22c55e",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan 10</span>
            <span>Feb 1</span>
            <span>Feb 15</span>
            <span>Mar 1</span>
            <span>Mar 10</span>
          </div>
        </div>
      </div>

      {/* SUBSCRIBE */}
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-500 to-purple-500 p-8 rounded-xl mt-10 mx-4 text-white grid grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-xl font-bold">Get Real-Time Network Updates</h2>
          <p className="text-sm text-white/80 mt-2">
            Never be caught off guard. Subscribe to instant alerts the moment an incident starts, updates, or is resolved — delivered how you prefer.
          </p>
          <div className="flex gap-2 mt-4">
            {["📧 Email", "💬 SMS", "🔔 Push Notification"].map((btn) => (
              <button key={btn} className="bg-white/20 hover:bg-white/30 text-white text-xs px-3 py-1.5 rounded-full">
                {btn}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-white/70 block mb-1">Your email address</label>
          <input
            placeholder="you@example.com"
            className="p-2.5 rounded text-gray-800 w-full text-sm mb-3 focus:outline-none"
          />
          <label className="text-xs text-white/70 block mb-1">Services to monitor (optional)</label>
          <input
            placeholder="e.g. Mobile Data, eSIM, Roaming..."
            className="p-2.5 rounded text-gray-800 w-full text-sm mb-3 focus:outline-none"
          />
          <button className="bg-green-500 hover:bg-green-600 text-white w-full py-2.5 rounded font-semibold text-sm">
            Subscribe to Alerts
          </button>
          <p className="text-xs text-white/50 mt-2 text-center">
            1-click to unsubscribe at any time · Updates only
          </p>
        </div>
      </div>

      {/* SUPPORT */}
      <div className="max-w-5xl mx-auto mt-12 px-4 text-center">
        <div className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold mb-3">
          NEED HELP?
        </div>
        <h2 className="text-2xl font-bold">Still Experiencing an Issue?</h2>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          If your problem isn't reflected above, our team and community are ready to help.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              icon: "🎧",
              title: "Contact Support",
              desc: "Speak directly with a GoLite support specialist. Available 24/7 via chat, phone, or callback.",
              btn: "Contact Support",
              btnStyle: "bg-orange-500 hover:bg-orange-600 text-white",
            },
            {
              icon: "💬",
              title: "Community Forum",
              desc: "Browse solved discussions and get advice from 120K+ community members and verified experts.",
              btn: "Visit Forum",
              btnStyle: "bg-green-600 hover:bg-green-700 text-white",
            },
            {
              icon: "📖",
              title: "Troubleshooting Guide",
              desc: "Step-by-step guides for common issues: data settings, eSIM setup, roaming configuration, and more.",
              btn: "View Guides",
              btnStyle: "border border-gray-300 text-gray-700 hover:bg-gray-50",
            },
          ].map((item) => (
            <div key={item.title} className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 mb-4">{item.desc}</p>
              <button className={`px-5 py-2 rounded text-sm font-medium ${item.btnStyle}`}>
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* API */}
      <div className="max-w-5xl mx-auto bg-indigo-950 text-white p-8 rounded-xl mt-10 mb-10 mx-4">
        <div className="inline-block bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold mb-3">
          ENTERPRISE API
        </div>
        <h3 className="font-bold text-xl">System Status API</h3>
        <p className="text-sm text-gray-300 mt-2 max-w-lg">
          Integrate GoLite network status directly into your own dashboards, NOC tools, or operations platforms. Fully documented, JSON-based, and publicly accessible.
        </p>

        <div className="bg-black/40 rounded-lg p-4 mt-4 text-xs text-green-400 font-mono mb-5">
          GET https://api.golite.com/v1/status<br />
          <span className="text-gray-400">Authorization: Bearer YOUR_API_KEY</span>
        </div>

        <div className="flex gap-3">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded font-medium text-sm flex items-center gap-2">
            View API Docs →
          </button>
          <button className="border border-white/30 hover:bg-white/10 text-white px-5 py-2.5 rounded font-medium text-sm">
            Get API Key
          </button>
        </div>
      </div>
    </section>
  );
}
