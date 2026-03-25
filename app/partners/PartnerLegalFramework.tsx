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
      desc: "Complete the partner application and get approved to join the GoLite network.",
    },
    {
      num: 2,
      color: "bg-orange-400",
      title: "Submit Enquiry & NDA",
      desc: "Submit your partnership enquiry and sign our mutual non-disclosure agreement.",
    },
    {
      num: 3,
      color: "bg-blue-500",
      title: "Review Legal Pack",
      desc: "Differentiated packs with templates covering all commercial, technical, and data arrangements.",
    },
    {
      num: 4,
      color: "bg-purple-500",
      title: "Execute Agreements",
      desc: "Countersign all applicable agreements and have them executed by both parties.",
    },
    {
      num: 5,
      color: "bg-teal-500",
      title: "Begin Integration",
      desc: "Access your onboarding portal and begin API and platform integration with support.",
    },
  ];

  // ─── DOCUMENT SUITE ─────────────────────────────────────────
  const documents = [
    {
      tag: "DOC 1",
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
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-100",
      rows: [
        { label: "Structure", value: "% of monthly revenue generated through the partner" },
        { label: "Payment", "value": "Monthly with 30-day payment cycle" },
        { label: "Projection", value: "Available in the Commercial Schedule" },
        { label: "Variation", value: "Tier-based adjustments apply" },
      ],
    },
    {
      icon: "🏷️",
      title: "Wholesale Pricing",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-100",
      rows: [
        { label: "Structure", value: "Fixed per-unit rate below retail" },
        { label: "Payment", value: "On invoice, net-30 terms" },
        { label: "Minimum", value: "Defined in rate card schedule" },
        { label: "Variation", value: "Volume discount thresholds" },
      ],
    },
    {
      icon: "💰",
      title: "Commission-Based",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-100",
      rows: [
        { label: "Structure", value: "Per-activation or referral fee" },
        { label: "Payment", value: "Monthly consolidated statement" },
        { label: "Minimum", value: "No minimum commitment required" },
        { label: "Variation", value: "Bonus structure at milestones" },
      ],
    },
  ];

  // ─── JURISDICTION TABLE ──────────────────────────────────────
  const jurisdictionRows = [
    {
      doc: "Master Services Agreement",
      sub: "All partner types",
      england: { label: "Primary", color: "text-green-600 bg-green-50" },
      gdpr: { label: "Supported", color: "text-green-600 bg-green-50" },
      caricom: { label: "Full", color: "text-green-600 bg-green-50" },
      uae: { label: "Advised", color: "text-gray-500 bg-gray-50" },
    },
    {
      doc: "Data Processing Agreement",
      sub: "UK & EU partners",
      england: { label: "UK GDPR", color: "text-blue-600 bg-blue-50" },
      gdpr: { label: "SCPA", color: "text-blue-600 bg-blue-50" },
      caricom: { label: "Full", color: "text-green-600 bg-green-50" },
      uae: { label: "Full", color: "text-green-600 bg-green-50" },
    },
    {
      doc: "API & Platform Terms",
      sub: "All technical integrations",
      england: { label: "Supported", color: "text-green-600 bg-green-50" },
      gdpr: { label: "Supported", color: "text-green-600 bg-green-50" },
      caricom: { label: "Update", color: "text-orange-600 bg-orange-50" },
      uae: { label: "Update", color: "text-orange-600 bg-orange-50" },
    },
    {
      doc: "Brand Licence Agreement",
      sub: "All partners using brand assets",
      england: { label: "Supported", color: "text-green-600 bg-green-50" },
      gdpr: { label: "Supported", color: "text-green-600 bg-green-50" },
      caricom: { label: "NDA", color: "text-purple-600 bg-purple-50" },
      uae: { label: "NDA", color: "text-purple-600 bg-purple-50" },
    },
    {
      doc: "Confidentiality Agreement",
      sub: "All parties pre-contract",
      england: { label: "Primary", color: "text-green-600 bg-green-50" },
      gdpr: { label: "Supported", color: "text-green-600 bg-green-50" },
      caricom: { label: "In-platform", color: "text-gray-500 bg-gray-50" },
      uae: { label: "In-platform", color: "text-gray-500 bg-gray-50" },
    },
  ];

  // ─── GOVERNANCE FEATURES ─────────────────────────────────────
  const governanceFeatures = [
    {
      icon: "📋",
      title: "Mandatory Contract Provisions",
      desc: "Every partnership requires a fully executed MSA and DPA before commercial activities begin — no exceptions.",
    },
    {
      icon: "🔄",
      title: "Ongoing Compliance Monitoring",
      desc: "All partners are subject to periodic compliance reviews and must maintain current, valid agreement versions.",
    },
    {
      icon: "🔍",
      title: "Audit Rights",
      desc: "GoLite Mobile reserves the right to audit partner compliance with agreement terms and data handling obligations.",
    },
    {
      icon: "🛡️",
      title: "Frameworks for Risk Posture",
      desc: "Partners are categorised by risk profile; higher-risk integrations require additional technical and legal controls.",
    },
  ];

  // ─── DOWNLOAD DOCUMENTS ──────────────────────────────────────
  const downloadDocs = [
    { name: "Master Services Agreement (MSA)", size: "248 KB", date: "01 Feb 2026", color: "text-blue-600" },
    { name: "Statement of Work (SOW)", size: "118 KB", date: "01 Feb 2026", color: "text-orange-600" },
    { name: "Data Processing Agreement", size: "204 KB", date: "03 Mar 2026", color: "text-red-600" },
    { name: "API & Platform Terms", size: "96 KB", date: "01 Feb 2026", color: "text-green-600" },
    { name: "Brand Licence & Agreement", size: "88 KB", date: "01 Feb 2026", color: "text-purple-600" },
    { name: "Commercial Execution & Schedule", size: "312 KB", date: "15 Mar 2026", color: "text-yellow-600" },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">
          GoLite Mobile Partner Legal Framework Pack
        </h1>
        <p className="text-sm text-blue-200 max-w-2xl mx-auto leading-relaxed">
          Governance-grade and templates governing all commercial, technical, and data arrangements
          between GoLite Mobile and its partners — built for speed, clarity, and compliance.
        </p>
      </section>

      {/* ── PARTNER ONBOARDING JOURNEY ───────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Partner Onboarding Journey</h2>
          <p className="text-sm text-gray-500 mt-1">
            A defined, end-to-end process for partners to follow, taking steps to go ahead at each stage.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row gap-4 items-start justify-between">
          {/* Connector line */}
          <div className="hidden md:block absolute top-5 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0" />

          {onboardingSteps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center flex-1 px-2">
              <div className={`w-10 h-10 rounded-full ${step.color} text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md`}>
                {step.num}
              </div>
              <h4 className="text-xs font-bold mb-1">{step.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DOCUMENT SUITE ───────────────────────────────────── */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Partner Legal Framework Full Document Suite</h2>
            <p className="text-sm text-gray-500 mt-1">
              Eight individually-downloadable documents covering every dimension of the partner relationship.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {documents.map((doc, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl border p-5 shadow-sm flex flex-col ${
                  doc.highlight ? "border-green-400 ring-1 ring-green-300" : "border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${doc.tagColor}`}>
                    {doc.tag}
                  </span>
                </div>
                <h3 className="font-bold text-sm mb-1">{doc.title}</h3>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">{doc.desc}</p>
                <ul className="mt-auto space-y-1">
                  {doc.points.map((pt, pi) => (
                    <li key={pi} className="flex items-start gap-1.5 text-xs text-gray-600">
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
          <p className="text-sm text-gray-500 mt-1">
            Special attention is called to the five conditions, obligations, and provisions points within the framework.
          </p>
        </div>

        <div className="space-y-2">
          {legalProvisions.map((item, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm"
            >
              <button
               onClick={() => setOpenAccordion(openAccordion === i ? null : i)} 
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.desc.slice(0, 70)}…</p>
                </div>
                <span className={`text-gray-400 transition-transform text-lg ml-4 ${openAccordion === i ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>
              {openAccordion === i && (
                <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {item.desc}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── REVENUE & COMMERCIAL MODELS ──────────────────────── */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Revenue & Commercial Models</h2>
            <p className="text-sm text-gray-500 mt-1">
              Three models are available for selection, discussed by partner type. Integration supply and model content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {revenueModels.map((model, i) => (
              <div key={i} className={`rounded-xl border p-5 ${model.color}`}>
                <div className={`w-10 h-10 rounded-lg ${model.iconBg} flex items-center justify-center text-xl mb-3`}>
                  {model.icon}
                </div>
                <h3 className="font-bold text-sm mb-3">{model.title}</h3>
                <div className="space-y-2">
                  {model.rows.map((row, ri) => (
                    <div key={ri} className="flex justify-between text-xs border-b border-black/5 pb-1.5">
                      <span className="text-gray-500 font-medium">{row.label}</span>
                      <span className="text-gray-700 font-semibold text-right max-w-[55%]">{row.value}</span>
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
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold">Applicable Law & Jurisdiction Coverage</h2>
          <p className="text-sm text-gray-500 mt-1">
            The framework is developed for UK / EU (applicable with GDPR and applicable law in both jurisdictions to be confirmed by ECIL).
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-6 bg-[#0f2244] text-white text-xs font-bold px-4 py-3 gap-2">
            <div className="col-span-2">Document</div>
            <div>England & Wales / Type</div>
            <div>GDPR / EU Type</div>
            <div>CARICOM / Type</div>
            <div>UAE / Type</div>
          </div>

          {jurisdictionRows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-6 px-4 py-3 gap-2 text-xs items-center border-b border-gray-100 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="col-span-2">
                <p className="font-semibold text-gray-800">{row.doc}</p>
                <p className="text-gray-400 text-[11px]">{row.sub}</p>
              </div>
              {[row.england, row.gdpr, row.caricom, row.uae].map((cell, ci) => (
                <div key={ci}>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${cell.color}`}>
                    ✓ {cell.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── PARTNER GOVERNANCE FRAMEWORK ─────────────────────── */}
      <section className="bg-gray-50 py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold">Partner Governance Framework</h2>
            <p className="text-sm text-gray-500 mt-1">
              Every partnership operates within a structured governance model built around day-to-day use.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5 mb-8">
            {governanceFeatures.map((feat, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h4 className="font-bold text-sm mb-1">{feat.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>

          {/* Template Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-xs text-yellow-800 leading-relaxed">
            <span className="font-bold">Template Disclaimer:</span> All documents in this framework pack are template agreements prepared for informational and governance purposes only. All agreements should be reviewed by a qualified legal professional before execution. GoLite Mobile makes no warranty, expressed or implied, with respect to the legal sufficiency or enforceability of any template document in any specific jurisdiction. Partners are advised to seek independent legal advice prior to countersignature.
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
                All legal agreements as a single governance-ready bundle. Pre-formatted for legal review and partner countersignature.
              </p>
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
                    <span className="font-semibold">8 templates</span>
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
                <button className="w-full bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold py-3 rounded-xl text-sm">
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
            <button className="bg-white/10 hover:bg-white/20 transition-colors text-white font-semibold px-5 py-2.5 rounded-xl text-sm whitespace-nowrap">
              partners@golitemobile.com
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
