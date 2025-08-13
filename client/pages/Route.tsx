import { useState, useEffect } from "react";
import { ArrowRight, Plane, ChevronDown, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import SearchableAirportDropdown from "../components/SearchableAirportDropdown";
import BookingSidebar from "../components/BookingSidebar";
import { useFormValidation, CommonValidationRules } from "../hooks/useFormValidation";
import { Airport, FlightRoute } from "@shared/api";
import { supabaseHelpers } from "../lib/supabaseClient";

interface RouteProps {
  onNext: () => void;
  currentStep: string;
  onNavigate: (step: any) => void;
}

// Default airports (fallback if API fails)
const defaultAirports: Airport[] = [
  { code: "RFD", name: "Chicago Rockford International Airport", city: "Chicago", country: "USA" },
  { code: "ORY", name: "Paris Orly Airport", city: "Paris", country: "France" },
  { code: "LHR", name: "London Heathrow Airport", city: "London", country: "UK" },
  { code: "JFK", name: "John F. Kennedy International Airport", city: "New York", country: "USA" },
  { code: "LAX", name: "Los Angeles International Airport", city: "Los Angeles", country: "USA" },
  { code: "DXB", name: "Dubai International Airport", city: "Dubai", country: "UAE" },
  { code: "SIN", name: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "NRT", name: "Narita International Airport", city: "Tokyo", country: "Japan" },
  { code: "FRA", name: "Frankfurt Airport", city: "Frankfurt", country: "Germany" },
  { code: "AMS", name: "Amsterdam Airport Schiphol", city: "Amsterdam", country: "Netherlands" },
  { code: "CDG", name: "Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "MIA", name: "Miami International Airport", city: "Miami", country: "USA" },
  { code: "BOS", name: "Logan International Airport", city: "Boston", country: "USA" },
  { code: "ATL", name: "Hartsfield-Jackson Atlanta International Airport", city: "Atlanta", country: "USA" },
  { code: "ORD", name: "Chicago O'Hare International Airport", city: "Chicago", country: "USA" },
  { code: "DEN", name: "Denver International Airport", city: "Denver", country: "USA" },
  { code: "SEA", name: "Seattle-Tacoma International Airport", city: "Seattle", country: "USA" },
  { code: "SFO", name: "San Francisco International Airport", city: "San Francisco", country: "USA" },
  { code: "LAS", name: "Harry Reid International Airport", city: "Las Vegas", country: "USA" },
  { code: "YYZ", name: "Toronto Pearson International Airport", city: "Toronto", country: "Canada" },
  { code: "SYD", name: "Sydney Kingsford Smith Airport", city: "Sydney", country: "Australia" }
];

export default function Route({ onNext, currentStep, onNavigate }: RouteProps) {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState<"oneway" | "roundtrip">("oneway");
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchingFlights, setSearchingFlights] = useState(false);
  const [airports, setAirports] = useState<Airport[]>(defaultAirports);
  const [loadingAirports, setLoadingAirports] = useState(true);

  // Form validation
  const validationRules = {
    fromLocation: [
      { required: true, message: 'Please select a departure airport' }
    ],
    toLocation: [
      { required: true, message: 'Please select a destination airport' },
      {
        custom: (value: string) => value !== fromLocation,
        message: 'Destination must be different from departure'
      }
    ],
    departureDate: CommonValidationRules.date,
    ...(tripType === "roundtrip" && {
      returnDate: [
        ...CommonValidationRules.date,
        {
          custom: (value: string) => {
            if (!value || !departureDate) return true;
            return new Date(value) > new Date(departureDate);
          },
          message: 'Return date must be after departure date'
        }
      ]
    })
  };

  const {
    validateForm,
    validateSingleField,
    setFieldTouched,
    getFieldError,
    hasFieldError,
    clearFieldError,
  } = useFormValidation(validationRules);

  // Load airports from API and restore form data
  useEffect(() => {
    const loadAirports = async () => {
      try {
        setLoadingAirports(true);
        const { data, error } = await supabaseHelpers.getAirports();
        if (!error && data && data.length > 0) {
          setAirports(data);
        }
      } catch (error) {
        console.log('Using default airports due to API error:', error);
        // Keep default airports
      } finally {
        setLoadingAirports(false);
      }
    };

    const restoreFormData = () => {
      try {
        const savedRoute = localStorage.getItem('bookingRoute');
        if (savedRoute) {
          const routeData = JSON.parse(savedRoute);
          setTripType(routeData.tripType || 'oneway');
          setFromLocation(routeData.from?.code || '');
          setToLocation(routeData.to?.code || '');
          setDepartureDate(routeData.departureDate || '');
          setReturnDate(routeData.returnDate || '');
        }
      } catch (error) {
        console.log('Error restoring form data:', error);
      }
    };

    const setDefaultDates = () => {
      // Only set default dates if no saved data
      const savedRoute = localStorage.getItem('bookingRoute');
      if (!savedRoute) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const defaultDate = tomorrow.toISOString().split('T')[0];
        setDepartureDate(defaultDate);

        if (tripType === "roundtrip") {
          const weekLater = new Date();
          weekLater.setDate(weekLater.getDate() + 8);
          setReturnDate(weekLater.toISOString().split('T')[0]);
        }
      }
    };

    loadAirports();
    restoreFormData();
    setDefaultDates();
  }, []);

  // Update return date when trip type changes
  useEffect(() => {
    if (tripType === "roundtrip" && !returnDate && departureDate) {
      const depDate = new Date(departureDate);
      depDate.setDate(depDate.getDate() + 7);
      setReturnDate(depDate.toISOString().split('T')[0]);
    }
  }, [tripType, departureDate]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    if (fromLocation || toLocation || departureDate || returnDate) {
      const fromAirport = airports.find(a => a.code === fromLocation);
      const toAirport = airports.find(a => a.code === toLocation);

      const routeData: FlightRoute = {
        from: fromAirport || { code: fromLocation, name: '', city: '', country: '' },
        to: toAirport || { code: toLocation, name: '', city: '', country: '' },
        departureDate,
        returnDate: tripType === 'roundtrip' ? returnDate : undefined,
        tripType
      };

      localStorage.setItem('bookingRoute', JSON.stringify(routeData));
    }
  }, [fromLocation, toLocation, departureDate, returnDate, tripType, airports]);

  const handleLocationChange = (field: 'fromLocation' | 'toLocation', value: string) => {
    if (field === 'fromLocation') {
      setFromLocation(value);
      // If destination is same as new departure, clear it
      if (toLocation === value) {
        setToLocation("");
      }
    } else {
      setToLocation(value);
    }

    clearFieldError(field);
    setFieldTouched(field, true);

    // Validate on change
    setTimeout(() => {
      validateSingleField(field, value);
    }, 100);
  };

  const handleDateChange = (field: 'departureDate' | 'returnDate', value: string) => {
    if (field === 'departureDate') {
      setDepartureDate(value);
      // If return date is before new departure date, adjust it
      if (tripType === "roundtrip" && returnDate && new Date(value) >= new Date(returnDate)) {
        const newReturnDate = new Date(value);
        newReturnDate.setDate(newReturnDate.getDate() + 1);
        setReturnDate(newReturnDate.toISOString().split('T')[0]);
      }
    } else {
      setReturnDate(value);
    }

    clearFieldError(field);
    setFieldTouched(field, true);

    // Validate on change
    setTimeout(() => {
      validateSingleField(field, value);
    }, 100);
  };

  const handleNext = async () => {
    const formData = {
      fromLocation,
      toLocation,
      departureDate,
      ...(tripType === "roundtrip" && { returnDate })
    };

    // Set all fields as touched for validation display
    Object.keys(formData).forEach(field => {
      setFieldTouched(field, true);
    });

    const isValid = validateForm(formData);

    if (!isValid) {
      return;
    }

    // Check that we have valid airports
    const fromAirport = airports.find(a => a.code === fromLocation);
    const toAirport = airports.find(a => a.code === toLocation);

    if (!fromAirport || !toAirport) {
      console.error('Invalid airport selection');
      return;
    }

    setLoading(true);
    setSearchingFlights(true);

    try {
      // Simulate API call to search for flights
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store complete route data in localStorage for persistence across steps
      const routeData: FlightRoute = {
        tripType,
        from: fromAirport,
        to: toAirport,
        departureDate,
        returnDate: tripType === "roundtrip" ? returnDate : undefined,
      };

      // Save to both keys for compatibility
      localStorage.setItem('selectedRoute', JSON.stringify(routeData));
      localStorage.setItem('bookingRoute', JSON.stringify(routeData));

      console.log('Route data saved:', routeData);
      onNext();
    } catch (error) {
      console.error('Error processing route:', error);
      // Still allow progression for demo purposes
      onNext();
    } finally {
      setLoading(false);
      setSearchingFlights(false);
    }
  };

  const getSelectedAirport = (code: string): Airport | undefined => {
    return airports.find(airport => airport.code === code);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left Side - Form */}
          <div className="lg:col-span-2 space-y-8">
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
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#F6F6FF]">Route</h3>

              <div className="space-y-6">
                {/* From Airport */}
                <div>
                  <label className="block text-sm font-semibold text-[#F6F6FF] mb-3">
                    From (Departure Airport) *
                  </label>
                  <SearchableAirportDropdown
                    airports={airports}
                    value={fromLocation}
                    onChange={(code) => handleLocationChange('fromLocation', code)}
                    placeholder="Search departure airport..."
                    excludeCode={toLocation}
                    error={hasFieldError('fromLocation')}
                    className="w-full"
                  />
                  {hasFieldError('fromLocation') && (
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{getFieldError('fromLocation')}</span>
                    </div>
                  )}
                </div>

                {/* Plane Icon Divider */}
                <div className="flex justify-center">
                  <div className="bg-ticket-secondary rounded-full p-3">
                    <Plane className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* To Airport */}
                <div>
                  <label className="block text-sm font-semibold text-[#F6F6FF] mb-3">
                    To (Destination Airport) *
                  </label>
                  <SearchableAirportDropdown
                    airports={airports}
                    value={toLocation}
                    onChange={(code) => handleLocationChange('toLocation', code)}
                    placeholder="Search destination airport..."
                    excludeCode={fromLocation}
                    error={hasFieldError('toLocation')}
                    className="w-full"
                  />
                  {hasFieldError('toLocation') && (
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{getFieldError('toLocation')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#F6F6FF]">Travel Dates</h3>

              <div className="space-y-6">
                {/* Departure Date */}
                <div>
                  <label className="block text-sm font-semibold text-[#F6F6FF] mb-3">
                    Departure Date *
                  </label>
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => handleDateChange('departureDate', e.target.value)}
                    onBlur={() => setFieldTouched('departureDate', true)}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full bg-white border rounded-lg p-4 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      hasFieldError('departureDate') ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {hasFieldError('departureDate') && (
                    <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      <span>{getFieldError('departureDate')}</span>
                    </div>
                  )}
                </div>

                {/* Return Date (for round trip) */}
                {tripType === "roundtrip" && (
                  <div>
                    <label className="block text-sm font-semibold text-[#F6F6FF] mb-3">
                      Return Date *
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => handleDateChange('returnDate', e.target.value)}
                      onBlur={() => setFieldTouched('returnDate', true)}
                      min={departureDate || new Date().toISOString().split('T')[0]}
                      className={`w-full bg-white border rounded-lg p-4 text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        hasFieldError('returnDate') ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {hasFieldError('returnDate') && (
                      <div className="flex items-center gap-1 mt-2 text-red-400 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>{getFieldError('returnDate')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Button */}
            <div className="flex justify-start">
              <button
                onClick={handleNext}
                disabled={loading}
                className={`rounded-full w-20 h-12 flex items-center justify-center transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-ticket-accent hover:bg-opacity-80"
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black"></div>
                ) : (
                  <ArrowRight className="w-6 h-6 text-black" />
                )}
              </button>
            </div>

            {/* Flight Search Status */}
            {searchingFlights && (
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-white font-medium">
                    Searching for available flights...
                  </span>
                </div>
              </div>
            )}
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
                    <div className="text-3xl font-bold text-black">
                      ({fromLocation || "RFD"})
                    </div>
                    <div className="text-xs font-semibold text-ticket-gray">
                      {getSelectedAirport(fromLocation)?.city || "Chicago Rockford"}
                    </div>
                    <div className="text-xs text-ticket-gray-light">
                      {departureDate ? new Date(departureDate).toLocaleDateString() : "20/05/2025"}
                    </div>
                  </div>
                  <ArrowRight className="w-8 h-8 text-black" />
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">
                      ({toLocation || "ORY"})
                    </div>
                    <div className="text-xs font-semibold text-ticket-gray">
                      {getSelectedAirport(toLocation)?.city || "Paris Orly"}
                    </div>
                    <div className="text-xs text-ticket-gray-light">
                      {tripType === "roundtrip" && returnDate
                        ? new Date(returnDate).toLocaleDateString()
                        : "30/05/2025"}
                    </div>
                  </div>
                </div>
                {tripType === "roundtrip" && (
                  <div className="text-xs text-ticket-gray-light">
                    Round trip • {departureDate && returnDate
                      ? `${Math.ceil((new Date(returnDate).getTime() - new Date(departureDate).getTime()) / (1000 * 60 * 60 * 24))} days`
                      : "Duration TBD"}
                  </div>
                )}
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
