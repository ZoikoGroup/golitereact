"use client";

import { useState } from "react";

export default function PartnerLegalFramework() {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const [openDoc, setOpenDoc] = useState(null);
  

  // ─── ONBOARDING STEPS ───────────────────────────────────────
  const onboardingSteps = [
    {
      num: 1,
      color: "bg-green-500",
      title: "Become a Partner",
      desc: "Submit enquiry via the partner portal or direct outreach to the partnerships team",
    },
    {
      num: 2,
      color: "bg-orange-400",
      title: "Submit Enquiry & NDA",
      desc: "Confidentiality agreement executed before any commercial or technical disclosure",
    },
    {
      num: 3,
      color: "bg-blue-500",
      title: "Receive Legal Pack",
      desc: "Full framework issued: MSA, DPA, API Terms, Brand Licence, and Commercial Schedule",
    },
    {
      num: 4,
      color: "bg-purple-500",
      title: "Execute Agreements",
      desc: "Mandatory contract execution before any onboarding or system access begins",
    },
    {
      num: 5,
      color: "bg-teal-500",
      title: "Begin Integration",
      desc: "Technical onboarding, API credentials issued, and go-live support provided",
    },
  ];

  // ─── DOCUMENT SUITE ─────────────────────────────────────────
  const documents = [
    {
      tag: "DOC 1",
      icon:"📋",
      tagColor: "bg-blue-100 text-blue-700",
      title: "Master Services Agreement",
      desc: "The foundational agreement governing all commercial, technical, and data arrangements between GoLite Mobile and its partners.",
      points: [
        "Scope of services and delivery obligations",
        "Payment terms, invoicing and revenue allocation",
        "Intellectual property ownership and licensing",
        "Service levels, uptime obligations and SLA credits",
        "Data protection and confidentiality requirements",
        "Termination rights, notice periods and exit provisions",
        "Governing law and dispute resolution procedures",
      ],
    },
    {
      tag: "DOC 2",
      icon:"📝",
      tagColor: "bg-orange-100 text-orange-700",
      title: "Statement of Work",
      desc: "Project-specific agreement that defines the deliverables, timelines, roles, and responsibilities for each individual engagement.",
      points: [
        "Project objectives and scope definition",
        "Deliverable specifications and acceptance criteria",
        "Milestone schedule and payment triggers",
        "Role assignments and team responsibilities",
        "Change control and variation procedures",
        "Pricing model and commercial schedule",
      ],
    },
    {
      tag: "DOC 3",
      icon:"🔒",
      tagColor: "bg-red-100 text-red-700",
      title: "Data Processing Agreement",
      desc: "Ensures compliance with GDPR and applicable data protection laws when GoLite Mobile processes personal data on behalf of partners.",
      points: [
        "Data controller and processor designations",
        "Types of data processed and lawful basis",
        "Data retention limits and deletion obligations",
        "Sub-processor management and approval process",
        "Security measures and breach notification timelines",
        "Data subject rights and handling procedures",
        "Cross-border data transfer mechanisms and safeguards",
      ],
    },
    {
      tag: "DOC 4",
      icon:"⚙️",
      tagColor: "bg-green-100 text-green-700",
      title: "API & Platform Terms",
      desc: "Governs access to and use of the GoLite platform, API infrastructure, and developer tools by authorised partner integrations.",
      points: [
        "API access authorisation and credential management",
        "Permitted use cases and prohibited activities",
        "Rate limits, throttling, and fair usage policies",
        "Platform availability and maintenance windows",
        "Liability caps and service warranty disclaimers",
        "Suspension and termination for policy violations",
        "Support tiers, escalation paths and SLAs",
      ],
    },
    {
      tag: "DOC 5",
      icon:"🎨",
      tagColor: "bg-purple-100 text-purple-700",
      title: "Brand Licence Agreement",
      desc: "Defines the terms under which partners may use the GoLite Mobile brand, trademarks, and co-marketing assets in their commercial activities.",
      points: [
        "Permitted use cases and approved asset types",
        "Brand guidelines compliance requirements",
        "Approval workflow for new marketing materials",
        "Restrictions on sublicensing or assignment",
        "Quality standards and review rights",
        "Termination of licence and asset return",
      ],
    },
    {
      tag: "DOC 6",
      icon:"💰",
      tagColor: "bg-yellow-100 text-yellow-700",
      title: "Revenue & Commercial Schedule",
      desc: "Sets out the specific commercial terms applicable to each partner type, including revenue share structures, wholesale pricing and commission models.",
      points: [
        "Revenue share percentages by partner tier",
        "Wholesale rate card and minimum order volumes",
        "Commission structure and referral bonuses",
        "Payment schedule and reconciliation cycle",
        "Updated commercial terms and rate adjustments",
        "Bonus thresholds and performance incentives",
      ],
    },
    {
      tag: "DOC 7",
      icon: "🤫",
      tagColor: "bg-slate-100 text-slate-700",
      title: "Confidentiality Agreement (NDA)",
      desc: "Mutual non-disclosure agreement protecting commercially sensitive information shared during the partner evaluation and onboarding process.",
      points: [
        "Definition of confidential information",
        "Mutual obligations of non-disclosure",
        "Permitted disclosures and exceptions",
        "Duration of confidentiality obligations",
        "Remedies for breach and injunctive relief",
      ],
    },
    {
      tag: "NEW",
      icon:"📦",
      tagColor: "bg-green-500 text-white",
      title: "Partner Onboarding Legal Pack",
      desc: "A consolidated onboarding bundle containing all essential legal agreements pre-formatted for efficient review and countersignature.",
      points: [
        "Master Services Agreement",
        "Statement of Work template",
        "Data Processing Agreement",
        "Brand Licence Agreement",
        "Commercial Execution & Revenue Schedule",
      ],
      highlight: true,
    },
  ];

  // ─── CRITICAL LEGAL PROVISIONS ──────────────────────────────
  const legalProvisions = [
    {
      title: "Master Services Agreement (MSA)",
      desc: "The MSA is the primary commercial contract — it governs liability, IP ownership, confidentiality, and service delivery across the entire partnership.",
    },
    {
      title: "Data Processing Agreement (DPA)",
      desc: "Mandatory under UK/EU GDPR. Defines how personal data is processed, retained, and protected when transferred between GoLite Mobile and its partners.",
    },
    {
      title: "API & Platform Terms",
      desc: "Governs all technical integrations, rate limits, acceptable use, and developer obligations — binding on all platform users regardless of partner type.",
    },
    {
      title: "Brand Licence Agreement",
      desc: "Controls all co-branding, marketing collaboration, and trademark usage — partners must obtain written approval before publishing any GoLite-branded materials.",
    },
    {
      title: "Confidentiality Agreement (NDA)",
      desc: "All commercially sensitive information shared during onboarding is subject to a fully executed mutual NDA — enforceable in all applicable jurisdictions.",
    },
  ];

  // ─── REVENUE MODELS ─────────────────────────────────────────
  const revenueModels = [
  {
    icon: "📊",
    title: "Revenue Share",
    desc: "Percentage-based split on revenue generated through the partnership. Aligned incentives for deep commercial relationships.",
    color: "bg-green-50 border-green-200",
    iconBg: "bg-green-100",
    rows: [
      { label: "Structure", value: "% of generated revenue" },
      { label: "Reporting", value: "Monthly, with audit rights" },
      { label: "Settlement", value: "30-day payment cycle" },
      { label: "Best for", value: "Resellers & distributors" },
    ],
  },
  {
    icon: "🏷️",
    title: "Wholesale Pricing",
    desc: "Fixed wholesale rates for services and connectivity, enabling partners to build and price their own propositions on top.",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    rows: [
      { label: "Structure", value: "Fixed unit rate" },
      { label: "Minimum volumes", value: "Defined in SOW" },
      { label: "Settlement", value: "30-day net invoicing" },
      { label: "Best for", value: "MVNOs & platform builders" },
    ],
  },
  {
    icon: "🎯",
    title: "Commission-Based",
    desc: "Performance-driven commission on referrals, activations, or customer acquisitions. Ideal for affiliate and referral partners.",
    color: "bg-purple-50 border-purple-200",
    iconBg: "bg-purple-100",
    rows: [
      { label: "Structure", value: "Per-activation or referral" },
      { label: "Tracking", value: "API-enabled attribution" },
      { label: "Settlement", value: "Monthly consolidated" },
      { label: "Best for", value: "Affiliates & introducers" },
    ],
  },
];
  // ─── JURISDICTION TABLE ──────────────────────────────────────
 const jurisdictionRows = [
  {
    doc: "Master Services Agreement",
    sub: "Governing contract",
    england: { label: "Primary", color: "text-green-600 bg-green-50" },
    us: { label: "Supported", color: "text-green-600 bg-green-50" },
    gdpr: { label: "Per DPA", color: "text-orange-600 bg-orange-50" },
    ccpa: { label: "Per DPA", color: "text-orange-600 bg-orange-50" },
  },
  {
    doc: "Data Processing Agreement",
    sub: "Privacy compliance",
    england: { label: "UK GDPR", color: "text-green-600 bg-green-50" },
    us: { label: "CCPA", color: "text-green-600 bg-green-50" },
    gdpr: { label: "Full", color: "text-green-600 bg-green-50" },
    ccpa: { label: "Full", color: "text-green-600 bg-green-50" },
  },
  {
    doc: "API & Platform Terms",
    sub: "Technical access",
    england: { label: "Supported", color: "text-green-600 bg-green-50" },
    us: { label: "Supported", color: "text-green-600 bg-green-50" },
    gdpr: { label: "Via DPA", color: "text-orange-600 bg-orange-50" },
    ccpa: { label: "Via DPA", color: "text-orange-600 bg-orange-50" },
  },
  {
    doc: "Brand Licence Agreement",
    sub: "Trademark & IP",
    england: { label: "Supported", color: "text-green-600 bg-green-50" },
    us: { label: "Supported", color: "text-green-600 bg-green-50" },
    gdpr: { label: "N/A", color: "text-green-600 bg-green-50" },
    ccpa: { label: "N/A", color: "text-green-600 bg-green-50" },
  },
  {
    doc: "Confidentiality Agreement",
    sub: "NDA — pre-commencement",
    england: { label: "Primary", color: "text-green-600 bg-green-50" },
    us: { label: "Supported", color: "text-green-600 bg-green-50" },
    gdpr: { label: "As applicable", color: "text-orange-600 bg-orange-50" },
    ccpa: { label: "As applicable", color: "text-orange-600 bg-orange-50" },
  },
];

  // ─── GOVERNANCE FEATURES ─────────────────────────────────────
  const governanceFeatures = [
    {
      icon: "📋",
      title: "Ongoing Compliance Monitoring",
      desc: "No onboarding, system access, or information sharing begins before all required agreements are fully executed.",
    },
    {
      icon: "🔍",
      title: "Ongoing Compliance Monitoring",
      desc: "Partner compliance obligations are monitored continuously throughout the term of the agreement.",
    },
    {
      icon: "📊",
      title: "Audit Rights",
      desc: "GoLite Mobile retains full audit rights over partner activities to verify compliance with all agreement terms.",
    },
    {
      icon: "⚡",
      title: "Termination for Risk Events",
      desc: "Immediate termination rights are reserved for regulatory breach, security incidents, or material compliance failures.",
    },
  ];

  // ─── DOWNLOAD DOCUMENTS ──────────────────────────────────────
const downloadDocs = [
  { name: "Master Services Agreement", size: "248 KB", date: "01 Feb 2026", color: "text-blue-600" },
  { name: "Statement of Work", size: "118 KB", date: "01 Feb 2026", color: "text-orange-600" },
  { name: "Data Processing Agreement", size: "204 KB", date: "03 Mar 2026", color: "text-red-600" },
  { name: "API & Platform Terms", size: "96 KB", date: "01 Feb 2026", color: "text-green-600" },
  { name: "Brand Licence Agreement", size: "88 KB", date: "01 Feb 2026", color: "text-purple-600" },
  { name: "Commercial Schedule", size: "312 KB", date: "15 Mar 2026", color: "text-yellow-600" },
];
  return (
    <div className="bg-white  dark:bg-gray-900 dark:text-white text-gray-900 font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight ">
          GoLite Mobile Partner Legal Framework Pack
        </h1>
        <p className="text-sm  text-blue-200 max-w-2xl mx-auto leading-relaxed">
          Governance-grade and templates governing all commercial, technical, and data arrangements
          between GoLite Mobile and its partners — built for speed, clarity, and compliance.
        </p>
      </section>

      {/* ── PARTNER ONBOARDING JOURNEY ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14 dark:bg-gray-900 dark:text-white">
        <div className="text-center mb-10 dark:bg-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold dark:bg-gray-900 dark:text-white">Partner Onboarding Journey</h2>
          <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
            A defined, end-to-end process for partners to follow, taking steps to go ahead at each stage.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-4 items-start justify-between dark:bg-gray-900 dark:text-white">
          {/* Connector line */}
          <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-0.5 dark:bg-gray-900 dark:text-white bg-gray-200 z-0" />

          {onboardingSteps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1 px-2 dark:bg-gray-900 dark:text-white">
              <div className={`w-10 h-10 rounded-full ${step.color} dark:bg-gray-900 dark:text-white text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md`}>
                {step.num}
              </div>
              <h4 className="text-xs font-bold mb-1 dark:bg-gray-900 dark:text-white">{step.title}</h4>
              <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOCUMENT SUITE ───────────────────────────────────── */}
      <section className="bg-gray-50 py-14 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Partner Legal Framework Full Document Suite</h2>
            <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
              Eight individually-downloadable documents covering every dimension of the partner relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 ">
            {documents.map((doc, i) => (
              <div
                key={i}
                className={`dark:bg-gray-900 dark:text-white bg-white rounded-xl border p-5 shadow-sm flex flex-col ${
                  doc.highlight ? "border-green-400 ring-1 ring-green-300" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${doc.tagColor}`}>
                    {doc.tag}
                  </span>
                </div>
                <div className="text-xl align-middle">{doc.icon}</div>
                <h3 className="font-bold text-sm mb-1">{doc.title}</h3>
                <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-500 mb-3 leading-relaxed">{doc.desc}</p>
                <ul className="mt-auto space-y-1">
                  {doc.points.map((pt, pi) => (
                    <li key={pi} className="flex items-start gap-1.5 text-xs dark:bg-gray-900 dark:text-white text-gray-600">
                      <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CRITICAL LEGAL PROVISIONS ────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Critical Legal Provisions</h2>
          <p className="text-sm  dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
            Special attention is called to the five conditions, obligations, and provisions points within the framework.
          </p>
        </div>

        <div className="space-y-2">
          {legalProvisions.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden dark:bg-gray-900 dark:text-white bg-white shadow-sm"
            >
              <button
               onClick={() => setOpenAccordion(openAccordion === i ? null : i)} 
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mt-0.5">{item.desc.slice(0, 70)}…</p>
                </div>
                <span className={`dark:bg-gray-900 dark:text-white text-gray-400 transition-transform text-lg ml-4 ${openAccordion === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              {openAccordion === i && (
                <div className="px-5 pb-4 text-sm dark:bg-gray-900 dark:text-white text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── REVENUE & COMMERCIAL MODELS ──────────────────────── */}
      <section className="bg-gray-50 py-14 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Revenue & Commercial Models</h2>
            <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
              Three models are available for selection, discussed by partner type. Integration supply and model content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 dark:bg-gray-900 dark:text-white ">
            {revenueModels.map((model, i) => (
              <div key={i} className={`rounded-xl border p-5 dark:bg-gray-900 dark:text-white ${model.color}`}>
                <div className={`w-10 h-10 rounded-lg ${model.iconBg} flex items-center justify-center text-xl mb-3 dark:bg-gray-900 dark:text-white`}>
                  {model.icon}
                </div>
                <h3 className="font-bold text-sm mb-3 dark:bg-gray-900 dark:text-white">{model.title}</h3>
                <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1" >{model.desc}</p>
                <br />
                <div className="space-y-2">
                  {model.rows.map((row, ri) => (
                    <div key={ri} className="flex justify-between text-xs border-b dark:bg-gray-900 dark:text-white border-black/5 pb-1.5">
                      <span className="text-gray-500 dark:bg-gray-900 dark:text-white font-medium">{row.label}</span>
                      <span className="text-gray-700 dark:bg-gray-900 dark:text-white font-semibold text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JURISDICTION TABLE ───────────────────────────────── */}
    <section className="max-w-6xl mx-auto px-4 py-14">
  <div className="text-center mb-10 dark:bg-gray-900 dark:text-white">
    <h2 className="text-2xl font-bold">Applicable Law & Jurisdiction Coverage</h2>
    <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
      The framework is structured for dual UK / USA deployment with GDPR and CCPA compliance built in.
    </p>
  </div>

  <div className="rounded-xl border dark:bg-gray-900 dark:text-white border-gray-200 overflow-hidden shadow-sm">
    {/* Table Header */}
    <div className="grid grid-cols-6 bg-[#0f2244] text-white text-xs font-bold px-4 py-3 gap-2">
      <div className="col-span-2">Document</div>
      <div>England & Wales</div>
      <div>Delaware / New York</div>
      <div>GDPR / UK GDPR</div>
      <div>CCPA</div>
    </div>

    {jurisdictionRows.map((row, i) => (
      <div
        key={i}
        className={`grid grid-cols-6 px-4 py-3 gap-2 text-xs items-center border-b border-gray-100 ${
          i % 2 === 0 ? "dark:bg-gray-900 dark:text-white bg-white" : "dark:bg-gray-900 dark:text-white bg-gray-50"
        }`}
      >
        <div className="col-span-2">
          <p className="font-semibold text-gray-800">{row.doc}</p>
          <p className="dark:bg-gray-900 dark:text-white text-gray-400 text-[11px]">{row.sub}</p>
        </div>

        {[row.england, row.us, row.gdpr, row.ccpa].map((cell, ci) => (
          <div key={ci}>
            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold dark:bg-gray-900 ${cell.color}`}>
              ✓ {cell.label}
            </span>
          </div>
        ))}
      </div>
    ))}
  </div>
</section>
      {/* ── PARTNER GOVERNANCE FRAMEWORK ─────────────────────── */}
      <section className="bg-gray-50 py-14 px-4 dark:bg-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Partner Governance Framework</h2>
            <p className="text-sm dark:bg-gray-900 dark:text-white text-gray-500 mt-1">
              Every partnership operates within a structured governance model built around day-to-day use.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-8">
            {governanceFeatures.map((feat, i) => (
              <div key={i} className="bg-white rounded-xl border dark:bg-gray-900 dark:text-white border-gray-200 p-5 shadow-sm">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h4 className="font-bold text-sm mb-1 dark:bg-gray-900 dark:text-white">{feat.title}</h4>
                <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Template Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
            <span className="font-bold"> ⚖️ Template Disclaimer:</span> All documents in this framework pack are template agreements prepared for informational and governance purposes only. All agreements should be reviewed by a qualified legal professional before execution. GoLite Mobile makes no warranty, expressed or implied, with respect to the legal sufficiency or enforceability of any template document in any specific jurisdiction. Partners are advised to seek independent legal advice prior to countersignature.
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD FULL FRAMEWORK ──────────────────────────── */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-[#0f2244] rounded-2xl p-8 grid md:grid-cols-2 gap-10 text-white">
            {/* Left */}
            <div>
              <h2 className="text-xl font-bold mb-1">Download the Full Legal Framework</h2>
              <p className="text-sm text-blue-300 mb-6 leading-relaxed">
              All eight institutional-grade templates in a single governed pack.
Ready for legal review, customisation, and execution.</p>
              <div className="space-y-2">
                {downloadDocs.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors rounded-lg px-4 py-2.5 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${doc.color}`}>📄</span>
                      <span className="text-sm font-medium">{doc.name}</span>
                    </div>
                    <span className="text-xs text-blue-300 group-hover:text-white transition-colors">↓</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-4">Download Full (ZIP)</h3>
                <div className="bg-white/5 rounded-xl p-5 space-y-3 text-sm mb-6">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-blue-300">Documents</span>
                  <span className="font-semibold">6 templates</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-blue-300">File Size</span>
                    <span className="font-semibold">1.06 MB</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-blue-300">Format</span>
                    <span className="font-semibold">DOCX / PDF / Full Framework</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-300">Last Updated</span>
                    <span className="font-semibold">March 2026</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-green-500 hover:bg-green-600 transition-colors text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2">
                  ↓ Download Full Pack (ZIP)
                </button>
                <button className="w-full bg-white/10 dark:bg-gray-900 dark:text-white hover:bg-white/20 transition-colors text-white font-semibold py-3 rounded-xl text-sm">
                  Speak to Legal Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── READY TO BECOME A PARTNER ─────────────────────────── */}
      <section className="bg-gradient-to-r from-[#0f2244] to-[#1a3a6e] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h2 className="text-xl font-bold mb-1">Ready to Become a GoLite Partner?</h2>
            <p className="text-sm text-blue-300">
              Join our network and access the full framework, onboarding support, and partner tools.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-white font-bold px-6 py-2.5 rounded-xl text-sm whitespace-nowrap">
              Submit Partner Enquiry
            </button>
            <button className="bg-white/10 dark:bg-gray-900 dark:text-white hover:bg-white/20 transition-colors text-white font-semibold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">
              partners@golitemobile.com
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
