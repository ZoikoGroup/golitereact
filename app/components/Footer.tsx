import Link from "next/link";
export default function Footer() {
  const curyear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0e0e0e] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* LOGO + TEXT */}
          <div className="col-span-1">
            <a href="/" className="cursour-pointer">
              <img
                src="/img/footerLogo.png"
                alt="GoLite Logo"
                className="h-12 mb-4"
              />
            </a>
            <p className="text-sm leading-relaxed">
              America&apos;s fastest-growing eco-conscious mobile network provider.
              Experience the future of connectivity.
            </p>

            {/* SOCIAL ICONS */}
            <div className="flex gap-3 mt-5">

              <a href="https://www.facebook.com/profile.php?id=61571771820836" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
                {/* Facebook */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12C22 6.48 17.52 2 12 2S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99H8.08V12h2.36V9.8c0-2.33 1.39-3.62 3.52-3.62.72 0 1.48.12 1.48.12v2.04h-1.04c-1.03 0-1.35.64-1.35 1.3V12h2.52l-.4 2.89h-2.12v6.99C18.34 21.13 22 17 22 12z"/>
                </svg>
              </a>

              <a href="https://x.com/GoLiteMobile" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
                {/* Twitter (X) */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H22l-7.8 8.9L23 22h-6.3l-5-6.5L6 22H2l8.5-9.7L1 2h6.3l4.3 5.7L18.9 2z"/>
                </svg>
              </a>

              <a href="https://www.instagram.com/golitemobile" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
                {/* Instagram */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm6.5-.75a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                </svg>
              </a>

              <a href="https://www.linkedin.com/company/106413987/" target="_blank" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition">
                {/* LinkedIn */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.49 6 1.11 6 0 4.88 0 3.5 0 2.13 1.11 1 2.49 1c1.37 0 2.49 1.13 2.49 2.5zM.23 8.47h4.52V24H.23V8.47zM8.47 8.47h4.33v2.11h.06c.6-1.13 2.06-2.33 4.24-2.33C22.29 8.25 24 10.39 24 14.31V24h-4.52v-8.71c0-2.08-.04-4.76-2.9-4.76-2.9 0-3.35 2.26-3.35 4.6V24H8.47V8.47z"/>
                </svg>
              </a>

            </div>
          </div>
          <div className="col-span-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/all-plans" className="block">Plans &amp; Pricing</Link></li>
                <li>Shop Devices</li>
                <li><Link href="https://www.att.com/idpmaps/reseller" target="_blank" className="block">Coverage Map</Link></li>
                <li>Support Center</li>
                <li><Link href="/about-us" className="block">About Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="block">Blog</Link></li>
                <li><Link href="/activate-sim" className="block">Activate SIM</Link></li>
                <li>Help Center</li>
                <li>Community Forum</li>
                <li>Network Status</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/career" className="block">Careers</Link></li>
                <li>Press Kit</li>
                <li>Partners</li>
                <li><Link href="/sustainability" className="block">Sustainability</Link></li>
                <li><Link href="/contact-us" className="block">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy-policy" className="block">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="block">Terms of Service</Link></li>
                <li><Link href="/cookies-policy" className="block">Cookie Policy</Link></li>
                <li>Compliance</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 my-10"></div>

        {/* BOTTOM ROW */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {curyear} GoLite Mobile | GoLite Mobile is a subsidiary of Zoiko Communications Group Inc | Headquartered at 1401 21st Street, Suite R, Sacramento CA 95811. All rights reserved</p>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span>Download App:</span>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
              App Store
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">
              Google Play
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
