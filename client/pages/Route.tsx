import { useState } from "react";
import { ArrowRight, Plane, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";

interface RouteProps {
  onNext: () => void;
  currentStep: string;
  onNavigate: (step: any) => void;
}

export default function Route({ onNext, currentStep, onNavigate }: RouteProps) {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("01/05/2026");
  const [returnDate, setReturnDate] = useState("01/05/2026");

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
            <button className="text-2xl font-bold">Route</button>
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
            <button
              onClick={() => onNavigate("confirmation")}
              className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
            >
              Confirmation
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-16">
          <div className="flex items-center">
            <div className="h-1 bg-ticket-accent w-56"></div>
            <div className="h-1 bg-ticket-secondary flex-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Side - Form */}
          <div className="space-y-8">
            {/* Trip Type Selection */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-[#F6F6FF]">Route</h2>
              
              <div className="flex gap-0 mb-8 max-w-md">
                <button
                  onClick={() => setTripType("oneway")}
                  className={`flex-1 py-3 px-6 text-sm font-semibold rounded-l-lg transition-colors ${
                    tripType === "oneway" 
                      ? "bg-ticket-dark text-white" 
                      : "bg-ticket-secondary text-white"
                  }`}
                >
                  One way
                </button>
                <button
                  onClick={() => setTripType("roundtrip")}
                  className={`flex-1 py-3 px-6 text-sm font-semibold rounded-r-lg transition-colors ${
                    tripType === "roundtrip" 
                      ? "bg-ticket-dark text-white" 
                      : "bg-ticket-secondary text-white"
                  }`}
                >
                  Round Trip
                </button>
              </div>
            </div>

            {/* Route Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#F6F6FF]">Route</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <select
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-4 text-gray-600 appearance-none pr-10"
                  >
                    <option value="">From</option>
                    <option value="chicago">Chicago Rockford (RFD)</option>
                    <option value="paris">Paris Orly (ORY)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                </div>
                
                <div className="bg-ticket-secondary rounded p-2">
                  <Plane className="w-4 h-4 text-white" />
                </div>
                
                <div className="flex-1 relative">
                  <select
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-4 text-gray-600 appearance-none pr-10"
                  >
                    <option value="">To</option>
                    <option value="paris">Paris Orly (ORY)</option>
                    <option value="chicago">Chicago Rockford (RFD)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#F6F6FF]">Date</h3>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <DatePicker
                    value={departureDate}
                    onChange={setDepartureDate}
                    placeholder="Departure Date"
                  />
                </div>

                {tripType === "roundtrip" && (
                  <>
                    <div className="bg-ticket-secondary rounded p-2 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" viewBox="0 0 19 15" fill="currentColor">
                        <path d="M19 4.14235V15.0009H8.12981C7.78726 14.8159 7.65846 14.5352 7.6813 14.1517C7.70596 13.7347 7.68587 13.3142 7.68678 12.8963C7.68861 12.215 7.85394 12.0525 8.54817 12.0516C10.6948 12.0507 12.8405 12.0534 14.9872 12.0498C15.6924 12.0489 15.9874 11.7601 15.9901 11.0697C15.9947 9.93352 15.992 8.7973 15.9911 7.66019C15.9911 6.74057 15.7353 6.48788 14.7999 6.48697C12.1518 6.48607 9.50274 6.48697 6.85462 6.48697C6.70846 6.48697 6.56231 6.48697 6.38053 6.48697C6.38053 7.47338 6.39058 8.39841 6.37231 9.32345C6.36774 9.52921 6.26178 9.73317 6.2024 9.93713C6.00692 9.84688 5.78221 9.79183 5.6187 9.66187C3.89957 8.30275 2.18774 6.9355 0.480481 5.56194C0.297788 5.41484 0.158942 5.21449 0 5.03941C0 4.97984 0 4.91938 0 4.85982C0.176298 4.68022 0.338894 4.48439 0.531635 4.32284C0.97101 3.95554 1.425 3.60448 1.87351 3.2471C3.14687 2.23001 4.41659 1.20931 5.69909 0.203056C5.83793 0.0938572 6.04163 0.0658805 6.21519 0C6.27 0.175982 6.36683 0.351062 6.37322 0.528849C6.3924 1.15517 6.38053 1.78238 6.38053 2.4096C6.38053 2.79225 6.38053 3.174 6.38053 3.59274C6.62351 3.59274 6.80346 3.59274 6.98341 3.59274C10.7067 3.59274 14.4309 3.59726 18.1541 3.58643C18.5926 3.58552 18.8822 3.71638 19 4.14235Z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <DatePicker
                        value={returnDate}
                        onChange={setReturnDate}
                        placeholder="Return Date"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Navigation Button */}
            <div className="flex justify-start">
              <button
                onClick={onNext}
                className="bg-ticket-accent rounded-full w-19 h-10 flex items-center justify-center hover:bg-opacity-80 transition-colors"
              >
                <ArrowRight className="w-6 h-6 text-black" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
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
