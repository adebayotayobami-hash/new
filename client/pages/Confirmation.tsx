import { useState } from "react";
import { ArrowRight, Mail, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ConfirmationProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: string;
  onNavigate: (step: any) => void;
}

export default function Confirmation({ onNext, onBack, currentStep, onNavigate }: ConfirmationProps) {
  const navigate = useNavigate();
  const [acceptTerms, setAcceptTerms] = useState(false);

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
      </header>

      <div className="px-4 sm:px-8 lg:px-36">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-12">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("route")}
              className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
            >
              Route
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate("passengers")}
              className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
            >
              Passangers
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-2xl font-bold">Confirmation</button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex items-center">
            <div className="h-1 bg-ticket-secondary flex-1"></div>
            <div className="h-1 bg-ticket-accent w-56"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Side - Form */}
          <div className="space-y-8">
            {/* Passenger Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-[#F6F6FF]">Passanger</h2>
              
              <div className="bg-ticket-secondary rounded-lg p-6 space-y-4">
                <div className="text-sm font-semibold text-white/55 mb-2">
                  Passenger Contact
                </div>
                
                <div className="grid grid-cols-4 gap-3">
                  <div className="bg-[#606AFB] rounded-lg p-3 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white/55">Mr</span>
                  </div>
                  <div className="bg-[#606AFB] rounded-lg p-3 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white/55">First Name</span>
                  </div>
                  <div className="bg-[#606AFB] rounded-lg p-3 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white/55">Last Name</span>
                  </div>
                  <div></div>
                </div>
                
                <div className="bg-ticket-secondary rounded-lg p-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-white/60" />
                  <span className="text-sm font-semibold text-white/55">Contact Email</span>
                </div>
              </div>
            </div>

            {/* Route Information */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-[#F6F6FF]">Route</h2>
              
              <div className="bg-ticket-secondary rounded-lg p-6">
                <div className="text-sm font-semibold text-white/55 mb-4">
                  Passenger Contact
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="bg-[#606AFB] rounded-lg p-3 flex-1 text-center">
                    <span className="text-sm font-semibold text-white">Chicago Rockford (RFD)</span>
                  </div>
                  <div className="bg-[#606AFB] rounded p-2">
                    <img 
                      src="https://api.builder.io/api/v1/image/assets/TEMP/9cf21d37d08a31eabcbc3752b88f262a59322ba1?width=34" 
                      alt="airplane" 
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="bg-[#606AFB] rounded-lg p-3 flex-1 text-center">
                    <span className="text-sm font-semibold text-white">Paris Orly (ORY)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-3">
              <div 
                className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  acceptTerms ? 'bg-white border-white' : 'bg-transparent border-white'
                }`}
                onClick={() => setAcceptTerms(!acceptTerms)}
              >
                {acceptTerms && <Check className="w-3 h-3 text-black" />}
              </div>
              <span className="text-sm font-semibold text-white/55">
                I accept the Terms and Conditions and the Privacy Policy
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onBack}
                className="bg-ticket-light rounded-full px-8 py-3 flex items-center justify-center hover:bg-opacity-80 transition-colors"
              >
                <span className="text-sm font-semibold text-[#F6F6FF]">Back</span>
              </button>
              <button
                onClick={onNext}
                disabled={!acceptTerms}
                className={`rounded-full px-8 py-3 flex items-center justify-center transition-colors ${
                  acceptTerms 
                    ? 'bg-ticket-accent text-black hover:bg-opacity-80' 
                    : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                }`}
              >
                <span className="text-sm font-semibold">Confirm</span>
              </button>
            </div>
          </div>

          {/* Right Side - Ticket Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-sm">
              {/* Ticket Header */}
              <div className="bg-ticket-darker h-16 -mx-8 -mt-8 mb-6 flex items-center justify-center rounded-t-lg">
                <ArrowRight className="w-8 h-8 text-black" />
              </div>

              {/* Route Information */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">(RFD)</div>
                    <div className="text-xs font-semibold text-ticket-gray">Chicago Rockford</div>
                    <div className="text-xs text-ticket-gray-light">20/05/205</div>
                  </div>
                  <ArrowRight className="w-8 h-8 text-black" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">(ORY)</div>
                    <div className="text-xs font-semibold text-ticket-gray">Paris Orly</div>
                    <div className="text-xs text-ticket-gray-light">30/05/205</div>
                  </div>
                </div>
              </div>

              {/* Passenger Info */}
              <div className="mb-6">
                <div className="text-sm font-semibold text-ticket-text mb-1">Passanger / 1</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-ticket-text font-semibold">Passanger</div>
                    <div className="font-bold">Mr.Lorem abc</div>
                  </div>
                  <div>
                    <div className="text-ticket-text font-semibold">Flight</div>
                    <div className="font-bold">$123CD</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                  <div>
                    <div className="text-ticket-text font-semibold">Seat</div>
                    <div className="font-bold">20C</div>
                  </div>
                  <div>
                    <div className="text-ticket-text font-semibold">Departure</div>
                    <div className="font-bold">7:30 AM</div>
                  </div>
                </div>
              </div>

              {/* Barcode */}
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {[...Array(15)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1 bg-black" 
                      style={{ 
                        height: `${Math.random() * 20 + 10}px` 
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
