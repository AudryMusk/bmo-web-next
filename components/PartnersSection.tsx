import { Building, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Microfinance = { id: string; name: string; agencies: number; logo?: string | null };
type Distributeur = { id: string; name: string; location: string; phone?: string | null; logo?: string | null };
type Partenaire = { id: string; name: string; category: string; description?: string | null; logo?: string | null };

const PartnersSection = ({
  microfinances,
  distributeurs,
  partenaires,
}: {
  microfinances: Microfinance[];
  distributeurs: Distributeur[];
  partenaires: Partenaire[];
}) => {
  const totalAgences = microfinances.reduce((sum, mf) => sum + mf.agencies, 0);

  return (
    <section
      id="partenaires"
      className="py-20 lg:py-32 hero-gradient relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
            Notre Réseau
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up delay-100">
            Partenaires & Distributeurs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Un réseau solide de partenaires financiers et distributeurs à
            travers tout le Bénin
          </p>
        </div>

        {/* Microfinances Grid */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Building className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Microfinances Partenaires
            </h3>
            <span className="ml-auto text-primary font-bold">
              {totalAgences} agences
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
            {microfinances.map((mf, index) => (
              <div
                key={mf.id}
                className="glass-card rounded-xl p-4 text-center hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-primary mx-auto mb-2 flex items-center justify-center overflow-hidden">
                  {mf.logo ? (
                    <img
                      src={mf.logo}
                      alt={mf.name}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Building className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <p className="text-foreground font-semibold text-sm mb-1">
                  {mf.name}
                </p>
                <p className="text-primary font-bold text-lg">{mf.agencies}</p>
                <p className="text-muted-foreground text-xs">agences</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distributeurs */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold text-foreground">
              Distributeurs Régionaux
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {distributeurs.map((dist, index) => (
              <div
                key={dist.id}
                className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center overflow-hidden">
                    {dist.logo ? (
                      <img
                        src={dist.logo}
                        alt={dist.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Users className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <h4 className="text-foreground font-semibold">
                    {dist.name}
                  </h4>
                </div>
                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{dist.location}</span>
                </div>
                {dist.phone && (
                  <p className="text-primary font-medium text-sm">
                    {dist.phone}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partenaires Officiels */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Nos Partenaires Officiels
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {partenaires.map((partner, index) => (
              <div
                key={partner.id}
                className="glass-card rounded-xl px-6 py-3 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg gradient-mixed flex items-center justify-center overflow-hidden">
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <Users className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>
                  <span className="text-foreground font-bold">{partner.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/reseau">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Voir tout le réseau
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
