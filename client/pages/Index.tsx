import React from "react";
import {
  ChevronDown,
  Navigation,
  Star,
  ArrowRight,
  ArrowLeft,
  Instagram,
} from "lucide-react";
import TestimonialCarousel from "../components/ui/TestimonialCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#E7E9FF] font-jakarta overflow-x-hidden px-4 md:px-16 py-4 md:py-16">
      {/* Header */}
      <header className="container mx-auto px-4 md:px-12 py-6 md:py-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/546fa6d584538b821a4ae9a72451f346c3dd5fdd?width=588"
              alt="OnboardTicket Logo"
              className="h-10 md:h-16 w-auto max-w-[180px] md:max-w-[220px] object-contain"
              loading="eager"
            />
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            <button className="px-8 py-2 text-brand-text-primary font-bold text-base md:text-lg hover:bg-gray-100 rounded-lg transition-colors shadow-none">
              Get Support
            </button>
            <button className="px-8 py-2 bg-white text-brand-text-primary font-bold text-base md:text-lg rounded-lg hover:bg-gray-50 transition-colors shadow-md">
              Book now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 md:px-12 py-8 md:py-16">
        <div className="w-full">
          <div className="bg-white/60 backdrop-blur-md rounded-[24px] p-8 md:p-16 shadow-xl border border-[#E7E9FF] w-full flex flex-col md:flex-row items-center gap-8">
            {/* Content on the left */}
            <div className="flex-1 w-full order-2 md:order-1">
              <h1 className="text-[2.2rem] md:text-[2.8rem] font-extrabold text-[#3839C9] mb-4 md:mb-6 leading-tight tracking-tight">
                Get a verified Flight reservation
              </h1>
              <p className="text-lg md:text-2xl font-medium text-[#637996] mb-6 md:mb-10">
                the easiest way to get verified flight reservations
              </p>

              {/* CTA Button */}
              <button className="flex items-center gap-3 md:gap-4 bg-[#3839C9] text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold text-lg md:text-xl hover:bg-blue-700 transition-colors shadow-lg">
                <Navigation className="w-5 h-5 md:w-6 md:h-6" />
                Book Now
              </button>

              <p className="text-xs md:text-sm font-bold text-[#637996] mt-4 md:mt-6">
                Instant & secure Booking from
                Just 10$
              </p>
            </div>
                        {/* Image on the right */}
            <div className="flex-1 w-full flex justify-center items-end order-1 md:order-2">
              <img
                src="/hero.png"
                alt="Flight Hero Visual"
                className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto object-contain rounded-2xl border border-[#E7E9FF] bg-white shadow-xl z-20"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="w-full py-16 md:py-24 gradient-box rounded-2xl md:rounded-3xl">
        <div className="container mx-auto px-2 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0 text-center">
            <div className="flex flex-col items-center justify-center py-2 md:py-0">
              <h3 className="text-lg md:text-2xl font-extrabold font-jakarta text-white mb-1 md:mb-2 tracking-tight">
                100% Verified
              </h3>
              <p className="text-white font-semibold md:font-semibold text-sm md:text-base font-jakarta">
                Flight Reservations
              </p>
            </div>
            <div className="flex flex-col items-center justify-center border-t md:border-t-0 md:border-l md:border-r border-white/30 py-2 md:py-0">
              <h3 className="text-lg md:text-2xl font-extrabold font-jakarta text-white mb-1 md:mb-2 tracking-tight">
                60 Second
              </h3>
              <p className="text-white font-semibold md:font-semibold text-sm md:text-base text-center font-jakarta">
                Ticket Delivery
              </p>
            </div>
            <div className="flex flex-col items-center justify-center py-2 md:py-0">
              <h3 className="text-lg md:text-2xl font-extrabold font-jakarta text-white mb-1 md:mb-2 tracking-tight">
                24/7 Support
              </h3>
              <p className="text-white font-semibold md:font-semibold text-sm md:text-base font-jakarta">
                From Humans
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Reservations Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#191A78] mb-2 md:mb-4 tracking-tight font-jakarta">
            Flight reservations
          </h2>
          <p className="text-lg md:text-2xl text-[#8A8A8F] mb-8 md:mb-16 font-light font-jakarta">
            That are fast, easy & verifiable
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Fast Reservation */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/L-Lightning.png"
                    alt="Lightning Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Fast Reservation
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/* Verifiable */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/public/Flight Landing Page.png"
                    alt="Verified Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Verifiable
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/* Secure & Easy */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#EAEBF4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/public/Flight Landing Page.png"
                    alt="Secure Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Secure & Easy
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/* Save Money */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box-pink rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/F-Wallet@3x.png"
                    alt="Wallet Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Save Money
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <button className="flex items-center gap-2 md:gap-4 bg-[#3839C9] text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold text-lg md:text-xl mx-auto hover:bg-blue-700 transition-colors shadow-lg">
            <Navigation className="w-5 h-5 md:w-6 md:h-6" />
            Book Now
          </button>
          <p className="text-xs md:text-sm font-bold text-[#637996] mt-2 md:mt-4">
            instant & secure Booking from Just 10$
          </p>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#191971] mb-4 md:mb-8 tracking-tight">
              Trusted by thousands
            </h2>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/ff24681c313a3e4db5ec55bdd0ab20d507866bf0?width=276"
              alt="Trustpilot"
              className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 mx-auto object-contain"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 md:space-y-8">
              <div className="text-center lg:text-left">
                <p className="text-[#A2A2A2] text-base md:text-lg mb-2 md:mb-4 font-semibold">
                  Testimonials
                </p>
                <h3 className="text-2xl md:text-4xl font-extrabold text-[#20242A] mb-4 md:mb-8 tracking-tight">
                  What They say About our Services
                </h3>
                <blockquote className="text-base md:text-xl font-semibold text-[#20242A] mb-4 md:mb-8 leading-relaxed">
                  "The experience of booking airfare through this website was
                  amazing! The intuitive interface, wide selection of routes,
                  and fast transaction process made my trip more enjoyable."
                </blockquote>

                <div className="flex items-center gap-2 md:gap-4 justify-center lg:justify-start">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-[#9BF1D5] rounded-full flex items-center justify-center overflow-hidden">
                    <img
                      src="https://api.builder.io/api/v1/image/assets/TEMP/f4f31fe52ad073d5757f8f9684b13989bf5401c7?width=112"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#20242A] text-sm md:text-base">
                      Daniel Ricciardo
                    </h4>
                    <p className="text-[#A2A2A2] text-xs md:text-sm">
                      Businessman
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-2 md:gap-4 justify-center lg:justify-start mt-2 md:mt-4">
                <button className="w-8 h-8 md:w-14 md:h-8 bg-[#A49AFF] rounded-full flex items-center justify-center hover:bg-purple-400 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 md:w-14 md:h-8 bg-[#878EFF] rounded-full flex items-center justify-center hover:bg-purple-500 transition-colors">
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Right Map */}
            <div className="grid grid-cols-1 gap-8 md:gap-12 items-center">
              <div className="space-y-6 md:space-y-8">
                <div className="text-center lg:text-left">

                  <TestimonialCarousel />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-14 md:py-20 bg-gradient-to-r from-blue-100/40 to-purple-100/40">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold text-[#3839C9] mb-2 md:mb-4 tracking-tight">
            Onboardticket is perfect for...
          </h2>
          <p className="text-lg md:text-2xl font-bold text-[#3839C9] mb-8 md:mb-16">
            Many People including
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Digital Nomads*/}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/L-Lightning.png"
                    alt="Lightning Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Digital Nomads
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/*  Frequent travelers*/}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/public/Flight Landing Page.png"
                    alt="Verified Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Frequent travelers
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/* Visa applicants */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#EAEBF4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/public/Flight Landing Page.png"
                    alt="Secure Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Visa applicants
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
            {/* Last minute trips */}
            <div className="relative flex flex-col justify-center h-40 md:h-56">
              <div className="gradient-box-pink rounded-2xl p-6 md:p-8 w-full h-full flex flex-row items-center shadow-lg">
                <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6">
                  <img
                    src="/F-Wallet@3x.png"
                    alt="Wallet Icon"
                    className="w-7 h-7 md:w-10 md:h-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                    Last minute trips
                  </h3>
                  <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                    Arrives instantly via email. No delay or stress (cue sigh of
                    relief!).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <button className="flex items-center gap-2 md:gap-4 bg-[#3839C9] text-white px-6 md:px-10 py-3 md:py-4 rounded-xl font-semibold text-lg md:text-xl mx-auto hover:bg-blue-700 transition-colors shadow-lg">
            <Navigation className="w-5 h-5 md:w-6 md:h-6" />
            Book Now
          </button>
          <p className="text-xs md:text-sm font-bold text-[#637996] mt-2 md:mt-4">
            instant & secure Booking from Just 10$
          </p>
        </div>
      </section>


      {/* Flexibility Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl text-left md:text-5xl font-extrabold text-[#191A78] mb-2 md:mb-4 tracking-tight font-jakarta">
            More flexibility while 
            <br/>
            securing your visa
          </h2>
          <p className="text-lg text-left md:text-2xl text-[#8A8A8F] mb-8 md:mb-16 font-light font-jakarta">
            Most embassies encourage travelers to wait for 
            <br/>
            visa approval before purchasing a full priced plane ticket
          </p>

          <div className="flex flex-row justify-center gap-8 md:gap-12 w-full">
            {/* British Embassy */}
            <div
              className="relative flex flex-row items-start justify-start"
              style={{
                width: 400,
                height: 406,
                background: 'radial-gradient(ellipse at right, #FFF7F9 25%, #9A97ED 95%)',
                borderRadius: '1rem',
                boxShadow: '0 10px 32px 0 rgba(60, 60, 120, 0.10)',
                padding: '2rem',
                margin: '0',
              }}
            >
              <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6 mt-0">
                <img
                  src="/L-Lightning.png"
                  alt="Lightning Icon"
                  className="w-7 h-7 md:w-10 md:h-10 object-contain"
                />
              </div>
              <div className="flex-1 text-left w-full mt-0 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                  Fast Reservation
                </h3>
                <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                  Arrives instantly via email. No delay or stress (cue sigh of relief!).
                </p>
              </div>
            </div>
            {/* Spanish Embassy*/}
            <div
              className="relative flex flex-row items-start justify-start"
              style={{
                width: 400,
                height: 406,
                background: 'radial-gradient(ellipse at right, #FFC022 60%, #FCACBD 75%)',
                borderRadius: '1rem',
                boxShadow: '0 10px 32px 0 rgba(60, 60, 120, 0.10)',
                padding: '2rem',
                margin: '0',
              }}
            >
              <div className="bg-[#EAEBF4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6 mt-0">
                <img
                  src="/public/Flight Landing Page.png"
                  alt="Secure Icon"
                  className="w-7 h-7 md:w-10 md:h-10 object-contain"
                />
              </div>
              <div className="flex-1 text-left w-full mt-0 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                  Secure & Easy
                </h3>
                <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                  Arrives instantly via email. No delay or stress (cue sigh of relief!).
                </p>
              </div>
            </div>
            {/* Uceland Embassy */}
            <div
              className="relative flex flex-row items-start justify-start"
              style={{
                width: 400,
                height: 406,
                background: 'radial-gradient(ellipse at right, #FFFFFF 14%, #FCACBD 55%, #5F59F9 95%)',
                borderRadius: '1rem',
                boxShadow: '0 10px 32px 0 rgba(60, 60, 120, 0.10)',
                padding: '2rem',
                margin: '0',
              }}
            >
              <div className="bg-[#FFECE4] rounded-full w-14 h-14 md:w-20 md:h-20 flex items-center justify-center mr-6 mt-0">
                <img
                  src="/F-Wallet@3x.png"
                  alt="Wallet Icon"
                  className="w-7 h-7 md:w-10 md:h-10 object-contain"
                />
              </div>
              <div className="flex-1 text-left w-full mt-0 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 font-jakarta">
                  Save Money
                </h3>
                <p className="text-white text-base md:text-lg font-semibold font-jakarta">
                  Arrives instantly via email. No delay or stress (cue sigh of relief!).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Airlines Section */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-5xl font-extrabold text-[#3839C9] mb-4 md:mb-8 leading-tight tracking-tight">
                OnboardTicket
                <br />
                works with 100+ airlines
              </h2>
            </div>
            <div className="space-y-4 md:space-y-8">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c9f87de84ff01034d6ecf65784898b050d419a20?width=700"
                alt="Airline logos"
                className="w-full h-auto max-w-[320px] md:max-w-[500px] mx-auto object-contain"
                loading="lazy"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/30d6d41d8954a72ac53401c6879d9b0e3ed3d563?width=364"
                  alt="Additional airlines"
                  className="w-full h-auto max-w-[140px] md:max-w-[250px] mx-auto object-contain"
                  loading="lazy"
                />
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/3325f816653c0bcf2882205932e679480dd05514?width=384"
                  alt="More airlines"
                  className="w-full h-auto max-w-[140px] md:max-w-[250px] mx-auto object-contain"
                  loading="lazy"
                />
              </div>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/b8fd64070a4f25f07abef68afe80f3b94c38b5c6?width=462"
                alt="Final airline logos"
                className="w-full h-auto max-w-[200px] md:max-w-[350px] mx-auto object-contain"
                loading="lazy"
              />
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                <button className="border-2 border-[#5225B8] text-[#233789] px-6 md:px-8 py-2 md:py-3 rounded-xl font-medium text-base md:text-lg hover:bg-purple-50 transition-colors">
                  See sample ticket
                </button>
                <button className="flex items-center gap-2 md:gap-4 bg-[#3839C9] text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-colors">
                  <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                  Book Now
                </button>
              </div>
              <div className="space-y-1 md:space-y-2 text-center">
                <p className="text-xs md:text-sm font-bold text-[#637996]">
                  Check the ticket Sample
                </p>
                <p className="text-xs md:text-sm font-bold text-[#637996]">
                  instant & secure Booking from Just 10$
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl md:text-6xl font-extrabold text-[#3839C9] mb-4 md:mb-8 tracking-tight">
            Need Help ?
          </h2>
          <h3 className="text-lg md:text-3xl font-semibold text-black mb-2 md:mb-4">
            Get support within 30 min, on average
          </h3>
          <p className="text-base md:text-3xl text-black font-light mb-6 md:mb-16">
            Check out our frequently asked questions below or reach
            <br />
            out to our team for fast, friendly support
          </p>
          <div className="gradient-box-light rounded-2xl p-6 md:p-12 space-y-4 md:space-y-8">
            <div className="space-y-3 md:space-y-6">
              <p className="text-xs md:text-base text-black font-light">
                Check out our frequently asked questions below or reach
                <br />
                out to our team for fast, friendly support
              </p>

              <div className="space-y-2 md:space-y-4">
                <div>
                  <h4 className="text-base md:text-xl font-semibold text-black">
                    About Onplane ticket ?
                  </h4>
                  <hr className="border-[#1E1E1E] opacity-15 mt-1 md:mt-2" />
                </div>

                <div>
                  <h4 className="text-base md:text-xl font-semibold text-black">
                    Why Onplane ticket ?
                  </h4>
                  <hr className="border-[#1E1E1E] opacity-15 mt-1 md:mt-2" />
                </div>

                <div>
                  <h4 className="text-base md:text-xl font-semibold text-black">
                    How does Onplane ticket work ?
                  </h4>
                  <hr className="border-[#1E1E1E] opacity-15 mt-1 md:mt-2" />
                </div>

                <div className="flex items-center justify-between py-1 md:py-2">
                  <h4 className="text-lg md:text-2xl font-semibold text-black">
                    Tickets & Reservations ?
                  </h4>
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#252525]" />
                </div>

                <div className="flex items-center justify-between py-1 md:py-2">
                  <h4 className="text-lg md:text-2xl font-semibold text-black">
                    Issues With Your Order ?
                  </h4>
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#252525]" />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6 md:mt-12">
            <button className="bg-[#3839C9] text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-semibold text-base md:text-xl hover:bg-blue-700 transition-colors">
              See More FAQ
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-10 md:py-16 border-t border-[#E7E9FF]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            {/* Logo and Copyright */}
            <div className="space-y-2 md:space-y-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/86571e8ae19f08bed4e703167c14dced95f0167b?width=410"
                alt="OnboardTicket Footer Logo"
                className="h-6 md:h-10 w-auto max-w-[120px] md:max-w-[180px] object-contain"
                loading="lazy"
              />
              <hr className="border-black w-40 md:w-72" />
              <h4 className="font-semibold text-black text-sm md:text-base">
                Onboardticket.com
              </h4>
              <p className="text-[10px] md:text-xs font-semibold text-[#303850] opacity-50">
                © 2025 — Copyright
              </p>
              <p className="text-[10px] md:text-xs font-semibold text-[#303850] opacity-50 leading-relaxed max-w-xs md:max-w-sm">
                OnboardTicket is committed to upholding the highest standards in
                compliance with international civil aviation regulations and
                ethical booking practices. This includes, but is not limited to,
                strict avoidance of misuse of booking classes, fraudulent
                activities, duplicate, speculative, or fictitious reservations.
                Users who engage in repeated cancellations without legitimate
                intent will be subject to monitoring, and may face usage
                restrictions or permanent bans from our platform.
              </p>
            </div>
            {/* About */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">
                About
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm font-semibold text-[#A2A2A2]">
                <li>Who We are ?</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>
            {/* Get Help */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">
                Get Help
              </h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm font-semibold text-[#A2A2A2]">
                <li>FAQs</li>
                <li>Reviews</li>
                <li>Contact Support 24/7</li>
              </ul>
            </div>
            {/* Follow Us */}
            <div className="space-y-2 md:space-y-4">
              <h4 className="text-base md:text-lg font-bold text-[#0D69F2]">
                Follow US
              </h4>
              <Instagram className="w-5 h-5 md:w-7 md:h-7 text-[#A2A2A2]" />

              <div className="space-y-1 md:space-y-2">
                <h5 className="text-base md:text-lg font-bold text-[#0D69F2]">
                  Stay in touch
                </h5>
                <p className="text-xs md:text-sm font-semibold text-[#A2A2A2]">
                  Blog
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
