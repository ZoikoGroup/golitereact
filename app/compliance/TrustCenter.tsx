"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function TrustCenter() {
  const [activeSection, setActiveSection] = useState("Overview");

  const navItems = [
    { icon: "/img/compliance/1.png", label: "Overview" },
    { icon: "/img/compliance/2.png", label: "Certifications" },
    { icon: "/img/compliance/3.png", label: "Security" },
    { icon: "/img/compliance/4.png", label: "Privacy" },
    { icon: "/img/compliance/5.png", label: "AI Governance" },
    { icon: "/img/compliance/6.png", label: "Risk & Compliance" },
    { icon: "/img/compliance/7.png", label: "Policies" },
    { icon: "/img/compliance/8.png", label: "Documents" },
  ];

  const certifications = [
    {
      icon: "/img/compliance/2.png",
      name: "ISO 27001",
      status: "✓ Active",
      statusColor: "bg-green-100 text-green-700",
      desc: " Information Security Management System Validates controls protecting the confidentiality, integrity, and availability of  information assets. ",
    },
    {
      icon: "/img/compliance/3.png",
      name: "SOC 2 Type II",
      status: "✓ Active",
      statusColor: "bg-green-100 text-green-700",
      desc: "Security, Availability, and Confidentiality trust service criteria independently audited and verified across all platform operations.",
    },
    {
      icon: "/img/compliance/4.png",
      name: "GDPR / UK GDPR",
      status: "✓ Compliant",
      statusColor: "bg-green-100 text-green-700",
      desc: "Full compliance with EU and UK GDPR. Includes DPAs, SCCs, and full data subject rights support.",
    },
    {
      icon: "/img/compliance/31.png",
      name: "Cyber Essentials Plus",
      status: "✓ Certified",
      statusColor: "bg-green-100 text-green-700",
      desc: " UK government-backed scheme validating technical controls against common cyber attack vectors.   ",
    },
    {
      icon: "/img/compliance/5.png",
      name: "ISO 42001 — AI",
      status: "⟳ In Progress",
      statusColor: "bg-orange-100 text-orange-700",
      desc: "AI Management System standard alignment.Covering human oversight, explainability, and responsible AI deployment practices.",
    },
    {
      icon: "/img/compliance/10.png",
      name: "CCPA Compliance",
      status: "⟳ In Progress",
      statusColor: "bg-green-100 text-green-700",
      desc: "California Consumer Privacy Act compliance programme. Technical controls and consumer rights workflows underimplementation.",
    },
  ];

 const securityCategories = [
  {
    icon: "/img/compliance/3.png",
    title: "Security",
    sub: "Architecture, controls, and technical measures",
  },
  {
    icon: "/img/compliance/11.png",
    title: "Identity & Authentication",
    sub: "MFA · SSO · Zero Trust access",
  },
  {
    icon: "/img/compliance/10.png",
    title: "Access Control",
    sub: "RBAC · Least privilege · Privileged access management",
  },
  {
    icon: "/img/compliance/13.png",
    title: "Monitoring & Incident Response",
    sub: "24/7 SOC · SIEM · Incident playbooks",
  },
  {
    icon: "/img/compliance/32.png",
    title: "Encryption & Data Protection",
    sub: "AES-256 · TLS 1.3 · Key management",
  },
];

  const privacyPrinciples = [
    {
      icon: "/img/compliance/15.png",
      title: "Lawfulness & Transparency",
      desc: "All personal data is processed lawfully, fairly, and transparently. Customers are informed of data use at point of collection.",
    },
    {
      icon: "/img/compliance/16.png",
      title: "Purpose Limitation",
      desc: "Data is collected for specified, explicit purposes and never processed in a manner incompatible with those purposes.",
    },
    {
      icon: "/img/compliance/17.png",
      title: "Data Minimisation",
      desc: "We collect only the data that is strictly necessary. No excessive collection. Regular data inventory reviews are conducted.",
    },
    {
      icon: "/img/compliance/18.png",
      title: "Storage Limitation",
      desc: "Personal data is not retained longer than necessary. Defined retention periods apply to all data categories.",
    },
  ];

 const privacyRights = [
  {
    icon: "/img/compliance/19.png",
    title: "Request Your Data",
    desc: "Subject Access Request (SAR)",
  },
  {
    icon: "/img/compliance/20.png",
    title: "Correct Your Data",
    desc: "Right to rectification",
  },
  {
    icon: "/img/compliance/18.png",
    title: "Delete Your Data",
    desc: "Right to erasure (Right to be Forgotten)",
  },
  {
    icon: "/img/compliance/21.png",
    title: "Data Portability",
    desc: "Receive your data in a structured, machine-readable format",
  },
  {
    icon: "/img/compliance/22.png",
    title: "Object to Processing",
    desc: "Right to restrict or object to certain processing",
  },
];

 const aiPrinciples = [
  {
    icon: "/img/compliance/23.png",
    title: "Human-in-Command",
    desc: "All AI-assisted decisions affecting customers or compliance are reviewed and approved by accountable human operators.",
  },
  {
    icon: "/img/compliance/24.png",
    title: "Explainability",
    desc: "AI recommendations and automated decisions are logged with explainable rationale, accessible on request.",
  },
  {
    icon: "/img/compliance/10.png",
    title: "Policy Enforcement",
    desc: "AI usage is governed by a formal policy framework aligned with ISO 42001 and our internal governance board.",
  },
  {
    icon: "/img/compliance/15.png",
    title: "Fairness & Bias",
    desc: "Models are regularly audited for discriminatory outputs. Bias detection is embedded in our model evaluation pipeline.",
  },
  {
    icon: "/img/compliance/33.png",
    title: "AI Disclosure",
    desc: "Customers are informed when AI or automated systems are used in decisions that materially affect them.",
  },
  {
    icon: "/img/compliance/32.png",
    title: "Data Minimisation",
    desc: "AI models are trained and operated with the minimum data necessary. No unnecessary retention for model training.",
  },
];

  const riskItems = [
  {
    icon: "/img/compliance/13.png",
    title: "Telecom Regulatory Compliance",
    desc: "Ofcom (UK), FCC (USA), TRAI (India) — ongoing regulatory monitoring and reporting",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "/img/compliance/25.png",
    title: "Anti-Bribery & Corruption",
    desc: "UK Bribery Act 2010 and US FCPA compliance. Annual training and third-partyscreening.",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "/img/compliance/26.png",
    title: "Sanctions & Export Controls",
    desc: "OFAC, HMT, and EU sanctions screening. No services provided to sanctioned entities or territories.",
    status: "Active",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "/img/compliance/27.png",
    title: "PCI DSS (Payments)",
    desc: "Payment Card Industry Data Security Standard compliance for all card processing operations.",
    status: "In Review",
    statusColor: "bg-orange-100 text-orange-700",
  },
  {
    icon: "/img/compliance/33.png",
    title: "Business Continuity & DR",
    desc: "Documented BCP and Disaster Recovery plans. Annual tabletop exercises and quarterly failover testing.",
    status: "Under Review",
    statusColor: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "/img/compliance/28.png",
    title: "ESG & Sustainability Reporting",
    desc: "Annual sustainability report. Carbon offset programme and Blue Economy commitment tracking.",
    status: "Annual Report",
    statusColor: "bg-blue-100 text-blue-700",
  },
];

  const policies = [
    { icon: "/img/compliance/8.png", name: "Information Security Policy", version: "v3.1", date: "Mar 2026" },
    { icon: "/img/compliance/8.png", name: "Privacy & Data Protection Policy", version: "v4.0", date: "Feb 2026" },
    { icon: "/img/compliance/8.png", name: "Acceptable Use Policy", version: "v2.3", date: "Jan 2026" },
    { icon: "/img/compliance/8.png", name: "AI Ethics & Governance Policy", version: "v1.2", date: "Mar 2026" },
    { icon: "/img/compliance/8.png", name: "Anti-Bribery & Anti-Corruption Policy", version: "v2.0", date: "Nov 2025" },
        { icon: "/img/compliance/8.png", name: "Sanctions & Export Control Policy", version: "v1.4", date: "Oct 2025" },
    { icon: "/img/compliance/8.png", name: "Business Continuity & Disaster Recovery Policy", version: "v2.1", date: "Sep 2025" },
    { icon: "/img/compliance/8.png", name: "Vulnerability Disclosure Policy", version: "v1.0", date: "Aug 2025" },
  ];
const documents = [
  { name: "Privacy Policy", sub: "Customer-facing privacy notice", category: " Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Mar 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" ,iconused:"/img/compliance/32.png"},

  { name: "Terms of Service", sub: "Customer agreement", category: "Legal", categoryColor: "bg-purple-100 text-purple-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Feb 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600",iconused:"/img/compliance/32.png" },

  { name: "Cookie Policy", sub: "Web and app cookie notice", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Feb 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600",iconused:"/img/compliance/32.png" },

  { name: "Data Processing Agreement (DPA)", sub: "Partner data agreement template", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Restricted", accessColor: "bg-orange-100 text-orange-700", date: "Mar 2026", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600",iconused:"/img/compliance/32.png" },

  { name: "SOC 2 Type II Report", sub: "Security audit report (qualified partners)", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "NDA Required", accessColor: "bg-red-100 text-red-700", date: "Jan 2026", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600",iconused:"/img/compliance/4.png" },

  { name: "ISO 27001 Certificate", sub: "Certification evidence", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Nov 2025", action: "Download", actionColor: "bg-green-500 hover:bg-green-600",iconused:"/img/compliance/32.png" },

  { name: "Penetration Test Summary", sub: "Executive summary — latest pentest", category: "Security", categoryColor: "bg-red-100 text-red-700", access: "NDA Required", accessColor: "bg-red-100 text-red-700", date: "Dec 2025", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600",iconused:"/img/compliance/4.png" },

  { name: "Business Continuity Plan Summary", sub: "BCP executive summary", category: "Risk", categoryColor: "bg-yellow-100 text-yellow-700", access: "Restricted", accessColor: "bg-orange-100 text-orange-700", date: "Sep 2025", action: "Request Access", actionColor: "bg-orange-500 hover:bg-orange-600",iconused:"/img/compliance/32.png" },

  { name: "AI Ethics & Governance Policy", sub: "Public policy document", category: "AI", categoryColor: "bg-indigo-100 text-indigo-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Mar 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" ,iconused:"/img/compliance/5.png"},

  { name: "Subprocessor List", sub: "Approved third-party processors", category: "Privacy", categoryColor: "bg-blue-100 text-blue-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Feb 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" ,iconused:"/img/compliance/32.png"},

  { name: "Cyber Essentials Plus Certificate", sub: "UK government certification", category: "Certification", categoryColor: "bg-green-100 text-green-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Oct 2025", action: "Download", actionColor: "bg-green-500 hover:bg-green-600",iconused:"/img/compliance/32.png" },

  { name: "Annual Sustainability Report", sub: "ESG & blue economy report", category: "ESG", categoryColor: "bg-teal-100 text-teal-700", access: "Public", accessColor: "bg-green-100 text-green-700", date: "Jan 2026", action: "Download", actionColor: "bg-green-500 hover:bg-green-600" ,iconused:"/img/compliance/32.png"},
];

  return (
   <section className="scroll-smooth bg-[#f5f6f7] text-gray-800 min-h-screen dark:bg-gray-900 dark:text-white">

      {/* HERO */}
      <div  id="Overview" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-12 px-4">
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
       <aside className="col-span-2 dark:bg-gray-900 dark:text-white bg-white rounded-xl p-3 shadow-sm sticky top-4">
  <p className="text-[10px] font-bold dark:bg-gray-900 dark:text-white text-gray-400 uppercase tracking-widest px-2 mb-2">Navigation</p>
  {navItems.map((item) => (
  <button
  key={item.label}
  onClick={() => {
    setActiveSection(item.label);
    const el = document.getElementById(item.label);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }}
  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all mb-0.5 ${
    activeSection === item.label
      ? "bg-green-50 text-green-700 font-semibold"
      : "dark:bg-gray-900 dark:text-white text-gray-600 hover:bg-gray-100"
  }`}
>
  {/* ICON */}

<div className="w-4 h-4 relative">
  <Image
    src={item.icon}
    alt={item.label}
    fill
    className="object-contain"
  />
</div>
  {/* LABEL */}
  <span>{item.label}</span>
</button>
  ))}
</aside>

        {/* ── MAIN CONTENT ─────────────────────────────────── */}
        <div className="col-span-7 space-y-5">

          {/* OVERVIEW */}
          <div className=" dark:bg-gray-900 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4 dark:bg-gray-900 dark:text-white">
              <h2 className="font-bold text-base flex items-center gap-2 dark:bg-gray-900 dark:text-white">
                  <Image
                      src={"/img/compliance/1.png"}
                      alt="icon"
                      width={20}
                      height={20}
                      className="object-contain"
                    />Overview</h2>

                    <p className="text-gray-700 xl flex">Trust posture summary</p>
              <span className="text-xs dark:bg-gray-900 dark:text-white bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                UPDATED MARCH 2026
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm dark:bg-gray-900 dark:text-white">
              <div className="space-y-3 dark:bg-gray-900 dark:text-white">
                <p className="dark:bg-gray-900 dark:text-white text-gray-600 leading-relaxed">
                  GoLite Mobile operates a governance-first
security and compliance programme
across all products, infrastructure, and data
operations. Our Trust Center provides
verified, transparent access to the
certifications, policies, and technical
controls that underpin our platform.
                  </p>
                  
                  <p className="dark:bg-gray-900 dark:text-white text-gray-600 leading-relaxed">
All documentation is managed through a
controlled access model. Public documents
are freely available. Restricted materials
require identity verification and a signed
NDA where applicable.
                  </p>
                
                
              </div>
              <div className="space-y-2 bg-gray-50 rounded-xl p-4 dark:bg-gray-900 dark:text-white">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="dark:bg-gray-900 dark:text-white text-gray-500">Active Certifications</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500 dark:bg-gray-900 dark:text-white">Compliance Frameworks</span>
                  <span className="font-bold">8</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2 dark:bg-gray-900 dark:text-white">
                  <span className="text-gray-500 dark:bg-gray-900 dark:text-white">Regions Covered</span>
                  <span className="font-bold">UK · EU · USA · India</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:bg-gray-900 dark:text-white">Last Audit</span>
                  <span className="font-bold">Feb 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* CERTIFICATIONS */}
     <div  id="Certifications" className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white">
  {/* Header */}
  <h2 className="font-bold text-base mb-2 flex items-center gap-2">
   
   <Image 
    src="/img/compliance/2.png" 
    alt="doc" 
    width={18} 
    height={18} 
  />  Certifications
  </h2>

  <p className="text-xs text-gray-400 mb-5">
    Active certifications and current compliance status of GoLite's key frameworks.
  </p>

  {/* Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
  {certifications.map((cert) => {
    const isInProgress = cert.status.includes("In Progress");

    return (
      <div
        key={cert.name}
        className={`rounded-xl p-5 flex flex-col items-center text-center gap-3 border transition
        ${isInProgress ? "border-orange-300" : "border-green-300"}
        bg-white dark:bg-gray-800 hover:shadow-md`}
      >
        {/* ✅ ICON FIX */}
        <div className="w-4 h-4 relative">
          <Image
            src={cert.icon}
            alt={cert.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <p className="font-semibold text-sm">{cert.name}</p>

        {/* Status */}
        <span
          className={`text-[10px] font-bold px-3 py-1 rounded-full ${cert.statusColor}`}
        >
          {cert.status}
        </span>

        {/* Description */}
        <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
          {cert.desc}
        </p>
      </div>
    );
  })}
</div>
</div>
          {/* SECURITY */}
          <div id="Security" className="bg-[#0f1c2e] p-6 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white text-white">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">🔐 Security</h2>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-5">Architecture, controls, and operational security. GoLite Mobile.</p>

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
    <div
      key={i}
      className="bg-white/5 border border-white/10 rounded-xl p-4 dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center gap-2 mb-1">
        
        {/* ✅ EXACT SAME PATTERN AS NAVITEMS */}
   <div className="w-4 h-4 relative flex-shrink-0">
  <Image
    src={item.icon}
    alt={item.title}
    fill
    className="object-contain"
  />
</div>

        <p className="font-semibold text-sm">
          {item.title}
        </p>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-300 mb-2">
        {item.sub}
      </p>
    </div>
  ))}
</div>
          </div>

          {/* PRIVACY */}
          <div  id="Privacy" className=" dark:bg-gray-900 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-base flex items-center gap-2"> <Image 
    src="/img/compliance/4.png" 
    alt="doc" 
    width={16} 
    height={16} 
  />
Privacy</h2>
              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">GDPR Compliant</span>
            </div>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-5">Data protection principles and user rights</p>

           <div className="grid grid-cols-2 gap-5">
  
  {/* Principles */}
  <div className="space-y-3">
    {privacyPrinciples.map((p) => (
      <div
        key={p.title}
        className="border border-gray-100 rounded-xl p-3"
      >
        <div className="flex items-center gap-2 mb-1">
          
          {/* ✅ ICON FIX */}
          <div className="w-4 h-4 relative flex-shrink-0">
            <Image
              src={p.icon}
              alt={p.title}
              fill
              className="object-contain"
            />
          </div>

          <p className="font-semibold text-xs">{p.title}</p>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
          {p.desc}
        </p>
      </div>
    ))}
  </div>

  {/* Rights */}
  <div className="space-y-3">
    <h1 className="text-xl text-gray-500 dark:text-white leading-relaxed mb-2">
      Your Data Rights
    </h1>

    {privacyRights.map((r) => (
      <div
        key={r.title}
        className="border border-gray-100 rounded-xl p-3"
      >
        <div className="flex items-center gap-2 mb-1">
          
          {/* ✅ ICON FIX */}
          <div className="w-4 h-4 relative flex-shrink-0">
            <Image
              src={r.icon}
              alt={r.title}
              fill
              className="object-contain"
            />
          </div>

          <p className="font-semibold text-xs">{r.title}</p>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed mb-2">
          {r.desc}
        </p>
      </div>
    ))}
  </div>

</div>
          </div>

          {/* AI GOVERNANCE */}
          <div  id="AI Governance" className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white">
            <div className="flex items-center justify-between mb-1">
              <h2 className="font-bold text-base flex items-center gap-2"><Image 
    src="/img/compliance/5.png" 
    alt="doc" 
    width={16} 
    height={16} 
  />





 AI Governance</h2>
              <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-semibold">ISO 42001 In Progress</span>
            </div>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-5">Responsible AI framework — ISO 42001 alignment.</p>
            <div className="grid grid-cols-3 gap-4">
  {aiPrinciples.map((item) => (
    <div
      key={item.title}
      className="border border-gray-200 rounded-xl p-4"
    >
      {/* ✅ ICON FIX */}
      <div className="w-6 h-6 relative mb-2">
        <Image
          src={item.icon}
          alt={item.title}
          fill
          className="object-contain"
        />
      </div>

      <p className="font-bold text-xs mb-1">{item.title}</p>

      <p className="text-xs text-gray-500 dark:text-gray-300 leading-relaxed">
        {item.desc}
      </p>
    </div>
  ))}
</div>
          </div>

          {/* RISK & COMPLIANCE */}
          <div id="Risk & Compliance"  className=" dark:bg-gray-900 dark:text-white bg-white p-6 rounded-xl shadow-sm">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">⚖️ Risk & Compliance</h2>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-5">Active controls and regulatory alignment</p>
         <div className="space-y-3">
  {riskItems.map((item, i) => (
    <div
      key={i}
      className="border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4"
    >
      <div className="flex items-start gap-3">
        
        {/* ✅ ICON FIX */}
        <div className="w-5 h-5 relative flex-shrink-0 mt-1">
          <Image
            src={item.icon}
            alt={item.title}
            fill
            className="object-contain"
          />
        </div>

        <div>
          <p className="font-semibold text-sm">{item.title}</p>
          <p className="text-xs text-gray-500 dark:text-gray-300 mt-0.5 leading-relaxed">
            {item.desc}
          </p>
        </div>
      </div>

      {/* STATUS */}
      <span
        className={`text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 ${item.statusColor}`}
      >
        {item.status}
      </span>
    </div>
  ))}
</div>
          </div>

          {/* POLICIES */}
          <div id="Policies" className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white">
            <h2 className="font-bold text-base mb-1 flex items-center gap-2">📜 Policies</h2>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-5">Internal governance policies, available for public review.</p>
          <div className="space-y-2">
  {policies.map((p) => (
    <div
      key={p.name}
      className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3"
    >
      <div className="flex items-center gap-3">
        
        {/* ✅ ICON FIX */}
        <div className="w-4 h-4 relative flex-shrink-0">
          <Image
            src={p.icon}
            alt={p.name}
            fill
            className="object-contain"
          />
        </div>

        <p className="text-sm font-medium">{p.name}</p>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-400 dark:text-gray-300">
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
<div id="Documents" className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white">

  {/* HEADER */}
  <div className="flex items-start justify-between mb-4">
    
    {/* LEFT SIDE */}
    <div className="flex items-start gap-3">
      <Image
        src="/img/compliance/8.png"
        alt="doc"
        width={16}
        height={16}
        className="mt-1"
      />

      <div>
        <h2 className="font-bold text-base">
          Compliance Documents
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Public and restricted access documentation
        </p>
      </div>
    </div>

    {/* BUTTON */}
    <button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-full font-semibold hover:bg-blue-600">
      Request Access
    </button>
  </div>

  {/* TABLE */}
  <div className="rounded-xl border border-gray-200 overflow-hidden">

    {/* HEADER ROW */}
    <div className="grid grid-cols-12 bg-[#0f2244] text-white text-xs font-bold px-4 py-3">
      <div className="col-span-4">DOCUMENT NAME</div>
      <div className="col-span-2">CATEGORY</div>
      <div className="col-span-2">ACCESS</div>
      <div className="col-span-2">LAST UPDATED</div>
      <div className="col-span-2">ACTION</div>
    </div>

    {/* ROWS */}
    {documents.map((doc, i) => (
      <div
        key={i}
        className={`grid grid-cols-12 px-4 py-3 text-xs items-center border-b border-gray-100 dark:border-gray-700 ${
          i % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-900"
        }`}
      >

        {/* ✅ DOCUMENT NAME (STATIC ICON HERE) */}
        <div className="col-span-4 flex items-start gap-3">
          
          {/* SAME ICON FOR ALL */}
          <Image
            src="/img/compliance/8.png"
            alt="doc"
            width={16}
            height={16}
            className="mt-1"
          />

          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {doc.name}
            </p>
            <p className="text-gray-400 text-[11px]">
              {doc.sub}
            </p>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="col-span-2">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${doc.categoryColor}`}>
            {doc.category}
          </span>
        </div>

        {/* ✅ ACCESS (DYNAMIC ICONUSED HERE) */}
        <div className="col-span-2">
          <span className={`px-1 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1 ${doc.accessColor}`}>
            
            <Image
              src={doc.iconused}
              alt="access"
              width={10}
              height={10}
            />

            {doc.access}
          </span>
        </div>

        {/* DATE */}
        <div className="col-span- text-gray-500 dark:text-gray-300">
          {doc.date}
        </div>

        {/* ACTION */}
        <div className="col-span-2">
          <button
            className={`text-white text-[10px] font-bold px-3 py-1 rounded-full ${doc.actionColor}`}
          >
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
          <div className="bg-white p-4 rounded-xl dark:bg-gray-900 dark:text-white shadow-sm">
            <h3 className="font-bold text-sm mb-1">⬇️ Downloads</h3>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-3">
              Download all public compliance documents as a single package.
            </p>
            <button className="bg-green-500 hover:bg-green-600 transition-colors dark:bg-gray-900 dark:text-white text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Download All Public
            </button>
          </div>

<div>
<p className="flex items-center justify-center text-2xl"><Image 
    src="/img/compliance/9.png" 
    alt="doc" 
    width={28} 
    height={28} 
  />


</p>

<a className="flex items-center justify-center" href="">compliance@golitemobile.com</a>
</div>

          {/* Request Access */}
          <div className="bg-white p-4 rounded-xl shadow-sm dark:bg-gray-900 dark:text-white">
            <h3 className="font-bold text-sm mb-1">🔒 Request Access</h3>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-3">
             Need restricted or NDA-
required documents?
Submit a request.  
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 transition-colors text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Request Restricted Access
            </button>
          </div>

          {/* Stay Updated */}
          <div className="bg-[#0f1c2e] text-white p-4 rounded-xl">
            <h3 className="font-bold text-sm mb-1">🔔 Status Updates</h3>
            <p className="text-xs dark:bg-gray-900 dark:text-white text-gray-400 mb-3">
            Get notified of policy or
certification changes.
            </p>
            
            <button className="bg-green-500 hover:bg-green-600 transition-colors text-white w-full py-2.5 rounded-xl text-sm font-semibold">
              Subscribe 
            </button>
          </div>

        </aside>

      </div>
    </section>
  );
}
