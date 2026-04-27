import { Smartphone, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DownloadAppBtn from "./DownloadAppBtn";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen myCustomGradient01 overflow-hidden pt-28 lg:pt-0 pb-48 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-80px)] lg:pt-20">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Badge BCEAO */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-light rounded-full mb-6 animate-fade-in-up">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-red-700">
                Agrément BCEAO : B00/SSMP/00369-2022
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 animate-fade-in-up delay-100">
              <span className="text-white">Paiement Digital</span>
              <br />
              <span className="text-white whitespace-nowrap">Simple avec <span className="gradient-text">B-MO</span></span>
            </h1>

            <p className="text-lg text-white/75 max-w-lg mx-auto lg:mx-0 mb-8 animate-fade-in-up delay-200">
              Solution de mobile banking interopérable avec MTN MoMo, Moov
              Money et Celtiis Cash. Transférez, payez vos factures et gérez
              votre argent en toute sécurité.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <DownloadAppBtn />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 group font-bold"
              >
                <Link href="tel:*890%23">
                  <Smartphone className="mr-2 w-5 h-5" />
                  Tapez *890#
                </Link>
              </Button>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 animate-fade-in-up delay-400">
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  547+
                </p>
                <p className="text-sm text-yellow-500">Agences partenaires</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-white">28</p>
                <p className="text-sm text-yellow-500">Distributeurs</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-bold text-white">
                  30+
                </p>
                <p className="text-sm text-yellow-500">GAB UBA</p>
              </div>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/phone-mockup-1.png"
            alt="bmo app phone mockup"
            className="animate-float mx-auto order-1 lg:order-2"
          />
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 200V0Q720 120 1440 0V200H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
