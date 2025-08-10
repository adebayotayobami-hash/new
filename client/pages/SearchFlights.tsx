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
      <header className="text-left">
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

      {/* Footer */}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {/* ...existing footer content... */}
          </div>
        </div>
      </footer>
    </div>
  );
}
