"use client";
import React, { useState } from "react";

export default function TrustCenter() {
  const [activeSection, setActiveSection] = useState("Overview");

  const navItems = [
    { icon: "📊", label: "Overview" },
    { icon: "🏅", label: "Certifications" },
    { icon: "🔐", label: "Security" },
    { icon: "🔒", label: "Privacy" },
    { icon: "🤖", label: "AI Governance" },
    { icon: "⚖️", label: "Risk & Compliance" },
    { icon: "📜", label: "Policies" },
    { icon: "📂", label: "Documents" },
  ];

  const certifications = [
    {
      icon: "📜",
      name: "ISO 27001",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "Information Security Management System certification, validating our enterprise-grade security controls and digital risk governance framework.",
    },
    {
      icon: "🛡️",
      name: "SOC 2 Type II",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "Security, Availability, and Confidentiality trust service criteria independently audited and verified across all platform operations.",
    },
    {
      icon: "🌐",
      name: "GDPR / UK GDPR",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "Full compliance with EU and UK General Data Protection Regulations across all data processing activities and digital touchpoints.",
    },
    {
      icon: "🔐",
      name: "Cyber Essentials Plus",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "UK government-backed scheme protecting against the most common cyber threats, independently verified at the Plus level.",
    },
    {
      icon: "🤖",
      name: "ISO 42001 — AI",
      status: "In Progress",
      statusColor: "bg-orange-100 text-orange-700",
      desc: "AI management system standard governing responsible development and deployment of artificial intelligence systems within GoLite operations.",
    },
    {
      icon: "📊",
      name: "CCPA Compliance",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "California Consumer Privacy Act compliance programme, supporting data rights for all applicable US-based customers and end users.",
    },
  ];

  const securityCategories = [
    {
      icon: "🧑‍💻",
      title: "Identity & Authentication",
      sub: "MFA · SSO · Zero Trust access",
      detail: "Multi-factor authentication is enforced across all systems. SSO with Zero Trust network access controls access to all internal and partner-facing platforms.",
    },
    {
      icon: "🔑",
      title: "Access Control",
      sub: "RBAC · Principle of least privilege · Privileged access management",
      detail: "Role-based access control restricts system access by job function. All privileged accounts are subject to enhanced monitoring and regular recertification.",
    },
    {
      icon: "📡",
      title: "Monitoring & Incident Response",
      sub: "24/7 SOC · SIEM · Incident management",
      detail: "A 24/7 Security Operations Centre monitors all systems in real time. Documented incident response procedures ensure rapid detection, containment, and communication.",
    },
    {
      icon: "🔒",
      title: "Encryption & Data Protection",
      sub: "TLS · AES-256 · Key management",
      detail: "All data is encrypted in transit via TLS 1.2+ and at rest via AES-256. Encryption key management follows NIST guidelines with annual key rotation.",
    },
  ];

  const privacyPrinciples = [
    {
      icon: "📖",
      title: "Lawfulness & Transparency",
      desc: "All personal data is collected and processed on a defined lawful basis. GoLite Mobile maintains a public-facing record of processing activities and privacy notices.",
    },
    {
      icon: "🎯",
      title: "Purpose Limitation",
      desc: "Data collected for a specified purpose is never repurposed without a new lawful basis. Processing is strictly limited to defined and documented operational objectives.",
    },
    {
      icon: "📉",
      title: "Data Minimisation",
      desc: "GoLite Mobile collects only the personal data strictly necessary for each processing purpose. Excess data fields are eliminated at the point of collection design.",
    },
    {
      icon: "💾",
      title: "Storage Limitation",
      desc: "Retention schedules are applied to all data categories. Personal data is automatically purged or anonymised at the end of its defined retention window.",
    },
  ];

  const privacyRights = [
    {
      icon: "📥",
      title: "Request Your Data",
      desc: "Submit a Subject Access Request and receive a full export of all personal data held by GoLite Mobile within 30 days.",
      button: "Submit SAR",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: "✏️",
      title: "Correct Your Data",
      desc: "Request correction of inaccurate or incomplete personal data held on your account at any time.",
      button: "Request Correction",
      buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    },
    {
      icon: "🗑️",
      title: "Delete Your Data",
      desc: "Exercise your right to erasure. GoLite Mobile will action verified deletion requests within 30 days, subject to legal retention obligations.",
      button: "Request Deletion",
      buttonColor: "bg-red-500 hover:bg-red-600",
    },
    {
      icon: "🔄",
      title: "Data Portability",
      desc: "Receive your personal data in a structured, machine-readable format for transfer to another service provider of your choice.",
      button: "Export Data",
      buttonColor: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: "🚫",
      title: "Object to Processing",
      desc: "Object to processing based on legitimate interests or for direct marketing purposes at any time without providing a reason.",
      button: "Submit Objection",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
    },
    {
      icon: "⚙️",
      title: "Right to Restriction",
      desc: "Request restriction of processing while a complaint or accuracy challenge is being resolved by our Data Protection team.",
      button: "Request Restriction",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  const aiPrinciples = [
    {
      icon: "👤",
      title: "Human-in-Command",
      desc: "All consequential AI-assisted decisions are subject to human review. No automated system makes final determinations on customer-affecting outcomes without oversight.",
    },
    {
      icon: "🔍",
      title: "Explainability",
      desc: "AI outputs used in customer-facing contexts are explainable by design. GoLite Mobile documents the logic, inputs, and confidence thresholds for all deployed models.",
    },
    {
      icon: "📜",
      title: "Policy Enforcement",
      desc: "AI deployment is governed by an internal AI Ethics & Governance Policy reviewed quarterly and aligned with the EU AI Act and ISO 42001 framework.",
    },
    {
      icon: "⚖️",
      title: "Fairness & Bias",
      desc: "All models are evaluated for demographic bias prior to deployment. Bias audits are conducted annually and results are made available in our AI Transparency Report.",
    },
    {
      icon: "📢",
      title: "AI Disclosure",
      desc: "Customers are informed whenever AI is used to assist in decisions affecting their account, service, or pricing. Disclosure is embedded at point-of-interaction.",
    },
    {
      icon: "📉",
      title: "Data Minimisation",
      desc: "AI training pipelines are subject to strict data minimisation controls. Synthetic data is preferred where operationally viable to reduce personal data exposure.",
    },
  ];

  const riskItems = [
    {
      icon: "📡",
      title: "Telecom Regulatory Compliance",
      desc: "Ongoing alignment with regulatory, monitoring and reporting obligations.",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      icon: "🚫",
      title: "Anti-Bribery & Corruption",
      desc: "UK Bribery Act 2010 and international anti-corruption framework — zero-tolerance policy with third-party due diligence.",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      icon: "🌍",
      title: "Sanctions & Export Controls",
      desc: "OFAC, HM Treasury and EU sanctions screening — ongoing monitoring of counterparty sanctions exposure across all markets.",
      status: "Active",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      icon: "💳",
      title: "PCI DSS (Payments)",
      desc: "Payment Card Industry Data Security Standards compliance for all card-present and card-not-present transaction environments.",
      status: "In Review",
      statusColor: "bg-orange-100 text-orange-700",
    },
    {
      icon: "🔁",
      title: "Business Continuity & DR",
      desc: "Tested Business Continuity Plan and Disaster Recovery procedures with defined RPO/RTO targets across all critical systems.",
      status: "Under Review",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      icon: "🌱",
      title: "ESG & Sustainability Reporting",
      desc: "Annual sustainability report published — Carbon offset tracking, governance disclosures, Blue Economy commitments.",
      status: "Annual Report",
      statusColor: "bg-blue-100 text-blue-700",
    },
  ];

  const policies = [
    { icon: "🔐", name: "Information Security Policy", version: "v3.1", date: "Jan 2026" },
    { icon: "🔒", name: "Privacy & Data Protection Policy", version: "v2.4", date: "Jan 2026" },
    { icon: "📘", name: "Acceptable Use Policy", version: "v1.8", date: "Jan 2026" },
    { icon: "🤖", name: "AI & Governance Policy", version: "v1.2", date: "Jan 2026" },
    { icon: "🚫", name: "Anti-Bribery & Anti-Corruption Policy", version: "v2.0", date: "Sep 2025" },
    { icon: "🔁", name: "Business Continuity & Disaster Recovery Policy", version: "v2.1", date: "Feb 2026" },
    { icon: "⚠️", name: "Vulnerability Disclosure Policy", version: "v1.0", date: "in draft" },
  ];

  const documents = [
    { name: "Privacy Policy", sub: "golitemobile.com", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Mar 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Terms of Service", sub: "golitemobile.com", category: "Legal", categoryColor: "bg-purple-100 text-purple-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Mar 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Cookie Policy", sub: "golitemobile.com", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Jan 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Data Processing Agreement (DPA)", sub: "Partner use", category: "Legal", categoryColor: "bg-purple-100 text-purple-700", access: "Restricted", accessColor: "bg-orange-100 text-orange-700", date: "Dec 2025", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600" },
    { name: "SOC 2 Type II Report", sub: "Security audit", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "Restricted", accessColor: "bg-orange-100 text-orange-700", date: "Feb 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "ISO 27001 Certificate", sub: "Information security", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Oct 2025", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Penetration Test Summary", sub: "Redacted executive report", category: "Security", categoryColor: "bg-red-100 text-red-700", access: "NDA Required", accessColor: "bg-red-100 text-red-700", date: "Dec 2025", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600" },
    { name: "Business Continuity Plan", sub: "Executive summary only", category: "Risk", categoryColor: "bg-yellow-100 text-yellow-700", access: "Restricted", accessColor: "bg-orange-100 text-orange-700", date: "Feb 2026", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600" },
    { name: "AI/CPRA/AI Governance Policy", sub: "", category: "AI", categoryColor: "bg-indigo-100 text-indigo-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Jan 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Subprocessor List", sub: "", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Mar 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Cyber Essentials Plus Certificate", sub: "", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Aug 2025", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
    { name: "Annual Sustainability Report", sub: "", category: "ESG", categoryColor: "bg-teal-100 text-teal-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Jan 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" },
  ];

  return (
    <section className="bg-[#f5f6f7] text-gray-800 min-h-screen dark:bg-gray-950 dark:text-white">

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-12 px-4">
        <h1 className="text-3xl font-bold">Compliance- Trust Center</h1>
        <p className="text-sm mt-2 max-w-xl mx-auto opacity-90">
          Security, compliance and governance — transparently delivered.
          Access certifications, policies, and compliance documentation in one
          centralized portal.
        </p>
      </div>

      {/* 3-COLUMN LAYOUT */}
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-5 mt-6 px-4 pb-16 items-start">

        {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
        <aside className="col-span-2 dark:bg-gray-950 dark:text-white bg-white rounded-xl p-3 shadow-sm sticky top-4">
          <p className="text-[10px] font-bold dark:bg-gray-950 dark:text-white text-gray-400 uppercase tracking-widest px-2 mb-2">Navigation</p>
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all mb-0.5 ${
                activeSection === item.label
                  ? "bg-green-50 text-green-700 font-semibold"
                  : " dark:bg-gray-950 dark:text-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div className="col-span-7 space-y-5">

          {/* OVERVIEW */}
          <div className=" dark:bg-gray-950 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 dark:bg-gray-950 dark:text-white">
              <h2 className="font-bold text-base flex items-center gap-2 dark:bg-gray-950 dark:text-white">📊 Overview</h2>
              <span className="text-xs dark:bg-gray-950 dark:text-white bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                UPDATED MARCH 2026
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm dark:bg-gray-950 dark:text-white">
              <div className="space-y-3 dark:bg-gray-950 dark:text-white">
                <p className="dark:bg-gray-950 dark:text-white text-gray-600 leading-relaxed">
                  GoLite Mobile operates a governance-first security and compliance
                  program aligned with international standards. Our Trust Center provides
                  real-time access to all certifications, policies, and regulatory
                  documentation. All documentation is managed through a
                  continuous-review model. Public documents are freely accessible;
                  restricted documentation requires notification and a signed NDA where applicable.
                </p>
              </div>
              <div className="space-y-2 bg-gray-50 rounded-xl p-4 dark:bg-gray-950 dark:text-white">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="dark:bg-gray-950 dark:text-white text-gray-500">Active Certifications</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 dark:bg-gray-950 dark:text-white">Compliance Frameworks</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2 dark:bg-gray-950 dark:text-white">
                  <span className="text-gray-500 dark:bg-gray-950 dark:text-white">Regions Covered</span>
                  <span className="font-bold">UK · EU · USA · India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:bg-gray-950 dark:text-white">Last Audit</span>
                  <span className="font-bold">Feb 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS */}
          <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white">
            <h2 className="font-bold text-base mb-4 flex items-center gap-2">🏅 Certifications</h2>
            <p className="text-xs text-gray-400 mb-5 dark:bg-gray-950 dark:text-white">Active certifications and current compliance status of GoLite's key frameworks.</p>
            <div className="grid grid-cols-3 gap-4">
              {certifications.map((cert, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{cert.icon}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cert.statusColor}`}>
                      {cert.status}
                    </span>
                  </div>
                  <p className="font-bold text-sm">{cert.name}</p>
                  <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SECURITY */}
          <div className="bg-[#0f1c2e] p-6 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white text-white">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">🔐 Security</h2>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-5">Architecture, controls, and operational security. GoLite Mobile.</p>

            {/* Security icon bar */}
            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              {["🧑‍💻 Identity", "🔑 Access", "📡 Monitoring", "🔒 Encryption", "🌐 Network", "🔑 Endpoint"].map((item, i) => (
                <div key={i} className="flex-shrink-0 flex flex-col items-center gap-1 bg-white/10 rounded-lg px-3 py-2 text-xs text-gray-300 min-w-[70px] text-center">
                  <span className="text-lg">{item.split(" ")[0]}</span>
                  <span>{item.split(" ").slice(1).join(" ")}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {securityCategories.map((item, i) => (
                <div key={i} className="bg-white/5 border dark:bg-gray-950 dark:text-white border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span>{item.icon}</span>
                    <p className="font-semibold text-sm">{item.title}</p>
                  </div>
                  <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-2">{item.sub}</p>
                  <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-300 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PRIVACY */}
          <div className=" dark:bg-gray-950 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-base flex items-center gap-2">🔒 Privacy</h2>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">GDPR Compliant</span>
            </div>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-5">GoLite Mobile processes and protects data with rights.</p>

            <div className="grid grid-cols-2 gap-5">
              {/* Principles */}
              <div className="space-y-3">
                {privacyPrinciples.map((p, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{p.icon}</span>
                      <p className="font-semibold text-xs">{p.title}</p>
                    </div>
                    <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              {/* Rights */}
              <div className="space-y-3">
                {privacyRights.map((r, i) => (
                  <div key={i} className="border border-gray-100 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{r.icon}</span>
                      <p className="font-semibold text-xs">{r.title}</p>
                    </div>
                    <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 leading-relaxed mb-2">{r.desc}</p>
                    <button className={`text-[10px] text-white font-bold px-3 py-1 rounded-full transition-colors ${r.buttonColor}`}>
                      {r.button}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI GOVERNANCE */}
          <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-base flex items-center gap-2">🤖 AI Governance</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">ISO 42001 In Progress</span>
            </div>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-5">AI ethics, explainability, and responsible deployment — GoLite Mobile.</p>
            <div className="grid grid-cols-3 gap-4">
              {aiPrinciples.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4">
                  <div className="text-xl mb-2">{item.icon}</div>
                  <p className="font-bold text-xs mb-1">{item.title}</p>
                  <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RISK & COMPLIANCE */}
          <div className=" dark:bg-gray-950 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">⚖️ Risk & Compliance</h2>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-5">Regulatory risk management and framework coverage.</p>
            <div className="space-y-3">
              {riskItems.map((item, i) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-sm">{item.title}</p>
                      <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${item.statusColor}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* POLICIES */}
          <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">📜 Policies</h2>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-5">Internal governance policies, available for public review.</p>
            <div className="space-y-2">
              {policies.map((p, i) => (
                <div key={i} className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span>{p.icon}</span>
                    <p className="text-sm font-medium">{p.name}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs dark:bg-gray-950 dark:text-white text-gray-400">
                    <span>{p.version}</span>
                    <span>{p.date}</span>
                    <button className="bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full hover:bg-green-100 transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COMPLIANCE DOCUMENTS */}
          <div className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white">
            <div className="flex items-center justify-between mb-4 dark:bg-gray-950 dark:text-white">
              <h2 className="font-bold text-base flex items-center gap-2 dark:bg-gray-950 dark:text-white">📂 Compliance Documents</h2>
              <button className="text-xs bg-blue-500 dark:bg-gray-950 dark:text-white text-white px-3 py-1.5 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Request Access
              </button>
            </div>

            <div className="rounded-xl border dark:bg-gray-950 dark:text-white border-gray-200 overflow-hidden">
              <div className="grid grid-cols-12 bg-[#0f2244] dark:bg-gray-950 dark:text-white text-white text-xs font-bold px-4 py-3 gap-2">
                <div className="col-span-4">Document / Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Access</div>
                <div className="col-span-2">Last Updated</div>
                <div className="col-span-2">Action</div>
              </div>

              {documents.map((doc, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-12 px-4 py-3 gap-2 text-xs items-center border-b dark:bg-gray-950 dark:text-white border-gray-100 ${
                    i % 2 === 0 ? "bg-white dark:bg-gray-950 dark:text-white" : "bg-gray-50 dark:bg-gray-950 dark:text-white"
                  }`}
                >
                  <div className="col-span-4">
                    <p className="font-semibold text-gray-800 dark:bg-gray-950 dark:text-white">{doc.name}</p>
                    {doc.sub && <p className= "dark:bg-gray-950 dark:text-white  text-gray-400 text-[11px]">{doc.sub}</p>}
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.categoryColor}`}>
                      {doc.category}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.accessColor}`}>
                      {doc.access}
                    </span>
                  </div>
                  <div className="col-span-2 dark:bg-gray-950 dark:text-white text-gray-500">{doc.date}</div>
                  <div className="col-span-2">
                    <button className={ ` dark:bg-gray-950 dark:text-white text-white text-[10px] font-bold px-2 py-1 rounded-full transition-colors ${doc.actionColor}`}>
                      {doc.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT PANEL ──────────────────────────────────── */}
        <aside className="col-span-3 space-y-4 sticky top-4">

          {/* Downloads */}
          <div className="bg-white p-4 rounded-xl dark:bg-gray-950 dark:text-white shadow-sm">
            <h3 className="font-bold text-sm mb-1">⬇️ Downloads</h3>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-3">
              Download all public compliance documents as a single bundle.
            </p>
            <button className="bg-green-500 hover:bg-green-600 transition-colors dark:bg-gray-950 dark:text-white text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Download All Public Docs
            </button>
          </div>

          {/* Request Access */}
          <div className="bg-white p-4 rounded-xl shadow-sm dark:bg-gray-950 dark:text-white">
            <h3 className="font-bold text-sm mb-1">📩 Request Access</h3>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-3">
              Need restricted documents? Submit a verified access request and our compliance team will respond within 2 business days.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Request Restricted Access
            </button>
          </div>

          {/* Stay Updated */}
          <div className="bg-[#0f1c2e] text-white p-4 rounded-xl">
            <h3 className="font-bold text-sm mb-1">🔔 Stay Updated</h3>
            <p className="text-xs dark:bg-gray-950 dark:text-white text-gray-400 mb-3">
              Get notified when certifications are renewed or new compliance documents are published.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white/10 text-white dark:bg-gray-950 dark:text-white placeholder-gray-500 text-xs rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-green-400"
            />
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Subscribe to Updates
            </button>
          </div>

        </aside>

      </div>
    </section>
  );
}
