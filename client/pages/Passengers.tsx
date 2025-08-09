import { useState } from "react";
import { Plus, ArrowRight, Mail } from "lucide-react";

interface PassengersProps {
  onNext: () => void;
  onBack: () => void;
  currentStep: string;
  onNavigate: (step: any) => void;
}

export default function Passengers({ onNext, onBack, currentStep, onNavigate }: PassengersProps) {
  const [selectedTitle, setSelectedTitle] = useState("Mr");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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
            <button
              onClick={() => onNavigate("route")}
              className="text-2xl font-bold text-white/60 hover:text-white transition-colors"
            >
              Route
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-2xl font-bold">Passangers</button>
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
            <div className="h-1 bg-ticket-secondary flex-1"></div>
            <div className="h-1 bg-ticket-accent w-56"></div>
            <div className="h-1 bg-ticket-secondary flex-1"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Side - Form */}
          <div className="space-y-8">
            {/* Passenger Section */}
            <div>
              <h2 className="text-2xl font-bold mb-8 text-[#F6F6FF]">Passanger</h2>
              
              {/* Contact Email */}
              <div className="mb-6">
                <div className="bg-ticket-secondary rounded-lg p-4 relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 opacity-60" />
                  <input
                    type="email"
                    placeholder="Contact Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent pl-12 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Title Selection - Fixed styling to match prototype */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {["Mr", "Ms", "Mrs"].map((title, index) => (
                  <button
                    key={title}
                    onClick={() => setSelectedTitle(title)}
                    className={`h-15 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center ${
                      selectedTitle === title 
                        ? "bg-ticket-dark text-white" 
                        : "bg-ticket-light text-white/55"
                    }`}
                  >
                    {title}
                  </button>
                ))}
                {/* Empty slots - Fixed styling to match prototype */}
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-15 rounded-lg bg-ticket-light"></div>
                ))}
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-ticket-secondary rounded-lg p-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
                <div className="bg-ticket-secondary rounded-lg p-4">
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Add Passenger Button */}
              <div className="bg-ticket-secondary rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-opacity-80 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-semibold text-white/55">Add Passanger</span>
              </div>
            </div>

            {/* Navigation Button - Fixed styling to match prototype */}
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
