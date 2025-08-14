import { useState, useEffect } from "react";
import { ArrowRight, Calendar, Users, MapPin, Plane } from "lucide-react";
import { Airport, FlightRoute, Passenger } from "@shared/api";

interface BookingSidebarProps {
  currentStep: string;
}

export default function BookingSidebar({ currentStep }: BookingSidebarProps) {
  const [routeData, setRouteData] = useState<FlightRoute | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [contactEmail, setContactEmail] = useState("");

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      // Load route data
      const savedRoute =
        localStorage.getItem("selectedRoute") ||
        localStorage.getItem("bookingRoute");
      if (savedRoute) {
        try {
          setRouteData(JSON.parse(savedRoute));
        } catch (error) {
          console.error("Error parsing route data:", error);
        }
      }

      // Load passenger data
      const savedPassengers = localStorage.getItem("bookingPassengers");
      if (savedPassengers) {
        try {
          const passengerData = JSON.parse(savedPassengers);
          if (Array.isArray(passengerData)) {
            setPassengers(passengerData);
          }
        } catch (error) {
          console.error("Error parsing passenger data:", error);
        }
      }

      // Load contact email
      const savedContactEmail = localStorage.getItem("bookingContactEmail");
      if (savedContactEmail) {
        setContactEmail(savedContactEmail);
      }
    };

    loadData();

    // Listen for storage changes to update in real-time
    const handleStorageChange = () => {
      loadData();
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check for changes periodically since localStorage changes within the same tab
    // don't trigger the storage event
    const interval = setInterval(loadData, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Not selected";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getStepStatus = (step: string) => {
    const stepOrder = [
      "route",
      "passengers",
      "confirmation",
      "search",
      "thankyou",
    ];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(step);

    if (stepIndex < currentIndex) return "completed";
    if (stepIndex === currentIndex) return "current";
    return "upcoming";
  };

  const hasRouteData =
    routeData && routeData.from && routeData.to && routeData.departureDate;
  const hasPassengerData =
    passengers.length > 0 && passengers[0].firstName && contactEmail;

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm h-fit sticky top-6">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 -mx-6 -mt-6 mb-6 rounded-t-xl">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Plane className="w-6 h-6" />
            <h3 className="text-lg font-bold">Booking Summary</h3>
          </div>
          <div className="text-sm opacity-90">
            Step{" "}
            {currentStep === "route"
              ? "1"
              : currentStep === "passengers"
                ? "2"
                : currentStep === "confirmation"
                  ? "3"
                  : "4"}{" "}
            of 4
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="mb-6">
        <div className="space-y-3">
          {[
            { step: "route", label: "Route & Dates", icon: MapPin },
            { step: "passengers", label: "Passengers", icon: Users },
            { step: "confirmation", label: "Confirmation", icon: Calendar },
            { step: "search", label: "Complete", icon: ArrowRight },
          ].map(({ step, label, icon: Icon }) => {
            const status = getStepStatus(step);
            return (
              <div key={step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    status === "completed"
                      ? "bg-green-500 text-white"
                      : status === "current"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {status === "completed" ? (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    status === "current"
                      ? "text-blue-600"
                      : status === "completed"
                        ? "text-green-600"
                        : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Route Information */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Flight Route
        </h4>
        {hasRouteData ? (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {routeData.from?.code || "XXX"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {routeData.from?.city || "From"}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-900">
                    {routeData.to?.code || "XXX"}
                  </div>
                  <div className="text-xs text-gray-600">
                    {routeData.to?.city || "To"}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip Type:</span>
                <span className="font-medium capitalize">
                  {routeData.tripType || "One way"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Departure:</span>
                <span className="font-medium">
                  {formatDate(routeData.departureDate || "")}
                </span>
              </div>
              {routeData.tripType === "roundtrip" && routeData.returnDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Return:</span>
                  <span className="font-medium">
                    {formatDate(routeData.returnDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Complete route selection to see details
          </div>
        )}
      </div>

      {/* Passenger Information */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Users className="w-4 h-4" />
          Passengers ({passengers.length || 0})
        </h4>
        {hasPassengerData ? (
          <div className="space-y-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-600 mb-2">Contact Email</div>
              <div className="text-sm font-medium text-gray-900 truncate">
                {contactEmail}
              </div>
            </div>

            <div className="space-y-2">
              {passengers.slice(0, 3).map((passenger, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="text-xs text-gray-600 mb-1">
                    Passenger {index + 1}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    {passenger.title || "Mr"}. {passenger.firstName || "First"}{" "}
                    {passenger.lastName || "Last"}
                  </div>
                </div>
              ))}
              {passengers.length > 3 && (
                <div className="text-xs text-gray-500 text-center py-2">
                  + {passengers.length - 3} more passenger
                  {passengers.length - 3 > 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Add passengers to see details
          </div>
        )}
      </div>

      {/* Summary */}
      <div className="border-t pt-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base Price:</span>
            <span className="font-medium">$15.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Processing Fee:</span>
            <span className="font-medium">$0.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-lg text-green-600">$15.00</span>
          </div>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mt-4 text-center">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
            currentStep === "thankyou"
              ? "bg-green-100 text-green-800"
              : hasRouteData && hasPassengerData
                ? "bg-blue-100 text-blue-800"
                : hasRouteData
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-600"
          }`}
        >
          {currentStep === "thankyou"
            ? "✅ Completed"
            : hasRouteData && hasPassengerData
              ? "📝 Ready to confirm"
              : hasRouteData
                ? "👥 Add passengers"
                : "🛫 Select route"}
        </div>
      </div>
    </div>
  );
}
