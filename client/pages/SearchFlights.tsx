import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SearchFlightsProps {
  onNext: () => void;
}

export default function SearchFlights({ onNext }: SearchFlightsProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-advance after 3 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen bg-ticket-primary text-white">
      {/* Header */}
      <header className="px-4 sm:px-8 lg:px-36 pt-12 pb-8 flex justify-between items-center">
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/546fa6d584538b821a4ae9a72451f346c3dd5fdd?width=588" 
          alt="OnboardTicket" 
          className="h-15 w-auto"
        />
        <div className="flex gap-8">
          <button onClick={() => navigate("/contact")} className="text-lg font-bold text-white/90">
            Get Support
          </button>
          <button onClick={() => navigate("/userform")} className="text-lg font-bold text-white/90">
            Book now
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        {/* Loading Animation */}
        <div className="mb-12">
          <div className="flex items-center gap-2">
            {/* Animated dots */}
            <div className="flex gap-1">
              {[...Array(7)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full bg-white animate-pulse`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    opacity: 0.3 + (i * 0.1)
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-8 max-w-2xl">
          Checking for available flights
        </h1>

        {/* Description */}
        <p className="text-xl text-white/60 text-center mb-12 max-w-lg">
          Your Flights will be Booked Automatically on the dates you confirmed
        </p>

        {/* Continue Button */}
        <button
          onClick={onNext}
          className="bg-ticket-accent text-black font-bold text-xl px-12 py-4 rounded-full hover:bg-opacity-80 transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
