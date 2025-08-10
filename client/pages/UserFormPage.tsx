import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Route from "./Route";
import Passengers from "./Passengers";
import Confirmation from "./Confirmation";
import SearchFlights from "./SearchFlights";
import ThankYou from "./ThankYou";

type Step = "route" | "passengers" | "confirmation" | "search" | "thankyou";

export default function UserFormPage({ step }: { step?: string }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>(step as Step || "route");

  useEffect(() => {
    if (step) {
      setCurrentStep(step as Step);
    } else {
      // fallback: try to infer from path
      const path = location.pathname.split("/")[2];
      if (path && ["route","passengers","confirmation","search","thankyou"].includes(path)) {
        setCurrentStep(path as Step);
      }
    }
  }, [step, location.pathname]);

  const goToNextStep = () => {
    switch (currentStep) {
      case "route":
        setCurrentStep("passengers");
        break;
      case "passengers":
        setCurrentStep("confirmation");
        break;
      case "confirmation":
        setCurrentStep("search");
        break;
      case "search":
        setCurrentStep("thankyou");
        break;
      default:
        break;
    }
  };

  const goToPreviousStep = () => {
    switch (currentStep) {
      case "passengers":
        setCurrentStep("route");
        break;
      case "confirmation":
        setCurrentStep("passengers");
        break;
      default:
        break;
    }
  };

  const navigateToStep = (step: Step) => {
    setCurrentStep(step);
  };

  return (
    <>
      <header className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Add your header content here */}
      </header>
      {(() => {
        switch (currentStep) {
          case "route":
            return <Route onNext={goToNextStep} currentStep={currentStep} onNavigate={navigateToStep} />;
          case "passengers":
            return <Passengers onNext={goToNextStep} onBack={goToPreviousStep} currentStep={currentStep} onNavigate={navigateToStep} />;
          case "confirmation":
            return <Confirmation onNext={goToNextStep} onBack={goToPreviousStep} currentStep={currentStep} onNavigate={navigateToStep} />;
          case "search":
            return <SearchFlights onNext={goToNextStep} />;
          case "thankyou":
            return <ThankYou />;
          default:
            return <Route onNext={goToNextStep} currentStep={currentStep} onNavigate={navigateToStep} />;
        }
      })()}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {/* ...existing code... */}
          </div>
        </div>
      </footer>
    </>
  );
}
