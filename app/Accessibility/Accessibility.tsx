"use client";

import { useState } from "react";

export  function Accessibility() {
  const [selectedTech, setSelectedTech] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    issueType: "",
    pageAffected: "",
    description: "",
  });

  // ── BUILT-IN FEATURES ──────────────────────────────────────
  const builtInFeatures = [
    {
      icon: "⌨️",
      title: "Keyboard Navigation",
      desc: "Every interactive element on every GoLite page is fully reachable and operable using a keyboard alone — no mouse required.",
    },
    {
      icon: "🔍",
      title: "Screen Reader Support",
      desc: "Semantic HTML, ARIA landmark roles, and descriptive labels ensure full compatibility with major screen readers across all platforms.",
    },
    {
      icon: "🎨",
      title: "Colour & Contrast",
      desc: "All text meets WCAG 2.2 AA contrast requirements. High Contrast mode and Dark Mode are available without any account required.",
    },
    {
      icon: "🔠",
      title: "Text & Typography",
      desc: "Text scales from 100% to 200% without breaking layouts. A dyslexia-friendly font option reduces reading friction for affected users.",
    },
    {
      icon: "🎬",
      title: "Motion & Animation",
      desc: "All decorative animations can be disabled entirely. GoLite respects the prefers-reduced-motion system setting automatically.",
    },
    {
      icon: "🗣️ ",
      title: "Voice Control",
      desc: "All interactive elements carry visible, unique labels compatible with voice control software on all major platforms.",
    },
  ];

  // ── ASSISTIVE TECHNOLOGIES ─────────────────────────────────
  const assistiveTechs = [
    {
      label: "Screen Readers",
      icon: "🔊",
      content: {
        summary:
          "GoLite Mobile is tested with major screen readers on their primary platforms. Semantic HTML and comprehensive ARIA implementation ensures a consistent, logical reading experience.",
        standard: "WCAG 2.2 AA",
        lastTested: "February 2025",
        tested: ["NVDA + Chrome", "JAWS + Edge", "VoiceOver (macOS)", "VoiceOver (iOS)", "TalkBack (Android)"],
        knownLimits: [
          "Complex data tables in the billing portal may require additional navigation passes in JAWS — improvement scheduled Q1 2026.",
          "Some third-party payment widgets have limited ARIA labelling outside of GoLite's direct control.",
        ],
      },
    },
    {
      label: "Voice Control",
      icon: "🎙️",
      content: {
        summary:
          "All interactive elements carry visible, descriptive labels ensuring full compatibility with Dragon NaturallySpeaking and Apple Voice Control across all key user journeys.",
        standard: "WCAG 2.2 AA",
        lastTested: "January 2025",
        tested: ["Dragon NaturallySpeaking", "Apple Voice Control (macOS)", "Apple Voice Control (iOS)", "Windows Speech Recognition"],
        knownLimits: [
          "Dynamic modal dialogs occasionally require a manual voice command refresh on older browser versions.",
        ],
      },
    },
    {
      label: "Keyboard Only",
      icon: "⌨️",
      content: {
        summary:
          "Every user journey — from onboarding to billing — is fully operable via keyboard. Focus indicators are clearly visible and tab order follows a logical, predictable sequence.",
        standard: "WCAG 2.2 AA",
        lastTested: "February 2025",
        tested: ["Chrome", "Firefox", "Safari", "Edge"],
        knownLimits: [
          "Date picker on some legacy form pages requires arrow-key navigation — a dedicated keyboard mode is in development.",
        ],
      },
    },
    {
      label: "Screen Magnifiers",
      icon: "🔍",
      content: {
        summary:
          "GoLite Mobile supports magnification up to 400% without loss of functionality or horizontal scrolling on all core pages. Reflow is tested at all standard zoom levels.",
        standard: "WCAG 2.2 AA",
        lastTested: "December 2024",
        tested: ["ZoomText", "MAGic", "Browser zoom (all major browsers)", "iOS Zoom", "Android Magnification"],
        knownLimits: [
          "Dashboard charts may clip at 400% on viewports narrower than 320px — a fix is planned for Q2 2026.",
        ],
      },
    },
  ];

  // ── SETTINGS ───────────────────────────────────────────────
  const settings = [
    {
      icon: "🔡",
      title: "Text Size",
      desc: "Scale all text between 100% and 200% of the default size. Adjust using the slider or arrow keys when focused.",
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      desc: "Switches to a dark colour scheme, reducing eye strain in low-light environments.Saves energy on OLED screens.",
    },
    {
      icon: "⬛",
      title: "High Contrast",
      desc: "Maximises colour contrast to WCAG AAA level (≥7:1). Recommended for low vision users or bright environment use.",
    },
    {
      icon: "🎬",
      title: "Reduce Motion",
      desc: "Disables all decorative animations and transitions. Essential for users with vestibular disorders or motion sensitivity.",
    },
    {
      icon: "🔤",
      title: "Dyslexia Font",
      desc: "Switches to OpenDyslexic — a typeface with bottom-weighted letters designed to improve reading accuracy for dyslexic users.",
    },
    {
      icon: "⌨️",
      title: "Focus Indicators",
      desc: "Enhanced 3px focus rings are always on by default (WCAG 2.2 required). Disable only if your OS provides its own custom focus styles.",
    },
  ];

  // ── COMPLIANCE TABLE ───────────────────────────────────────
  const complianceRows = [
  {
    standard: "WCAG 2.2 — Perceivable",
    sub: "Text alternatives, time-based media, adaptable, distinguishable",
    level: "AA",
    levelColor: "bg-gray-100 text-gray-700",
    status: "Conformant",
    statusColor: "text-green-600",
    icon: "✓",
    note: "All images carry alt text; colour never used alone to convey information",
  },
  {
    standard: "WCAG 2.2 — Operable",
    sub: "Keyboard accessible, enough time, seizures, navigable, input modalities",
    level: "AA",
    levelColor: "bg-gray-100 text-gray-700",
    status: "Conformant",
    statusColor: "text-green-600",
    icon: "✓",
    note: "Full keyboard access; no keyboard traps; focus always visible",
  },
  {
    standard: "WCAG 2.2 — Understandable",
    sub: "Readable, predictable, input assistance",
    level: "AA",
    levelColor: "bg-gray-100 text-gray-700",
    status: "Conformant",
    statusColor: "text-green-600",
    icon: "✓",
    note: "Language declared on all pages; error messages descriptive and actionable",
  },
  {
    standard: "WCAG 2.2 — Robust",
    sub: "Compatible with current and future user agents",
    level: "AA",
    levelColor: "bg-gray-100 text-gray-700",
    status: "Conformant",
    statusColor: "text-green-600",
    icon: "✓",
    note: "Valid HTML; ARIA used per specification; tested with 5 AT combinations",
  },
  {
    standard: "EN 301 549",
    sub: "EU accessibility standard for ICT products and services",
    level: "EU",
    levelColor: "bg-blue-100 text-blue-700",
    status: "Aligned",
    statusColor: "text-green-600",
    icon: "✓",
    note: "Aligned via WCAG 2.2 AA conformance; Chapter 9 (web) covered",
  },
  {
    standard: "Equality Act 2010 (UK)",
    sub: "Reasonable adjustments for persons with disabilities",
    level: "UK LAW",
    levelColor: "bg-orange-100 text-orange-700",
    status: "Compliant",
    statusColor: "text-green-600",
    icon: "✓",
    note: "Reasonable adjustments supported via settings panel and support team",
  },
  {
    standard: "ADA Title III (USA)",
    sub: "Accessibility of places of public accommodation",
    level: "US LAW",
    levelColor: "bg-orange-100 text-orange-700",
    status: "In Progress",
    statusColor: "text-orange-500",
    icon: "⏳",
    note: "WCAG 2.2 AA alignment covers most obligations; formal ADA audit Q2 2026",
  },
];

  const activeTech = assistiveTechs[selectedTech];

  return (
    <div className=" dark:bg-gray-900 dark:text-white bg-white text-gray-900 font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-3 tracking-tight">Accessibility</h1>
        <p className="text-sm text-blue-200 max-w-2xl mx-auto leading-relaxed">
          Designed for everyone. Built for inclusion. GoLite Mobile is committed to delivering digital experiences that are
          accessible, equitable, and genuinely usable for all people.
        </p>
      </section>

      {/* ── BUILT-IN ACCESSIBILITY ───────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <span className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-widest">
            Accessibility Features
          </span>
          <h2 className="text-2xl font-bold mt-4 mb-1 dark:bg-gray-900 dark:text-white text-gray-800">
            Built-in Accessibility for Everyone
          </h2>
          <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-400">
            A comprehensive set of features ensuring GoLite Mobile is usable regardless of ability, device, or context.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {builtInFeatures.map((feat, i) => (
            <div key={i} className=" dark:bg-gray-900 dark:text-white bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-3">{feat.icon}</div>
              <h3 className="font-bold text-sm mb-1">{feat.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed dark:bg-gray-900 dark:text-white">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUPPORTED ASSISTIVE TECHNOLOGIES ────────────────── */}
      <section className=" dark:bg-gray-900 dark:text-white bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Supported Assistive Technologies</h2>
            <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
              Compatibility details, tested configurations, and known limitations for each assistive technology category.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-48 flex-shrink-0">
              <p className="text-xs font-bold dark:bg-gray-900 dark:text-white text-gray-400 uppercase tracking-widest mb-3">Select Technology</p>
              <div className="space-y-1">
                {assistiveTechs.map((tech, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedTech(i)}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-all ${
                      selectedTech === i
                        ? "bg-green-500  text-white font-semibold"
                        : " dark:bg-gray-900 dark:text-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span>{tech.icon}</span>
                    {tech.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Panel */}
            <div className="flex-1 dark:bg-gray-900 dark:text-white bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-700 leading-relaxed mb-5">{activeTech.content.summary}</p>

              <div className="grid grid-cols-2 gap-4 mb-5 dark:bg-gray-900 dark:text-white">
                <div className=" dark:bg-gray-900 dark:text-white bg-gray-50 rounded-lg p-3">
                  <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 uppercase tracking-wide mb-1">Testing Standard</p>
                  <p className="font-bold text-sm dark:bg-gray-900 dark:text-white">{activeTech.content.standard}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 dark:bg-gray-900 dark:text-white">
                  <p className="text-xs dark:bg-gray-900 dark:text-white  text-gray-400 uppercase tracking-wide mb-1">Last Tested</p>
                  <p className="font-bold text-sm">{activeTech.content.lastTested}</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-bold dark:bg-gray-900 dark:text-white text-gray-400 uppercase tracking-widest mb-2">Supported & Tested</p>
                <div className="flex flex-wrap gap-2">
                  {activeTech.content.tested.map((t, ti) => (
                    <span key={ti} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded-full font-medium">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold dark:bg-gray-900 dark:text-white text-gray-400 uppercase tracking-widest mb-2">Known Limitations</p>
                <ul className="space-y-1.5 dark:bg-gray-900 dark:text-white">
                  {activeTech.content.knownLimits.map((lim, li) => (
                    <li key={li} className="flex items-start gap-2 text-xs dark:bg-gray-900 dark:text-white text-gray-600">
                      <span className="text-orange-400 mt-0.5 flex-shrink-0 ">–</span>
                      {lim}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACCESSIBILITY SETTINGS ───────────────────────────── */}
      <section className="bg-white py-14 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-800 dark:bg-gray-900 dark:text-white">Accessibility Settings</h2>
            <p className="text-sm text-gray-800 mt-1 dark:bg-gray-900 dark:text-white">
              All preferences are saved to your browser and apply instantly across the page. Changes persist between sessions via local storage.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-white/10 p-6 dark:bg-gray-900 dark:text-white">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-lg">⚙️</span>
              <div>
                <p className="font-bold text-gray-800 text-sm dark:bg-gray-900 dark:text-white">Display & Interaction Preferences</p>
                <p className="text-xs text-gray-800 dark:bg-gray-900 dark:text-white">All changes apply immediately and persist across sessions.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {settings.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-lg flex-shrink-0">{s.icon}</span>
                  <div>
                    <p className="font-bold dark:bg-gray-900 dark:text-white text-gray-800 text-sm">{s.title}</p>
                    <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-800 leading-relaxed mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE STATEMENT ─────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Accessibility Compliance Statement</h2>
          <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
            GoLite Mobile is committed to maintaining WCAG 2.2 level AA conformance across all digital products and services.
          </p>
        </div>

        <div className="rounded-xl border dark:bg-gray-900 dark:text-white border-gray-200 overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-12 dark:bg-gray-900 dark:text-white bg-[#0f2244] text-white text-xs font-bold px-5 py-3 gap-3">
            <div className="col-span-4">Standard / Criterion</div>
            <div className="col-span-1">Level</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-5">Notes</div>
          </div>

          {complianceRows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-12 px-5 py-4 gap-3 text-xs items-start border-b dark:bg-gray-900 dark:text-white border-gray-100 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="col-span-4">
                <p className="font-semibold text-gray-800 dark:bg-gray-900 dark:text-white">{row.standard}</p>
                <p className="text-gray-400 dark:bg-gray-900 dark:text-white   text-[11px] mt-0.5">{row.sub}</p>
              </div>
              <div className="col-span-1">
                <span className={`px-2 py-0.5 rounded text-[11px] font-bold dark:bg-gray-900 dark:text-white ${row.levelColor}`}>
                  {row.level}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`font-bold flex items-center gap-1 dark:bg-gray-900 dark:text-white ${row.statusColor}`}>
                  <span>{row.icon}</span>
                  {row.status}
                </span>
              </div>
              <div className="col-span-5 text-gray-600 leading-relaxed dark:bg-gray-900 dark:text-white">{row.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCESSIBILITY FEEDBACK ───────────────────────────── */}
      <section className="bg-white py-14 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold bg-orange-100 text-orange-600 px-3 py-1 rounded-full uppercase tracking-widest">
              Report an Issue
            </span>
            <h2 className="text-2xl font-bold text-gray-800 mt-4 mb-1  dark:bg-gray-900 dark:text-white">Accessibility Feedback</h2>
            <p className="text-sm text-gray-500 dark:bg-gray-900 dark:text-white" >
              Encountered a barrier? Tell us. We aim to respond to all accessibility feedback within 5 business days.
            </p>
          </div>

          <div className="max-w-2xl mx-auto dark:bg-gray-900 dark:text-white bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xl">🛡️</span>
              <div>
                <p className="font-bold text-sm">Report an Accessibility Issue</p>
                <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400">All fields marked * are required.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold dark:bg-gray-900 dark:text-white text-gray-600 mb-1 block">Full Name *</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label className="text-xs font-semibold dark:bg-gray-900 dark:text-white text-gray-600 mb-1 block">Email Address *</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold dark:bg-gray-900 dark:text-white text-gray-600 mb-1 block">Issue Type *</label>
                <select
                  value={formData.issueType}
                  onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm dark:bg-gray-900 dark:text-white text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  <option value="">Select Issue type...</option>
                  <option>Keyboard Navigation</option>
                  <option>Screen Reader</option>
                  <option>Colour / Contrast</option>
                  <option>Text / Typography</option>
                  <option>Motion / Animation</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold dark:bg-gray-900 dark:text-white  text-gray-600 mb-1 block">Page or Feature Affected</label>
                <input
                  type="text"
                  placeholder="e.g. Checkout page, Navigation menu"
                  value={formData.pageAffected}
                  onChange={(e) => setFormData({ ...formData, pageAffected: e.target.value })}
                  className="w-full border dark:bg-gray-900 dark:text-white border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold dark:bg-gray-900 dark:text-white text-gray-600 mb-1 block">Description *</label>
              <textarea
                rows={4}
                placeholder="Please describe the barrier you encountered. The more detail you provide, the faster we can investigate and fix it."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button className="bg-green-500 hover:bg-green-600 transition-colors  text-white font-bold px-6 py-2.5 rounded-xl text-sm">
                Submit Report →
              </button>
              <button
                onClick={() => setFormData({ fullName: "", email: "", issueType: "", pageAffected: "", description: "" })}
                className="border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors px-6 py-2.5 rounded-xl text-sm font-medium"
              >
                Clear Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEED FURTHER ASSISTANCE ──────────────────────────── */}
      <section className="bg-[#0a1628] py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Need Further Assistance?</h2>
            <p className="text-sm text-gray-400 mb-3">
              Our support team is trained to assist customers with accessibility needs across all channels.
            </p>
            <ul className="space-y-1">
              {[
                "24/7 live chat support",
                "Text relay (18001) available",
                "BSL video relay available",
                "Large print documents on request",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="text-green-400">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-white font-bold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">
              Contact Support
            </button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors text-white font-medium px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">
              accessibility@golitemobile.com
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
