import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Route from "./Route";
import Passengers from "./Passengers";
import Confirmation from "./Confirmation";
import SearchFlights from "./SearchFlights";
import ThankYou from "./ThankYou";

type Step = "route" | "passengers" | "confirmation" | "search" | "thankyou";

export default function UserFormPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>("route");

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
    </>
  );
}
