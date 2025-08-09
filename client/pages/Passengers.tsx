import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PassengerData {
  title: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function Index() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [passengers, setPassengers] = useState<PassengerData[]>([
    { title: "Mr", firstName: "", lastName: "", email: "" }
  ]);

  const addPassenger = () => {
    setPassengers([...passengers, { title: "Mr", firstName: "", lastName: "", email: "" }]);
  };

  const updatePassenger = (index: number, field: keyof PassengerData, value: string) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const removePassenger = (index: number) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-onboard-primary font-jakarta">
      {/* Header with Logo */}
      <div className="pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <img 
            src="https://api.builder.io/api/v1/image/assets/TEMP/546fa6d584538b821a4ae9a72451f346c3dd5fdd?width=588" 
            alt="OnboardTicket Logo" 
            className="h-14 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* Left Side - Booking Form */}
          <div className="flex-1 max-w-4xl">
            {/* Progress Steps */}
            <div className="mb-8 lg:mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className={`text-lg md:text-2xl font-bold ${currentStep === 1 ? 'text-white' : 'text-white/70'}`}>
                  Route
                </div>
                <div className={`text-lg md:text-2xl font-bold ${currentStep === 2 ? 'text-white' : 'text-white/70'}`}>
                  Passengers
                </div>
                <div className={`text-lg md:text-2xl font-bold ${currentStep === 3 ? 'text-white' : 'text-white/70'}`}>
                  Confirmation
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-onboard-purple-100 h-1 rounded">
                <div 
                  className="bg-onboard-green-400 h-1 rounded transition-all duration-300"
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step 2: Passengers Section */}
            <div className="space-y-6 lg:space-y-8">
              <h2 className="text-xl md:text-2xl font-bold text-onboard-purple-50 mb-6 lg:mb-8">Passenger</h2>

              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-4">
                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Contact Email"
                      value={passenger.email}
                      onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                      className="w-full bg-onboard-purple-100 rounded-lg px-4 py-3 md:py-4 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-onboard-green-400"
                    />
                    <svg
                      className="absolute right-4 top-3 md:top-4 w-5 h-5 md:w-6 md:h-6 opacity-60"
                      fill="#FEF7FF"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 8C18.1667 8 17.4583 7.70833 16.875 7.125C16.2917 6.54167 16 5.83333 16 5C16 4.16667 16.2917 3.45833 16.875 2.875C17.4583 2.29167 18.1667 2 19 2C19.8333 2 20.5417 2.29167 21.125 2.875C21.7083 3.45833 22 4.16667 22 5C22 5.83333 21.7083 6.54167 21.125 7.125C20.5417 7.70833 19.8333 8 19 8ZM4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H14.1C14.0333 4.33333 14 4.66667 14 5C14 5.33333 14.0333 5.66667 14.1 6C14.2167 6.53333 14.4083 7.02917 14.675 7.4875C14.9417 7.94583 15.2667 8.35 15.65 8.7L12 11L4 6V8L12 13L17.275 9.7C17.5583 9.8 17.8417 9.875 18.125 9.925C18.4083 9.975 18.7 10 19 10C19.5333 10 20.0583 9.91667 20.575 9.75C21.0917 9.58333 21.5667 9.33333 22 9V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4Z"/>
                    </svg>
                  </div>

                  {/* Title Selection and Name Fields */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Title Selection */}
                    <div className="flex gap-2 sm:min-w-fit">
                      {['Mr', 'Ms', 'Mrs'].map((title) => (
                        <button
                          key={title}
                          type="button"
                          onClick={() => updatePassenger(index, 'title', title)}
                          className={`w-12 h-12 md:w-15 md:h-15 rounded-lg text-xs md:text-sm font-semibold transition-colors ${
                            passenger.title === title
                              ? 'bg-onboard-purple-500 text-white/90'
                              : 'bg-onboard-purple-100/40 text-white/55'
                          }`}
                        >
                          {title}
                        </button>
                      ))}
                      {/* Remove Passenger Button, only show if more than one passenger */}
                      {passengers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePassenger(index)}
                          className="w-12 h-12 md:w-15 md:h-15 rounded-lg bg-red-500/80 text-white/90 text-xs md:text-sm font-semibold flex items-center justify-center hover:bg-red-600 transition-colors"
                          aria-label="Remove Passenger"
                        >
                          <svg className="w-4 h-4 md:w-5 md:h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {/* Name Fields Container */}
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                      {/* First Name */}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="First Name"
                          value={passenger.firstName}
                          onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                          className="w-full bg-onboard-purple-100 rounded-lg px-4 py-3 md:py-4 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-onboard-green-400"
                        />
                      </div>

                      {/* Last Name */}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={passenger.lastName}
                          onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                          className="w-full bg-onboard-purple-100 rounded-lg px-4 py-3 md:py-4 text-white placeholder-gray-400 border-none focus:outline-none focus:ring-2 focus:ring-onboard-green-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Passenger Button */}
              <button
                onClick={addPassenger}
                className="w-full bg-onboard-purple-100 rounded-lg py-4 text-white/55 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-onboard-purple-100/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Passenger
              </button>

              {/* Next Button */}
              <div className="pt-8">
                <button 
                  onClick={() => setCurrentStep(3)}
                  className="bg-onboard-green-400 text-black rounded-full w-20 h-11 flex items-center justify-center hover:bg-onboard-green-400/90 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Ticket Preview */}
          <div className="xl:w-96 xl:flex-shrink-0">
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-sm mx-auto xl:max-w-none">
              {/* Flight Route */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-center sm:text-left">
                  <div className="text-2xl md:text-4xl font-bold text-black">(RFD)</div>
                  <div className="text-xs md:text-sm text-onboard-gray-300 font-semibold">Chicago Rockford</div>
                  <div className="text-xs md:text-sm text-gray-400">20/05/205</div>
                </div>

                <svg className="w-6 h-6 md:w-8 md:h-8 text-black flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14m-7-7l7 7-7 7" />
                </svg>

                <div className="text-center sm:text-right">
                  <div className="text-2xl md:text-4xl font-bold text-black">(ORY)</div>
                  <div className="text-xs md:text-sm text-onboard-gray-300 font-semibold">Paris Orly</div>
                  <div className="text-xs md:text-sm text-gray-400">30/05/205</div>
                </div>
              </div>

              {/* Passenger and Flight Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Passenger Info */}
                <div className="space-y-2">
                  <div className="text-xs md:text-sm text-onboard-gray-400 font-semibold">Passenger / 1</div>
                  <div className="text-xs md:text-sm text-onboard-gray-400">Passengers</div>
                  <div className="text-sm md:text-lg font-bold text-black">{passengers[0].title}.{passengers[0].firstName} {passengers[0].lastName}</div>
                  <div className="text-xs md:text-sm text-onboard-gray-400">Seat</div>
                  <div className="text-sm md:text-lg font-bold text-black">20C</div>
                </div>

                {/* Flight Details */}
                <div className="space-y-2">
                  <div className="text-xs md:text-sm text-onboard-gray-400">Flight</div>
                  <div className="text-sm md:text-lg font-bold text-black">$123CD</div>
                  <div className="text-xs md:text-sm text-onboard-gray-400">Departure</div>
                  <div className="text-sm md:text-lg font-bold text-black">7:30 AM</div>
                </div>
              </div>

              {/* Barcode */}
              <div className="border-t border-gray-200 pt-4">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='40'%3E%3Cg fill='%23000'%3E%3Crect x='0' y='0' width='2' height='40'/%3E%3Crect x='4' y='0' width='1' height='40'/%3E%3Crect x='8' y='0' width='3' height='40'/%3E%3Crect x='14' y='0' width='1' height='40'/%3E%3Crect x='18' y='0' width='2' height='40'/%3E%3Crect x='22' y='0' width='1' height='40'/%3E%3Crect x='26' y='0' width='3' height='40'/%3E%3Crect x='32' y='0' width='1' height='40'/%3E%3Crect x='36' y='0' width='2' height='40'/%3E%3Crect x='40' y='0' width='1' height='40'/%3E%3Crect x='44' y='0' width='3' height='40'/%3E%3Crect x='50' y='0' width='1' height='40'/%3E%3Crect x='54' y='0' width='2' height='40'/%3E%3Crect x='58' y='0' width='1' height='40'/%3E%3Crect x='62' y='0' width='3' height='40'/%3E%3Crect x='68' y='0' width='1' height='40'/%3E%3Crect x='72' y='0' width='2' height='40'/%3E%3Crect x='76' y='0' width='1' height='40'/%3E%3Crect x='80' y='0' width='3' height='40'/%3E%3Crect x='86' y='0' width='1' height='40'/%3E%3Crect x='90' y='0' width='2' height='40'/%3E%3Crect x='94' y='0' width='1' height='40'/%3E%3Crect x='98' y='0' width='3' height='40'/%3E%3Crect x='104' y='0' width='1' height='40'/%3E%3Crect x='108' y='0' width='2' height='40'/%3E%3Crect x='112' y='0' width='1' height='40'/%3E%3Crect x='116' y='0' width='3' height='40'/%3E%3Crect x='122' y='0' width='1' height='40'/%3E%3Crect x='126' y='0' width='2' height='40'/%3E%3Crect x='130' y='0' width='1' height='40'/%3E%3Crect x='134' y='0' width='3' height='40'/%3E%3Crect x='140' y='0' width='1' height='40'/%3E%3Crect x='144' y='0' width='2' height='40'/%3E%3Crect x='148' y='0' width='1' height='40'/%3E%3Crect x='152' y='0' width='3' height='40'/%3E%3Crect x='158' y='0' width='1' height='40'/%3E%3Crect x='162' y='0' width='2' height='40'/%3E%3Crect x='166' y='0' width='1' height='40'/%3E%3Crect x='170' y='0' width='3' height='40'/%3E%3Crect x='176' y='0' width='1' height='40'/%3E%3Crect x='180' y='0' width='2' height='40'/%3E%3Crect x='184' y='0' width='1' height='40'/%3E%3Crect x='188' y='0' width='3' height='40'/%3E%3Crect x='194' y='0' width='1' height='40'/%3E%3Crect x='198' y='0' width='2' height='40'/%3E%3C/g%3E%3C/svg%3E"
                  alt="Barcode"
                  className="w-full"
                />
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
