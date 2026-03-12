"use client"
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function HelpSupport() {
    const [activeTab, setActiveTab] = useState("SIM Activation");

    const tabs = ["SIM Activation", "Rewards Program", "Switch & Save", "Travel Plans", "Business", "Device Protection"];

    const tabContent: Record<string, { title: string; content: React.ReactNode }> = {
        "SIM Activation": {
            title: "SIM Activation",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Getting Started with Your SIM</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Activating your GoLite Mobile SIM card is quick and easy. Follow these simple steps to get started:
                    </p>
                    <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300 mb-6">
                        <li><strong>Receive Your SIM:</strong> Your SIM card will arrive within 2-3 business days of order.</li>
                        <li><strong>Prepare Your Device:</strong> Ensure your device is compatible and unlocked.</li>
                        <li><strong>Insert the SIM:</strong> Gently insert the SIM card into your device's SIM slot.</li>
                        <li><strong>Activate Online:</strong> Visit our activation portal or call 1-800-801-9385.</li>
                        <li><strong>Confirm Installation:</strong> Follow the on-screen prompts and confirm your details.</li>
                        <li><strong>Start Using:</strong> Once confirmed, your service will be active within minutes.</li>
                    </ol>
                    <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                        <p className="text-gray-900 dark:text-white font-semibold mb-2">Need Help?</p>
                        <p className="text-gray-700 dark:text-gray-300">
                            If you experience any issues during activation, contact our support team at <a href="mailto:support@golitemobile.com" className="text-orange-600 hover:text-orange-700">support@golitemobile.com</a> or call us at <a href="tel:1-800-801-9385" className="text-orange-600 hover:text-orange-700">1-800-801-9385</a>.
                        </p>
                    </div>
                </div>
            )
        },
        "Rewards Program": {
            title: "Rewards Program",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Earn Rewards with Every Purchase</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Our Rewards Program is designed to give back to our loyal customers. Here's how it works:
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Earn Points</h4>
                            <p className="text-gray-700 dark:text-gray-300">Earn 1 point for every $1 spent on plans, add-ons, and device purchases.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Redeem Rewards</h4>
                            <p className="text-gray-700 dark:text-gray-300">Redeem your points for discounts, free months of service, or exclusive perks.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Special Bonuses</h4>
                            <p className="text-gray-700 dark:text-gray-300">Get extra points during special promotions and seasonal events.</p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Check your account dashboard to view your current points balance and available rewards.
                    </p>
                </div>
            )
        },
        "Switch & Save": {
            title: "Switch & Save",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Switch to GoLite and Save</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Switching to GoLite Mobile is simple, and we make it worthwhile. Here's what we offer for new customers:
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">No Switching Fees</h4>
                            <p className="text-gray-700 dark:text-gray-300">Keep your number and switch penalty-free.</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">First Month Free</h4>
                            <p className="text-gray-700 dark:text-gray-300">Get your first month of service completely free when you switch.</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Faster Speeds</h4>
                            <p className="text-gray-700 dark:text-gray-300">Experience faster data speeds at competitive prices.</p>
                        </div>
                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">24/7 Support</h4>
                            <p className="text-gray-700 dark:text-gray-300">Our support team helps you through every step of the switching process.</p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Ready to switch? Start the process on our website or call <a href="tel:1-800-801-9385" className="text-orange-600 hover:text-orange-700">1-800-801-9385</a> today!
                    </p>
                </div>
            )
        },
        "Travel Plans": {
            title: "Travel Plans",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Stay Connected While Traveling</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        GoLite Mobile offers affordable international travel plans so you can stay connected anywhere in the world.
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-orange-200 dark:border-gray-600">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Europe Travel Pass - $25/month</h4>
                            <p className="text-gray-700 dark:text-gray-300">Unlimited calls to Europe, 2GB data, valid in 30+ countries.</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-orange-200 dark:border-gray-600">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Asia Explorer - $19/month</h4>
                            <p className="text-gray-700 dark:text-gray-300">Unlimited texts, 1.5GB data, covers 20+ Asian destinations.</p>
                        </div>
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-orange-200 dark:border-gray-600">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Global Roaming - $15/month</h4>
                            <p className="text-gray-700 dark:text-gray-300">Pay-as-you-go rates, works in 190+ countries worldwide.</p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Add a travel plan to your account before you depart. No activation fees!
                    </p>
                </div>
            )
        },
        "Business": {
            title: "Business Solutions",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enterprise Solutions for Your Business</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        GoLite Mobile offers scalable solutions tailored to businesses of all sizes.
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Bulk Plans</h4>
                            <p className="text-gray-700 dark:text-gray-300">Special rates for businesses with 10+ lines. Volume discounts available.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Dedicated Account Manager</h4>
                            <p className="text-gray-700 dark:text-gray-300">Get personalized support and priority assistance for all your needs.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Centralized Billing</h4>
                            <p className="text-gray-700 dark:text-gray-300">Manage all lines from one account with easy invoicing.</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Network Solutions</h4>
                            <p className="text-gray-700 dark:text-gray-300">Enterprise-grade connectivity options available.</p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        Contact our Business Sales team at <a href="mailto:business@golitemobile.com" className="text-orange-600 hover:text-orange-700">business@golitemobile.com</a> for a customized quote.
                    </p>
                </div>
            )
        },
        "Device Protection": {
            title: "Device Protection",
            content: (
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Protect Your Device</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        GoLite Mobile's Device Protection plans help you avoid costly repairs or replacements.
                    </p>
                    <div className="space-y-4 mb-6">
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Accidental Damage Coverage</h4>
                            <p className="text-gray-700 dark:text-gray-300">Covers drops, spills, and other accidental damage.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Hardware Failures</h4>
                            <p className="text-gray-700 dark:text-gray-300">Coverage for unexpected hardware issues and defects.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Device Replacement</h4>
                            <p className="text-gray-700 dark:text-gray-300">Quick replacement service with minimal downtime.</p>
                        </div>
                        <div className="border-l-4 border-green-500 pl-4 py-2">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">No Deductibles</h4>
                            <p className="text-gray-700 dark:text-gray-300">Enjoy coverage with zero out-of-pocket deductibles.</p>
                        </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        <strong>Starting at just $9.99/month</strong> - Get peace of mind knowing your device is protected.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Add Device Protection to your account today through the GoLite Mobile app or website.
                    </p>
                </div>
            )
        }
    };

    return (
        <>
        <Header />
        <section className="w-full dark:bg-gray-900 bg-gray-100 h-80 mb-12 align-items-center justify-center flex flex-col position-relative">
            <h1 className="text-black dark:text-white text-4xl font-bold text-center">Help & Support</h1>
        </section>
        <div className="max-w-4xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">How can we help you?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            If you have any questions, issues, or need assistance with our services, please don't hesitate to reach out to our support team. We're here to help you with anything related to your account, billing, technical support, or general inquiries.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            You can contact us through the following channels:
          </p>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Phone:</strong> Call our support hotline at <a href="tel:1-800-801-9385" className="text-orange-600 hover:text-orange-700">1-800-801-9385</a> for immediate assistance.</li>
            <li><strong>Email:</strong> Send us an email at <a href="mailto:support@golitemobile.com" className="text-orange-600 hover:text-orange-700">support@golitemobile.com</a>.</li>
          </ul>
        </div>
        {/* Category Tabs */}
        <div className="flex justify-center mb-8 px-4">
          <div className="inline-flex bg-orange-500 rounded-full p-1 w-full max-w-6xl flex-wrap gap-1 justify-center">
            {tabs.map((tab) => (
                <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                    activeTab === tab ? "bg-white text-orange-500" : "text-white hover:bg-white hover:text-orange-500"
                }`}
                >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto p-4 mb-12">
          {tabContent[activeTab] && (
            <>
              {tabContent[activeTab].content}
            </>
          )}
        </div>
        <Footer />
        </>
    );
}