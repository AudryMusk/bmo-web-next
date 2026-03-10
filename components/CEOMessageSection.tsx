"use client";

import { useState, useEffect, useRef } from "react";
import { Quote } from "lucide-react";

const CEOMessageSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-32 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo du PDG */}
            <div
              className={`relative transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
            >
              <div className="relative">
                {/* Cadre décoratif */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-xl" />
                <div className="absolute -inset-1 bg-gradient-to-br from-primary to-accent rounded-3xl opacity-20" />

                {/* Image container */}
                <div className="relative bg-card rounded-3xl overflow-hidden shadow-2xl">
                  <div className="aspect-[4/5] flex items-center justify-center bg-[url('/pdg-bestcash.png')] bg-cover bg-center" />

                  {/* Badge de titre */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent p-6 pt-12">
                    <h3 className="text-xl font-bold text-foreground">
                      Président Directeur Général
                    </h3>
                    <p className="text-primary font-semibold">
                      EMMANUEL LA GRACE SA
                    </p>
                  </div>
                </div>

                {/* Éléments flottants */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-2xl rotate-12 blur-sm" />
                <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-primary/20 rounded-full blur-sm" />
              </div>
            </div>

            {/* Message du PDG */}
            <div
              className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
            >
              <div className="relative">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Quote className="w-8 h-8 text-primary" />
                </div>

                <div className="pl-8 pt-8">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                    Message du{" "}
                    <span className="gradient-text">Président</span>
                  </h2>

                  <blockquote className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      &ldquo;Chez{" "}
                      <span className="font-semibold text-foreground">
                        B-MO
                      </span>
                      , notre vision est claire :
                      <span className="text-primary font-medium">
                        {" "}
                        démocratiser l&apos;accès aux services financiers
                      </span>{" "}
                      pour tous les Béninois, où qu&apos;ils se trouvent.
                    </p>
                    <p>
                      Avec l&apos;agrément{" "}
                      <span className="font-semibold text-foreground">
                        B00/SSMP/00369-2022
                      </span>{" "}
                      de la BCEAO, nous nous engageons à offrir des solutions de
                      paiement
                      <span className="text-accent font-medium">
                        {" "}
                        sécurisées, rapides et accessibles
                      </span>
                      .
                    </p>
                    <p>
                      Notre partenariat stratégique avec{" "}
                      <span className="font-semibold text-foreground">UBA</span>{" "}
                      et nos 158 agences partenaires nous permettent d&apos;être au
                      plus près de vous, pour transformer ensemble l&apos;avenir du
                      paiement digital au Bénin.&rdquo;
                    </p>
                  </blockquote>

                  {/* Signature stylisée */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary-foreground font-bold text-lg">
                          B
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-foreground">
                          BESTCASH MONEY
                        </p>
                        <p className="text-sm text-muted-foreground">
                          La monnaie électronique de confiance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CEOMessageSection;
