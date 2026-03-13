import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "500M", label: "Capital Social", suffix: " FCFA" },
  { value: "158", label: "Agences Microfinances", suffix: "+" },
  { value: "8", label: "Distributeurs Régionaux", suffix: "" },
  { value: "30", label: "GAB UBA", suffix: "+" },
];

const StatsSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
            Notre Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up delay-100">
            B-MO en Chiffres
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Emmanuel La Grâce SA, partenaire stratégique de la banque UBA et
            distributeur principal du produit BESTCASH, œuvre pour l&apos;inclusion
            financière au Bénin.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2">
                {stat.value}
                <span className="gradient-text">{stat.suffix}</span>
              </div>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mt-16 glass-card rounded-2xl p-8 animate-fade-in-up delay-400">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">
            Conformités & Agréments
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground font-bold text-xl">
                  BCEAO
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Agrément B00/SSMP/00369-2022
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 border-primary border-2 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-accent-foreground font-bold text-xl">
                  APDP
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protection des données personnelles
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20  gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-foreground font-bold text-xl">
                  ARCEP
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Code USSD{" "}
                <Link href="tel:*890%23" className="text-primary hover:underline">
                  *890#
                </Link>{" "}
                approuvé
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20  border-primary border-2 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <span className="text-accent-foreground font-bold text-xl">
                  DGSF
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Services financiers validés
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/a-propos">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              En savoir plus sur B-MO
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
