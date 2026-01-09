"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Clock, Layers, PlusCircle , FileText, User,Check  } from 'lucide-react';

import { encodeIds,encodeString } from "../utils/helper";

const encodedIds = encodeString(["test_1","test"]);

fetch(`http://34.100.195.29/api/v1/plans/type?slug=${encodedIds}`)
  .then(res => res.json())
  .then(data => console.log(data));

  console.log("Encoded IDs:", encodedIds);
const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Premium Service Without the Premium Price",
      description: "Get the same nationwide coverage as the big carriers at a fraction of the cost. We believe premium service shouldn't come with a premium price tag."
    },
    {
      icon: <Layers className="w-12 h-12" />,
      title: "Total Transparency, Zero Hidden Fees",
      description: "No fine print. No hidden charges. What you see is what you pay. We're committed to straightforward pricing and honest communication."
    },
    {
      icon: <PlusCircle  className="w-12 h-12" />,
      title: "Sustainability That Creates Real Impact",
      description: "Every plan supports tree-planting campaigns, e-waste recycling, and eco-friendly packaging. Feel good knowing your mobile service makes a difference."
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Smarter, Personalized Plans with AI",
      description: "Our AI-driven tools analyze your usage to recommend the plan that perfectly matches your needs and budget. No more overpaying for data you don't use."
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Seamless, Hassle-Free Experience",
      description: "Easy-to-use app, fast activation, and 24/7 customer support. We make switching carriers effortless, and seamless. VOIP-compatible for international use."
    },
    {
      icon: <User className="w-12 h-12" />,
      title: "A Community That Gives Back",
      description: "Join a tribe of socially-conscious, forward-thinking customers committed to making a positive impact. Together, we can create meaningful, lasting change."
    }
  ];
const team = [
    {
      name: "LENNOX MCLEOD",
      role: "Founder and CEO"
    },
    {
      name: "MARCEL JONES",
      role: "Director of Marketing"
    },
    {
      name: "JUNIOR TAYLOR",
      role: "Director of Operations & Logistics"
    }
  ];
const missions = [
    "We fight for the environment - in-house events like those promoting our footprint recycling program.",
    "We fight for price equity - affordable, truly quality plans for families facing financial stress.",
    "We fight to meet need - Go-Bag Rescue Missions and more to save in the impact."
];

export default function AboutUs() {
  return (
    <>
        <Header />
    <div className="min-h-screen bg-gradient-to-b from-[#FF6B35] via-[#FF6B35] via-[30%] to-white flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Heading */}
        <h1 className="text-white text-5xl md:text-6xl font-bold text-center mb-8 tracking-wide">
          ABOUT US
        </h1>
        
        {/* Description Text */}
        <p className="text-white text-center text-lg md:text-xl leading-relaxed mb-12 max-w-5xl mx-auto">
          At <span className="font-semibold">GoLite Mobile</span>, we believe staying connected should be simple, affordable, and sustainable - without the headaches of overpriced plans, hidden fees, and complicated contracts. We're not just another mobile provider - we're a movement toward transparency, fairness, and sustainability. With fast and reliable 4G coverage, unlimited data plans, and flexible, budget-friendly options, GoLite is designed for real people who want more from their mobile service.
        </p>
        
        {/* Image Container */}
        <div className="bg-white rounded-2xl shadow-[5px_14px_16px_rgba(0,0,0,0.31)] overflow-hidden">
          <div className="relative bg-orange-300">
            
            {/* If you have the actual image, uncomment and use this: */}
            <img 
              src="img/about-banner.png" 
              alt="Diverse group of people using mobile phones"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
          WHY CHOOSE GOLITE?
        </h2>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border-2 border-[#e8e7e7] rounded-xl rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 flex flex-col items-center text-center"
            >
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white mb-6">
                {feature.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-center text-gray-900 mb-16 px-4">
          MEET THE VISIONARIES DRIVING GOLITE MOBILE FORWARD
        </h2>
        
        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {team.map((member, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg p-8 flex flex-col items-center"
            >
              {/* Profile Image Placeholder with Decorative Line */}
              <div className="relative w-full mb-8">
                <div className="w-32 h-32 mx-auto bg-white rounded-full border-4 border-gray-200 flex items-center justify-center">
                  {/* Placeholder for profile image */}
                  <div className="text-gray-300">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
               
              </div>
              
              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {member.name}
              </h3>
              
              {/* Role */}
              <p className="text-gray-600 text-center">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="text-orange-500 font-semibold tracking-wide uppercase text-sm">
              OUR STORY
            </div>
            
            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              More Than a Network, A Mission
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              GoLite Mobile was created to fill a void for honest and people-first service in the telecommunications industry.
            </p>
            
            {/* Mission Points */}
            <div className="space-y-4 pt-4">
              {missions.map((mission, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Bottom Text */}
            <p className="text-gray-600 leading-relaxed pt-4">
              We are proud to donate a portion of our revenue into the common as a symbol of our commitment to making the world more ethical and sustainable.
            </p>
          </div>
          
          {/* Right Image */}
          <div className="space-y-6">
            {/* <div className="rounded-2xl overflow-hidden shadow-2xl"> */}
              {/* <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-400 to-blue-600"> */}
                
                
                {/* If you have the actual image, uncomment and use this: */}
                <img 
                  src="/img/about-golite.png" 
                  alt="Scuba diver holding GoLite Mobile sign underwater"
                  className="w-full h-full object-cover"
                />
              {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}