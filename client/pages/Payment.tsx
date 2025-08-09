import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');

  return (
    <div className=" min-h-screen bg-ob-background font-plus-jakarta">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
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
          <button
            className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-bold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate("/contact")}
          >
            Get Support
          </button>
          <button
            className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-semibold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => navigate("/userform")}
          >
            Book now
          </button>
        </nav>
      </header>

      {/* Payment Header Section */}
      <div className="bg-[#505BFB] py-12 lg:py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36">
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

    

      {/* Footer */}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
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
            <div className="space-y-2 md:space-y-4 flex flex-col items-start md:items-center justify-center text-left">
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
            <div className="space-y-2 md:space-y-4 flex flex-col items-start md:items-center justify-center text-left">
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
            <div className="space-y-2 md:space-y-4 flex flex-col items-start md:items-center justify-center text-left">
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
