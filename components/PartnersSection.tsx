import { Building, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const distributeurs = [
  {
    nom: "SAK-SERVICES",
    localisation: "Godomey Togoudo, Allégléta, Womey",
    tel: "01 97 70 73 73",
  },
  {
    nom: "RÈGNE DE L'ÉTERNEL",
    localisation: "Porto-Novo",
    tel: "01 97 33 95 23",
  },
  {
    nom: "NETSHOP",
    localisation: "Iita Tankpê, Parana, Ganvié",
    tel: "01 96 73 92 72",
  },
  {
    nom: "ALAKHBAAR SERVICE",
    localisation: "1er-4ième arrondissement",
    tel: "01 97 97 02 91",
  },
];

const microfinances = [
  { nom: "AFRICA FINANCES", agences: 20 },
  { nom: "COWEC", agences: 13 },
  { nom: "COMUBA", agences: 28 },
  { nom: "MDB", agences: 14 },
  { nom: "SIAN'SON", agences: 30 },
  { nom: "RENACA", agences: 39 },
  { nom: "LE DÉFIS", agences: 14 },
];

const partenaires = [
  "UBA",
  "BCEAO",
  "TerraPay",
  "ONAFRIQ",
  "Canal+",
  "SBEE",
  "CMA CGM",
  "UNICEF",
];

const PartnersSection = () => {
  const totalAgences = microfinances.reduce((sum, mf) => sum + mf.agences, 0);

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
                key={mf.nom}
                className="glass-card rounded-xl p-4 text-center hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-foreground font-semibold text-sm mb-1">
                  {mf.nom}
                </p>
                <p className="text-primary font-bold text-lg">{mf.agences}</p>
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
                key={dist.nom}
                className="glass-card rounded-xl p-5 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <h4 className="text-foreground font-semibold mb-2">
                  {dist.nom}
                </h4>
                <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{dist.localisation}</span>
                </div>
                <p className="text-primary font-medium text-sm">{dist.tel}</p>
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
                key={partner}
                className="glass-card rounded-xl px-6 py-3 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-foreground font-bold">{partner}</span>
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
