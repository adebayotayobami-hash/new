import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CloudDecoration = () => (
  <div className="absolute right-0 bottom-0 opacity-34 w-[300px] h-[200px]">
    <svg 
      className="w-full h-full" 
      viewBox="0 0 397 399" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2346_219)">
        <path 
          d="M53.09 231.36C59.19 231.04 64.36 235.67 64.69 240.4C65.49 240.61 66.29 240.89 67.08 241.27C72.06 243.65 75.03 250.16 71.25 254.27C67.62 258.22 67.61 261.57 70.21 265.78C71.47 267.82 73.39 269.88 75.05 270.98C77.5 272.59 79.65 273.28 81.68 273.37C84.42 273.49 88.62 271.9 92.13 270.84C97.34 269.28 102.79 268.36 108.33 269.18C118.31 270.65 124.13 276.85 129.54 283.28C138.58 294.05 152.23 301.43 167.31 305.46C205.93 315.79 246.22 305.44 283.47 296.06C292 293.91 300.11 300.92 297.77 307.75C290.25 329.72 305.12 351.01 326.26 364.18C348.13 377.8 375.09 382.61 401.96 378.18C430.88 373.42 456.95 360.82 479.51 345.63C502.66 330.04 526.08 311.7 542 290.77C556.99 271.05 564.01 245.27 546.18 225.15C543.32 221.92 544.48 216.19 548 213.64C576.59 192.87 573.95 155.6 551.36 132.37C539.88 120.57 524.52 111.83 507.9 105.52C499.73 102.42 491.09 100.09 482.37 98.2602C475.68 96.8602 469.75 96.1402 466.97 90.2302C465.53 87.1802 464.24 84.1402 462.53 81.1702C447.9 55.9102 420.8 35.4602 388.71 25.6502C355.9 15.6202 319.97 16.8902 288.57 29.7702C257.62 42.4602 232.39 64.3802 221.33 91.4002C219.48 95.9202 213.14 99.9002 207.03 98.0402C183.48 90.8702 155.61 93.4002 135.87 106.68C116.16 119.94 107.2 140.8 110.5 161.25C111.55 167.79 102.27 171.53 95.78 170.41C71.19 166.15 35.93 171.47 25.3 192.6C21.03 201.08 22.89 211.28 28.5 219.28C34.16 227.37 42.45 231.92 53.12 231.35L53.09 231.36Z" 
          fill="#C7E9F4"
        />
      </g>
      <defs>
        <clipPath id="clip0_2346_219">
          <rect width="591.98" height="398.88" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  </div>
);

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

export default function Faq() {
  const navigate = useNavigate();
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>('about');

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-ob-background font-plus-jakarta">
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
        <nav className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Link to="/contact" className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-bold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors text-center">
            Get Support
          </Link>
          <Link to="/payment" className="px-4 sm:px-8 py-2 sm:py-3 text-ob-dark font-semibold text-base sm:text-lg hover:bg-gray-100 rounded-lg transition-colors text-center">
            Book now
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-36 py-12 lg:py-20">
        <section className="bg-white/90 rounded-3xl p-8 lg:p-16 shadow-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ob-primary mb-8 leading-tight text-center">Frequently Asked Questions</h1>
          <div className="text-[#23235B] text-lg lg:text-xl font-semibold leading-relaxed mb-8">
            <section className="mt-8 lg:mt-16 mb-8">
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-black opacity-50 mb-2">
                Check out our frequently asked questions below. Can't find what you're looking for?{' '}
                <span className="text-ob-teal">Reach out to us now</span>
              </p>
            </section>

            {/* FAQ Sections */}
            <section className="space-y-4 mb-16">
              <FAQItem 
                question="Tickets & Reservations ?" 
                isExpanded={false}
                onToggle={() => {}}
              />
              
              <FAQItem 
                question="Issues With Your Order ?" 
                isExpanded={false}
                onToggle={() => {}}
              />
              
              <FAQItem 
                question="About Onplane ticket ?" 
                isExpanded={expandedFAQ === 'about'}
                onToggle={() => toggleFAQ('about')}
              >
                <p className="text-base font-light leading-relaxed">
                  Check out our frequently asked questions below or reach out to our team for fast, friendly support
                </p>
                <div className="mt-6 space-y-4">
                  <div className="border-b border-black/15 pb-4">
                    <h4 className="text-xl font-semibold mb-2">Why Onplane ticket ?</h4>
                  </div>
                  <div className="border-b border-black/15 pb-4">
                    <h4 className="text-xl font-semibold">How does Onplane ticket work ?</h4>
                  </div>
                </div>
              </FAQItem>
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
                <CloudDecoration />
              </div>
            </section>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-24 px-4 sm:px-8 lg:px-36">
        <div className="bg-ticket-footer rounded-t-lg p-8 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
