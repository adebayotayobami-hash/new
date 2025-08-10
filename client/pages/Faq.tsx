import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const FAQItem = ({ question, isExpanded, onToggle, children }: {
  question: string;
  isExpanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) => (
  <div className="bg-gradient-to-r from-pink-100/50 to-purple-300/50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-4">
    <button
      onClick={onToggle}
      className="flex justify-between items-center w-full text-left"
    >
      <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-black font-plus-jakarta pr-4">
        {question}
      </h3>
      <span className="text-gray-500 flex-shrink-0">
        {isExpanded ? '−' : '+'}
      </span>
    </button>
    {isExpanded && children && (
      <div className="mt-4 lg:mt-6 text-black">
        {children}
      </div>
    )}
  </div>
);

type FaqItem = {
  q: string;
  a: string;
};

function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div>
      {faqs.map((faq, idx) => (
        <FAQItem
          key={faq.q}
          question={faq.q}
          isExpanded={expandedIndex === idx}
          onToggle={() => setExpandedIndex(expandedIndex === idx ? null : idx)}
        >
          <div>{faq.a}</div>
        </FAQItem>
      ))}
    </div>
  );
}

export default function Faq() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ob-background font-plus-jakarta">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}> 
          <img 
            src="/onboard/result.png" 
            alt="OnboardTicket Logo" 
            className="h-[40px] sm:h-[59px] w-auto max-w-[200px] sm:max-w-[294px] cursor-pointer"
            loading="eager"
            onClick={() => navigate("/")}
          />
        </div>
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={() => navigate("/contact")}
            className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-bold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors"
          >
            Get Support
          </button>
          <button
            onClick={() => navigate("/userform")}
            className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-semibold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors"
          >
            Book now
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-12 lg:py-20">
        <section className="bg-white/90 rounded-3xl p-8 lg:p-16 shadow-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ob-primary mb-8 leading-tight text-center">Frequently Asked Questions</h1>
          <div className="text-[#23235B] text-lg lg:text-xl font-semibold leading-relaxed mb-8">
            <section className="mt-8 lg:mt-16 mb-8">
                <div className="w-full text-left">
                  <FaqList
                    faqs={[
                      {
                        q: "About Onplane ticket ? ",
                        a: "Onplane tickets are real, verifiable flight reservations provided for visa applications and travel needs.",
                      },
                      {
                        q: "Why Onplane ticket ? ",
                        a: "We offer instant, secure, and affordable reservations trusted by embassies and travelers worldwide.",
                      },
                      {
                        q: "How fast is your service? ",
                        a: "Our service is fast, reliable, and provides support within 30 minutes on average.",
                      },
                      {
                        q: "Tickets & Reservations ? ",
                        a: "You can book, view, and manage your reservations easily through our platform.",
                      },
                      {
                        q: "Issues With Your Order ? ",
                        a: "Contact our support team 24/7 for any issues or questions regarding your order.",
                      },
                    ]}
                  />
                </div>
                <div className="flex gap-2 md:gap-4 mt-8 justify-start">
                  <button 
                    className="bg-[#3839C9] text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-colors shadow-md"
                    onClick={() => navigate("/faq")}
                  >
                    See More FAQ
                  </button>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="text-center mb-8 lg:mb-16 relative overflow-hidden">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ob-primary mb-4">
                Still Have more
                <br />
                Questions ?
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold mb-8">
                <span className="text-black opacity-40">Whatever You need, we Are Here for You</span>{' '}
                <span className="text-ob-teal">Reach Out To Us Now</span>
              </p>
              <div className="hidden lg:block">
                
              </div>
            </section>
          </div>
        </section>
      </main>

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
                <div className="text-base font-semibold text-[#3150DA]">Onboardticket.com</div>
                <div className="text-xs opacity-80 mt-2 text-black">© 2025 — Copyright</div>
              </div>
              <p className="text-xs opacity-80 leading-relaxed text-black">
                OnboardTicket is committed to upholding the highest standards in compliance with international civil aviation regulations and ethical booking practices. This includes, but is not limited to, strict avoidance of misuse of booking classes, fraudulent activities, duplicate, speculative, or fictitious reservations. Users who engage in repeated cancellations without legitimate intent will be subject to monitoring, and may face usage restrictions or permanent bans from our platform.
              </p>
            </div>
            {/* About */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                About
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-black">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/about")}>Who We are ?</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/privacy-policy")}>Privacy Policy</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/terms-conditions")}>Terms & Conditions</li>
              </ul>
            </div>
            {/* Get Help */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                Get Help
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm font-semibold text-black">
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/faq")}>FAQs</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/payment")}>Payment</li>
                <li className="cursor-pointer hover:text-[#3839C9]" onClick={() => navigate("/contact")}>Contact Support 24/7</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div className="space-y-2 md:space-y-4 flex flex-col items-center justify-center ">
              <h4 className="text-base md:text-lg font-bold text-[#3150DA]">
                Follow US
              </h4>
              <div className="space-y-1 md:space-y-2">
                <h5 className="text-base md:text-lg font-bold text-[#3150DA]">
                  Stay in touch
                </h5>
                <p className="text-xs sm:text-sm font-semibold text-black">
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
