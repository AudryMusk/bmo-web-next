import {
  Smartphone,
  CreditCard,
  Zap,
  Building2,
  Globe,
  Tv,
  Receipt,
  Wallet,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Smartphone,
    title: "Transferts Mobile Money",
    description:
      "Envoyez de l'argent vers MTN MoMo, Moov Money et Celtiis Cash instantanément.",
    href: "/services/particuliers#transfers",
  },
  {
    icon: CreditCard,
    title: "Crédits & Forfaits",
    description:
      "Achetez du crédit d'appel et des forfaits internet sur tous les réseaux GSM.",
    href: "/services/particuliers#airtime",
  },
  {
    icon: Zap,
    title: "Factures SBEE",
    description:
      "Payez vos factures d'électricité prépayées et postpayées en quelques clics.",
    href: "/services/particuliers#bills",
  },
  {
    icon: Tv,
    title: "Réabonnement Canal+",
    description:
      "Gérez vos abonnements Canal+ simplement depuis votre compte B-MO.",
    href: "/services/particuliers#bills",
  },
  {
    icon: Building2,
    title: "Retrait GAB UBA",
    description:
      "Retirez de l'argent aux guichets automatiques UBA partout au Bénin.",
    href: "/services/particuliers#withdrawal",
  },
  {
    icon: Globe,
    title: "Transfert International",
    description:
      "Recevez des fonds Western Union et MoneyGram directement sur votre compte.",
    href: "/services/particuliers#international",
  },
  {
    icon: Receipt,
    title: "B-MO Pay",
    description:
      "Payez vos achats en ligne et en magasin via votre compte B-MO.",
    href: "/services/business#collection",
  },
  {
    icon: Wallet,
    title: "Push & Pull Bancaire",
    description:
      "Transférez entre votre compte B-MO et votre compte bancaire UBA.",
    href: "/services/particuliers#pushpull",
  },
];

const FeaturesSection = () => {
  return (
    <section id="services" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up delay-100">
            Tout pour simplifier vos finances
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            B-MO offre une gamme complète de services financiers digitaux pour
            particuliers et entreprises
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="group glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/services/particuliers">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Services Particuliers
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/services/business">
            <Button
              variant="outline"
              className="border-accent text-accent hover:bg-accent/10"
            >
              Services Business
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
