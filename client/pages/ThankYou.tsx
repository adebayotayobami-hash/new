import { useNavigate } from "react-router-dom";

export default function ThankYou(props) {
  const navigate = useNavigate();

  const handleBookAgain = () => {
    window.location.reload(); // Reset the app
  };

  return (
    <div className="min-h-screen bg-ticket-primary text-white">
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
        <div className="flex gap-8">
          <span className="text-lg font-bold text-white/90">Get Support</span>
          <span className="text-lg font-bold text-white/90">Book now</span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* Logo decoration */}
        <div className="mb-8">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/32517cf9083990538089da73223e0188f0ea3284?width=850" 
            alt="Success decoration" 
            className="w-64 h-64 opacity-20"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-8 max-w-2xl">
          Thank you For your Booking
        </h1>

        {/* Description */}
        <p className="text-lg text-white/50 text-center mb-12 max-w-lg leading-relaxed">
          Your itinerary has been successfully generated and sent to your email. Please check your inbox, for your confirmation and travel document.
        </p>

        {/* Book Again Button */}
        <button
          onClick={handleBookAgain}
          className="bg-[#5BBD2E] text-white font-bold text-2xl px-16 py-6 rounded-full hover:bg-opacity-80 transition-colors"
        >
          Book again
        </button>
      </div>

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
                <div className="text-base font-semibold text-white">Onboardticket.com</div>
                <div className="text-xs opacity-80 mt-2 text-white">© 2025 — Copyright</div>
              </div>
              <p className="text-xs opacity-80 leading-relaxed text-white">
                OnboardTicket is committed to upholding the highest standards in compliance with international civil aviation regulations and ethical booking practices. This includes, but is not limited to, strict avoidance of misuse of booking classes, fraudulent activities, duplicate, speculative, or fictitious reservations. Users who engage in repeated cancellations without legitimate intent will be subject to monitoring, and may face usage restrictions or permanent bans from our platform.
              </p>
            </div>
            {/* About */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-white">
                About
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-white">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/about")}>Who We are ?</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/terms-conditions")}>Terms & Conditions</li>
              </ul>
            </div>
            {/* Get Help */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-white">
                Get Help
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-white">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/faq")}>FAQs</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/payment")}>Payment</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/contact")}>Contact Support 24/7</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-white">
                Follow US
              </h4>
              

              <div className="space-y-1 md:space-y-2">
                <h5 className="text-base md:text-lg font-bold text-white">
                  Stay in touch
                </h5>
                <p className="text-xs sm:text-sm font-semibold text-white">
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
