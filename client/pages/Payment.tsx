import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');

  return (
    <div className="min-h-screen bg-ob-background font-plus-jakarta">
      {/* Header */}
      <header className="container mx-auto px-4 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}> 
          <img 
            src="/onboard/result.png" 
            alt="OnboardTicket Logo" 
            className="h-[40px] sm:h-[59px] w-auto max-w-[200px] sm:max-w-[294px] cursor-pointer"
            loading="eager"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-bold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors">
            Get Support
          </button>
          <button className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-semibold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors">
            Book now
          </button>
        </nav>
      </header>

      {/* Payment Header Section */}
      <div className="bg-[#505BFB] py-12 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-8 lg:mb-12">
                Payment
              </h1>
              <div className="space-y-2 text-white">
                <div className="flex items-center gap-8">
                  <span className="text-lg lg:text-xl font-bold">TOTAL :</span>
                  <span className="text-xl lg:text-2xl font-bold">10$</span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-lg lg:text-xl font-bold">Passengers :</span>
                  <span className="text-xl lg:text-2xl font-bold">1</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 lg:mt-0">
              <button className="flex items-center gap-3 px-6 py-3 bg-[#C6FF9A] text-[#766868] font-bold text-lg rounded-full hover:bg-green-200 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back :
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-12 lg:py-20">
        <section className="bg-white/90 rounded-3xl p-8 lg:p-16 shadow-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ob-primary mb-8 leading-tight text-center">Payment</h1>
          <div className="text-[#23235B] text-lg lg:text-xl font-semibold leading-relaxed mb-8">
            {/* Payment content here, ensure text is dark and readable */}

            {/* Payment Method Tabs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {['Card', 'PayPal', 'Crypto'].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedPaymentMethod(method)}
                  className={`flex-1 px-6 py-4 rounded-lg border-2 font-bold text-lg transition-colors ${
                    selectedPaymentMethod === method
                      ? 'bg-white border-white text-[#848484] shadow-lg'
                      : 'bg-[#EBECFF] border-white text-[#848484] hover:bg-white'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full px-6 py-4 rounded-lg border border-white bg-white text-[#84848470] font-bold text-lg placeholder:text-[#84848470] focus:outline-none focus:ring-2 focus:ring-[#505BFB]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Name On the Card"
                  className="w-full px-6 py-4 rounded-lg border border-white bg-white text-[#84848470] font-bold text-lg placeholder:text-[#84848470] focus:outline-none focus:ring-2 focus:ring-[#505BFB]"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full px-6 py-4 rounded-lg border border-white bg-white text-[#84848470] font-bold text-lg placeholder:text-[#84848470] focus:outline-none focus:ring-2 focus:ring-[#505BFB]"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="flex-1 px-6 py-4 rounded-lg border border-white bg-white text-[#84848470] font-bold text-lg placeholder:text-[#84848470] focus:outline-none focus:ring-2 focus:ring-[#505BFB]"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="flex-1 px-6 py-4 rounded-lg border border-white bg-white text-[#84848470] font-bold text-lg placeholder:text-[#84848470] focus:outline-none focus:ring-2 focus:ring-[#505BFB]"
                />
              </div>

              {/* Pay Button */}
              <button className="w-full py-4 bg-[#505BFB] text-white font-bold text-xl rounded-xl hover:bg-blue-600 transition-colors shadow-lg mt-8">
                PAY : 10$
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Decorative Cloud Elements */}
      <div className="hidden lg:block fixed bottom-0 right-0 opacity-13 pointer-events-none">
        <div className="w-[829px] h-[391px] relative">
          <svg 
            className="w-full h-full" 
            viewBox="0 0 273 392" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_cloud_1)">
              <path 
                d="M-486.46 346.3C-466.57 356.83 -443.2 361.19 -419.9 360.41C-396.15 359.62 -374.51 353.02 -354.08 343.07C-342.62 337.49 -329.97 333.07 -316.64 336.48C-304.98 339.46 -295.92 346.81 -285.74 352.12C-247.5 372.08 -199.58 377.42 -156.32 367.62C-145.57 365.18 -135.15 361.89 -125.27 357.54C-114.22 352.68 -104.21 346.3 -93.08 341.57C-80.77 336.34 -68.01 333.74 -54.25 335.38C-40.9 336.97 -28.64 341.79 -16.06 345.63C25.77 358.41 73.43 368.04 117.66 358.93C127.97 356.81 137.86 353.72 147.13 349.33C156.92 344.69 165.08 338.69 173.45 332.42C182.59 325.57 192.19 319.09 203.93 315.79C214.23 312.9 228.17 314.89 236.97 308.82C244.09 303.91 246.54 295.24 248.1 287.96C250.16 278.35 250.43 268.29 250.33 258.55C250.13 237.55 246.15 215.99 235.72 196.79C216.9 162.16 175.98 135.25 129.36 139.84C124.65 140.3 119.62 136.52 118.56 132.87C111.99 110.12 100.71 88.62 84.48 69.63C57.75 38.36 15.77 16.25 -30.75 19.02C-70.5 21.38 -111.33 41.67 -123.26 75.34C-126.16 83.53 -138.31 84.24 -143.73 77.61C-156.95 61.43 -177.51 50.79 -199.72 45.81C-242.42 36.24 -287.55 47.26 -318.11 74.11C-347.89 100.28 -362.2 136.79 -362.57 172.81C-359.04 174.35 -356.56 177.15 -356.56 181.02C-356.56 184.55 -359.43 188.39 -363.38 189.9C-365.36 192.87 -369.38 194.93 -373.33 194.93C-377.87 194.93 -381.42 192.68 -383.23 189.54C-388 189.37 -392.78 189.31 -397.55 189.38C-434.54 189.98 -475.2 197.96 -503.43 219.43C-533.01 241.92 -541.37 276.63 -525.3 307.47C-517.11 323.19 -503.71 337.14 -486.46 346.27V346.3Z" 
                fill="#C7E9F4"
              />
            </g>
            <defs>
              <clipPath id="clip0_cloud_1">
                <rect width="591.98" height="398.88" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Copyright */}
            <div className="space-y-4">
              <div>
                <img 
                  src="/onboard/result.png" 
                  alt="OnboardTicket Logo" 
                  className="w-40 h-10 mb-4 cursor-pointer"
                  onClick={() => navigate("/")}
                />
                <hr className="border-white mb-4" />
                <div className="text-base font-semibold text-[#3150DA]">Onboardticket.com</div>
                <div className="text-xs opacity-80 mt-2 text-black">© 2025 — Copyright</div>
              </div>
              <p className="text-xs opacity-80 leading-relaxed text-black">
                OnboardTicket is committed to upholding the highest standards in compliance with international civil aviation regulations and ethical booking practices. This includes, but is not limited to, strict avoidance of misuse of booking classes, fraudulent activities, duplicate, speculative, or fictitious reservations. Users who engage in repeated cancellations without legitimate intent will be subject to monitoring, and may face usage restrictions or permanent bans from our platform.
              </p>
            </div>
            {/* About */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                About
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-black">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/about")}>Who We are ?</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/terms-conditions")}>Terms & Conditions</li>
              </ul>
            </div>
            {/* Get Help */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                Get Help
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-black">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/faq")}>FAQs</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/payment")}>Payment</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/contact")}>Contact Support 24/7</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                Follow US
              </h4>
              <div className="space-y-1 md:space-y-2">
                <h5 className="text-base md:text-lg font-bold text-[#3150DA]">
                  Stay in touch
                </h5>
                <p className="text-xs sm:text-sm font-semibold text-black">
                  Blog
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
