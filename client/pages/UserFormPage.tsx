import { useState } from "react";
import { ArrowRight, ChevronDown, Plane } from "lucide-react";


export default function Index() {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('oneWay');
  const [fromLocation, setFromLocation] = useState('From');
  const [toLocation, setToLocation] = useState('To');
  const [departureDate, setDepartureDate] = useState('01/05/2026');
  const [returnDate, setReturnDate] = useState('01/05/2026');

  return (
    <div className="min-h-screen bg-brand-primary px-4 md:px-16 pt-4 md:pt-16">
      {/* Header */}
      <div className="pt-6 md:pt-12 pb-4 md:pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/546fa6d584538b821a4ae9a72451f346c3dd5fdd?width=588"
            alt="OnboardTicket Logo"
            className="h-10 md:h-15 w-auto"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <div className="flex items-center gap-4 md:gap-8 overflow-x-auto">
          {/* Route Tab - Active */}
          <div className="flex flex-col min-w-fit">
            <h2 className="font-jakarta font-bold text-lg md:text-2xl text-white mb-2 md:mb-4">Route</h2>
            <div className="w-32 md:w-56 h-1 bg-brand-accent rounded-full"></div>
          </div>

          {/* Passengers Tab */}
          <div className="flex flex-col min-w-fit">
            <h2 className="font-jakarta font-bold text-lg md:text-2xl text-white opacity-90">Passengers</h2>
            <div className="w-32 md:w-56 h-1 bg-brand-secondary rounded-full"></div>
          </div>

          {/* Confirmation Tab */}
          <div className="flex flex-col min-w-fit">
            <h2 className="font-jakarta font-bold text-lg md:text-2xl text-white opacity-90">Confirmation</h2>
            <div className="w-32 md:w-56 h-1 bg-brand-secondary rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Form */}
          <div className="space-y-6 md:space-y-8">
            {/* Trip Type Selection */}
            <div className="flex items-center">
              <div className="flex bg-brand-secondary rounded-lg p-1">
                <button
                  onClick={() => setTripType('oneWay')}
                  className={`px-6 py-3 rounded-md font-jakarta font-bold text-sm transition-colors ${
                    tripType === 'oneWay' 
                      ? 'bg-brand-active text-white' 
                      : 'text-white hover:bg-brand-active/50'
                  }`}
                >
                  One way
                </button>
                <button
                  onClick={() => setTripType('roundTrip')}
                  className={`px-6 py-3 rounded-md font-jakarta font-bold text-sm transition-colors ${
                    tripType === 'roundTrip' 
                      ? 'bg-brand-active text-white' 
                      : 'text-white hover:bg-brand-active/50'
                  }`}
                >
                  Round Trip
                </button>
              </div>
            </div>

            {/* Route Section */}
            <div>
              <h3 className="font-jakarta font-bold text-xl md:text-2xl text-white/95 mb-4 md:mb-6">Route</h3>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* From Dropdown */}
                <div className="relative w-full sm:flex-1">
                  <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-3 h-12 cursor-pointer">
                    <span className="font-roboto text-gray-600">{fromLocation}</span>
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  </div>
                </div>

                {/* Airplane Icon */}
                <div className="bg-brand-secondary rounded p-2 rotate-90 sm:rotate-0">
                  <Plane className="w-4 h-4 text-white" />
                </div>

                {/* To Dropdown */}
                <div className="relative w-full sm:flex-1">
                  <div className="flex items-center justify-between bg-white border border-gray-300 rounded px-4 py-3 h-12 cursor-pointer">
                    <span className="font-roboto text-gray-600">{toLocation}</span>
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Date Section */}
            <div>
              <h3 className="font-jakarta font-bold text-xl md:text-2xl text-white/95 mb-4 md:mb-6">Date</h3>
              <div className={`flex flex-col${tripType === 'roundTrip' ? ' sm:flex-row' : ''} items-center gap-4`}>
                <div className="relative w-full sm:max-w-xs">
                  <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 h-12 cursor-pointer">
                    <span className="font-roboto text-gray-600">{departureDate}</span>
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                {tripType === 'roundTrip' && (
                  <>
                    <div className="bg-brand-secondary rounded p-2">
                      <ArrowRight className="w-4 h-4 text-white rotate-180" />
                    </div>
                    <div className="relative w-full sm:max-w-xs">
                      <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 h-12 cursor-pointer">
                        <span className="font-roboto text-gray-600">{returnDate}</span>
                        <ChevronDown className="w-6 h-6 text-gray-600" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Search Button */}
            <div className="pt-4">
              <button className="flex items-center justify-center bg-brand-accent hover:bg-brand-accent/90 rounded-full px-8 py-3 transition-colors group">
                <ArrowRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Side - Ticket Preview */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              {/* Ticket Background */}
              <div className="bg-white rounded-lg shadow-2xl p-4 md:p-6 w-72 md:w-80 relative overflow-hidden">
                {/* Header */}
                <div className="bg-brand-dark text-white p-3 md:p-4 -m-4 md:-m-6 mb-4 md:mb-6 rounded-t-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-jakarta font-semibold text-xs md:text-sm">Passengers</span>
                    <span className="font-jakarta font-semibold text-xs md:text-sm">Flight</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="font-jakarta font-bold text-sm md:text-base">Mr.Lorem abc</span>
                    <span className="font-jakarta font-bold text-sm md:text-base">$123CD</span>
                  </div>
                </div>

                {/* Flight Details */}
                <div className="text-center py-3 md:py-4">
                  <div className="text-gray-500 text-xs md:text-sm mb-1">Seat</div>
                  <div className="font-bold text-xl md:text-2xl">20C</div>
                  <div className="text-gray-500 text-xs md:text-sm mt-3 md:mt-4 mb-1">Departure</div>
                  <div className="font-semibold text-sm md:text-base">7:30 AM</div>
                </div>

                {/* Barcode */}
                <div className="mt-6">
                  <div className="flex justify-center">
                    <div className="bg-black h-16 w-full bg-gradient-to-r from-black via-black to-black opacity-80 rounded"
                         style={{
                           backgroundImage: 'repeating-linear-gradient(90deg, black 0px, black 3px, white 3px, white 6px)'
                         }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 md:mt-24 pt-8 md:pt-16 pb-4 md:pb-8">
        <div className="footer-overlay rounded-t-3xl">
          <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
            {/* Footer Logo */}
            <div className="mb-8 md:mb-12">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/0de0d405a7e4c963b59c0e5919425a421fc1cc58?width=494"
                alt="OnboardTicket Logo"
                className="h-16 md:h-20 w-auto mx-auto"
              />
              <div className="w-48 md:w-72 h-px bg-white mx-auto mt-4"></div>
              <div className="text-center mt-4">
                <div className="font-jakarta font-semibold text-white text-sm md:text-base">Onboardticket.com</div>
                <div className="font-jakarta text-xs text-white/50 mt-2">© 2025 — Copyright</div>
              </div>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-white">
              {/* About */}
              <div>
                <h4 className="font-jakarta font-bold text-base md:text-lg text-white/90 mb-3 md:mb-4">About</h4>
                <ul className="space-y-2 md:space-y-3 font-jakarta font-semibold text-xs md:text-sm">
                  <li>Who We are ?</li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>

              {/* Get Help */}
              <div>
                <h4 className="font-jakarta font-bold text-base md:text-lg text-white/90 mb-3 md:mb-4">Get Help</h4>
                <ul className="space-y-2 md:space-y-3 font-jakarta font-semibold text-xs md:text-sm">
                  <li>FAQs</li>
                  <li>Reviews</li>
                  <li>Contact Support 24/7</li>
                </ul>
              </div>

              {/* Follow US */}
              <div className="col-span-2 md:col-span-1">
                <h4 className="font-jakarta font-bold text-base md:text-lg text-white mb-3 md:mb-4">Follow US</h4>
                <div className="flex items-center gap-3 md:gap-4 mt-4">
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="w-6 h-6 md:w-7 md:h-7 bg-white/20 rounded-full flex items-center justify-center">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/46df664da4e9fcc040c23fa285bae6d60c5beeb6?width=46"
                      alt="Social"
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                  </div>
                </div>
              </div>

              {/* Stay in touch */}
              <div className="hidden md:block">
                <h4 className="font-jakarta font-bold text-lg text-white mb-4">Stay in touch</h4>
                <ul className="space-y-3 font-jakarta font-semibold text-sm">
                  <li>Blog</li>
                </ul>
              </div>
            </div>

            {/* Legal Text */}
            <div className="mt-8 md:mt-12 text-xs font-jakarta font-semibold text-white/50 leading-relaxed max-w-lg">
              OnboardTicket is committed to upholding the highest standards in compliance with international civil aviation regulations and ethical booking practices. This includes, but is not limited to, strict avoidance of misuse of booking classes, fraudulent activities, duplicate, speculative, or fictitious reservations. Users who engage in repeated cancellations without legitimate intent will be subject to monitoring, and may face usage restrictions or permanent bans from our platform.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
