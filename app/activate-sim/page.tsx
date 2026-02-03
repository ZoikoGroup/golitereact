'use client';
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SimComparison() {
    const handlePSimClick = () => {
        window.location.href = '/psim-activate';
    };

    const handleESimClick = () => {
        window.location.href = '/esim-compatible';
    };
  return (
    <>
    <Header />
    <div  className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          SIM Card Types
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* pSIM Card */}
          <div onClick={handlePSimClick} className="cursor-pointer bg-white rounded-3xl border-4 border-orange-500 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-6">
              <svg className="w-32 h-32 text-orange-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="10" width="70" height="80" rx="8" stroke="currentColor" strokeWidth="3" fill="none"/>
                <path d="M25 15 L35 15 L40 20 L40 30 L25 30 Z" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="30" y="35" width="40" height="45" rx="4" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="35" y="40" width="30" height="8" rx="2" fill="currentColor"/>
                <rect x="35" y="52" width="30" height="8" rx="2" fill="currentColor"/>
                <rect x="35" y="64" width="30" height="8" rx="2" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-orange-600 mb-2">pSIM</h2>
          </div>

          {/* eSIM Card */}
          <div onClick={handleESimClick} className="cursor-pointer bg-white rounded-3xl border-4 border-orange-500 p-8 flex flex-col items-center justify-center hover:shadow-2xl transition-shadow duration-300">
            <div className="mb-6">
              <svg className="w-32 h-32 text-orange-500" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="25" width="60" height="50" rx="6" stroke="currentColor" strokeWidth="3" fill="none"/>
                <rect x="40" y="20" width="20" height="8" rx="2" fill="currentColor"/>
                <rect x="28" y="35" width="44" height="30" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none"/>
                <text x="50" y="53" fontSize="12" fill="currentColor" textAnchor="middle" fontWeight="bold">eSIM</text>
                <rect x="25" y="32" width="4" height="4" fill="currentColor"/>
                <rect x="71" y="32" width="4" height="4" fill="currentColor"/>
                <rect x="25" y="62" width="4" height="4" fill="currentColor"/>
                <rect x="71" y="62" width="4" height="4" fill="currentColor"/>
                <line x1="15" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="2"/>
                <line x1="75" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="50" x2="25" y2="50" stroke="currentColor" strokeWidth="2"/>
                <line x1="75" y1="50" x2="85" y2="50" stroke="currentColor" strokeWidth="2"/>
                <line x1="15" y1="60" x2="25" y2="60" stroke="currentColor" strokeWidth="2"/>
                <line x1="75" y1="60" x2="85" y2="60" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-orange-600 mb-2">eSIM</h2>
          </div>
        </div>

        
      </div>
    </div>
    <Footer />
    </>
  );
}
