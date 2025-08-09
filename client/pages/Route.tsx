import { useState } from "react";
import { ArrowRight, Plane, ChevronDown } from "lucide-react";
import DatePicker from "../components/DatePicker";

interface RouteProps {
  onNext: () => void;
  currentStep: string;
  onNavigate: (step: any) => void;
}

export default function Route({ onNext, currentStep, onNavigate }: RouteProps) {
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("01/05/2026");
  const [returnDate, setReturnDate] = useState("01/05/2026");

  return (
    <div className="min-h-screen bg-ticket-primary text-white">
      {/* Header */}
      <header className="px-4 sm:px-8 lg:px-36 pt-12 pb-8">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/546fa6d584538b821a4ae9a72451f346c3dd5fdd?width=588" 
          alt="OnboardTicket" 
          className="h-15 w-auto"
        />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Copyright */}
            <div className="space-y-4">
              <div>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/0de0d405a7e4c963b59c0e5919425a421fc1cc58?width=494" 
                  alt="OnboardTicket Logo" 
                  className="w-16 h-16 mb-4"
                />
                <hr className="border-white mb-4" />
                <div className="text-base font-semibold">Onboardticket.com</div>
                <div className="text-xs opacity-50 mt-2">© 2025 — Copyright</div>
              </div>
              <p className="text-xs opacity-50 leading-relaxed">
                OnboardTicket is committed to upholding the highest standards in compliance with international civil aviation regulations and ethical booking practices. This includes, but is not limited to, strict avoidance of misuse of booking classes, fraudulent activities, duplicate, speculative, or fictitious reservations. Users who engage in repeated cancellations without legitimate intent will be subject to monitoring, and may face usage restrictions or permanent bans from our platform.
              </p>
            </div>

            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-4">About</h3>
              <ul className="space-y-2 text-sm font-semibold">
                <li>Who We are ?</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            {/* Get Help */}
            <div>
              <h3 className="text-lg font-bold mb-4">Get Help</h3>
              <ul className="space-y-2 text-sm font-semibold">
                <li>FAQs</li>
                <li>Reviews</li>
                <li>Contact Support 24/7</li>
              </ul>
            </div>

            {/* Follow US */}
            <div>
              <h3 className="text-lg font-bold mb-4">Follow US</h3>
              <div className="flex gap-4 mb-4">
                <svg className="w-7 h-7" viewBox="0 0 28 28" fill="white">
                  <path d="M20.2299 6.36998C19.953 6.36998 19.6823 6.45209 19.4521 6.60592C19.2219 6.75976 19.0424 6.97841 18.9365 7.23422C18.8305 7.49004 18.8028 7.77153 18.8568 8.04311C18.9108 8.31468 19.0442 8.56414 19.24 8.75993C19.4358 8.95572 19.6852 9.08906 19.9568 9.14308C20.2284 9.1971 20.5099 9.16937 20.7657 9.06341C21.0215 8.95745 21.2401 8.77801 21.394 8.54778C21.5478 8.31755 21.6299 8.04687 21.6299 7.76998C21.6299 7.39868 21.4824 7.04258 21.2199 6.78003C20.9573 6.51748 20.6012 6.36998 20.2299 6.36998ZM25.5966 9.19331C25.5739 8.22533 25.3926 7.26762 25.0599 6.35831C24.7633 5.5803 24.3016 4.8758 23.7066 4.29331C23.1289 3.69531 22.4227 3.23652 21.6416 2.95165C20.7347 2.60883 19.7759 2.42339 18.8066 2.40331C17.5699 2.33331 17.1733 2.33331 13.9999 2.33331C10.8266 2.33331 10.4299 2.33331 9.19325 2.40331C8.22393 2.42339 7.26515 2.60883 6.35825 2.95165C5.57854 3.2394 4.87301 3.6978 4.29325 4.29331C3.69525 4.87102 3.23646 5.57716 2.95159 6.35831C2.60877 7.26521 2.42333 8.22399 2.40325 9.19331C2.33325 10.43 2.33325 10.8266 2.33325 14C2.33325 17.1733 2.33325 17.57 2.40325 18.8066C2.42333 19.776 2.60877 20.7347 2.95159 21.6416C3.23646 22.4228 3.69525 23.1289 4.29325 23.7066C4.87301 24.3022 5.57854 24.7606 6.35825 25.0483C7.26515 25.3911 8.22393 25.5766 9.19325 25.5966C10.4299 25.6666 10.8266 25.6666 13.9999 25.6666C17.1733 25.6666 17.5699 25.6666 18.8066 25.5966C19.7759 25.5766 20.7347 25.3911 21.6416 25.0483C22.4227 24.7634 23.1289 24.3046 23.7066 23.7066C24.3042 23.1263 24.7663 22.4212 25.0599 21.6416C25.3926 20.7323 25.5739 19.7746 25.5966 18.8066C25.5966 17.57 25.6666 17.1733 25.6666 14C25.6666 10.8266 25.6666 10.43 25.5966 9.19331ZM23.4966 18.6666C23.4881 19.4072 23.354 20.141 23.0999 20.8366C22.9136 21.3444 22.6144 21.8031 22.2249 22.1783C21.8465 22.5639 21.3887 22.8625 20.8833 23.0533C20.1876 23.3074 19.4538 23.4415 18.7133 23.45C17.5466 23.5083 17.1149 23.52 14.0466 23.52C10.9783 23.52 10.5466 23.52 9.37992 23.45C8.61096 23.4644 7.84528 23.346 7.11658 23.1C6.63333 22.8994 6.1965 22.6016 5.83325 22.225C5.44602 21.8502 5.15057 21.391 4.96992 20.8833C4.68508 20.1777 4.5271 19.4272 4.50325 18.6666C4.50325 17.5 4.43325 17.0683 4.43325 14C4.43325 10.9316 4.43325 10.5 4.50325 9.33331C4.50848 8.57621 4.64669 7.82592 4.91159 7.11665C5.11697 6.62421 5.43223 6.18525 5.83325 5.83331C6.1877 5.43218 6.62575 5.11359 7.11658 4.89998C7.82773 4.64336 8.57725 4.50924 9.33325 4.50331C10.4999 4.50331 10.9316 4.43331 13.9999 4.43331C17.0683 4.43331 17.4999 4.43331 18.6666 4.50331C19.4072 4.51181 20.1409 4.64593 20.8366 4.89998C21.3668 5.09674 21.8426 5.41663 22.2249 5.83331C22.6072 6.19169 22.906 6.62983 23.0999 7.11665C23.3592 7.82707 23.4934 8.57706 23.4966 9.33331C23.5549 10.5 23.5666 10.9316 23.5666 14C23.5666 17.0683 23.5549 17.5 23.4966 18.6666ZM13.9999 8.01498C12.8167 8.01729 11.6607 8.37026 10.678 9.0293C9.69532 9.68834 8.93003 10.6239 8.47882 11.7177C8.02762 12.8115 7.91076 14.0145 8.14301 15.1747C8.37526 16.3349 8.94619 17.4003 9.78367 18.2361C10.6212 19.072 11.6876 19.6408 12.8483 19.8708C14.0089 20.1008 15.2117 19.9816 16.3046 19.5283C17.3976 19.0749 18.3316 18.3078 18.9887 17.3239C19.6459 16.3399 19.9966 15.1832 19.9966 14C19.9981 13.2126 19.844 12.4327 19.543 11.7051C19.2421 10.9775 18.8002 10.3166 18.2429 9.76037C17.6856 9.20415 17.0239 8.7636 16.2957 8.46406C15.5675 8.16452 14.7873 8.0119 13.9999 8.01498ZM13.9999 17.885C13.2315 17.885 12.4804 17.6571 11.8415 17.2302C11.2026 16.8033 10.7047 16.1966 10.4106 15.4867C10.1166 14.7768 10.0397 13.9957 10.1896 13.2421C10.3395 12.4884 10.7095 11.7962 11.2528 11.2529C11.7961 10.7095 12.4884 10.3395 13.242 10.1896C13.9956 10.0397 14.7768 10.1167 15.4866 10.4107C16.1965 10.7048 16.8033 11.2027 17.2302 11.8416C17.6571 12.4805 17.8849 13.2316 17.8849 14C17.8849 14.5102 17.7844 15.0154 17.5892 15.4867C17.394 15.9581 17.1078 16.3863 16.747 16.7471C16.3863 17.1078 15.958 17.394 15.4866 17.5893C15.0153 17.7845 14.5101 17.885 13.9999 17.885Z"/>
                </svg>
                <img 
                  src="https://api.builder.io/api/v1/image/assets/TEMP/46df664da4e9fcc040c23fa285bae6d60c5beeb6?width=46" 
                  alt="Social" 
                  className="w-6 h-6"
                />
              </div>
              <h4 className="text-lg font-bold">Stay in touch</h4>
              <div className="text-sm font-semibold mt-2">Blog</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
