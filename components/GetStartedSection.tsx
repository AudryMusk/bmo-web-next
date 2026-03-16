import { UserPlus, Smartphone, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const stepsUSSD = [
  {
    icon: Smartphone,
    number: "01",
    title: "Tapez *890#",
    description:
      "Composez le code USSD sur votre téléphone, sans connexion internet.",
  },
  {
    icon: UserPlus,
    number: "02",
    title: "Choisissez Client → Inscription",
    description:
      "Entrez votre prénom et nom. Recevez votre code PIN à 6 chiffres par SMS.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Commencez à utiliser B-MO",
    description:
      "Transférez, payez vos factures et gérez votre argent en toute simplicité.",
  },
];

const stepsApp = [
  {
    icon: Smartphone,
    number: "01",
    title: "Téléchargez BESTCASH",
    description:
      "Disponible sur Play Store. Recherchez 'BESTCASH' et installez l'app.",
  },
  {
    icon: UserPlus,
    number: "02",
    title: "Inscrivez-vous",
    description: "Entrez votre numéro, nom, prénom, adresse et email.",
  },
  {
    icon: Wallet,
    number: "03",
    title: "Recevez votre PIN",
    description: "Un code à 6 chiffres vous sera envoyé par notification.",
  },
];

const GetStartedSection = () => {
  return (
    <section className="py-20 lg:py-32 hero-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
            Comment ça marche
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in-up delay-100">
            Créez votre compte en
            <br />
            <span className="gradient-text">quelques minutes</span>
          </h2>
        </div>
OryStart
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Via USSD */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Via Code USSD
              </h3>
            </div>

            <div className="space-y-6">
              {stepsUSSD.map((step, index) => (
                <div
                  key={step.title}
                  className="glass-card rounded-2xl p-6 flex items-start gap-5 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center relative">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-background border border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="mt-8 border-primary text-primary hover:bg-primary/10 font-bold"
            >
              <Link href="tel:*890%23">
                <Smartphone className="mr-2 w-5 h-5" />
                Composez *890#
              </Link>
            </Button>
          </div>

          {/* Via App */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                Via Application
              </h3>
            </div>

            <div className="space-y-6">
              {stepsApp.map((step, index) => (
                <div
                  key={step.title}
                  className="glass-card rounded-2xl p-6 flex items-start gap-5 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center relative">
                      <step.icon className="w-6 h-6 text-primary-foreground" />
                      <span className="absolute -top-2 -right-2 w-6 h-6 bg-background border border-primary rounded-full flex items-center justify-center text-xs font-bold text-primary">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              size="lg"
              className="mt-8 gradient-primary text-primary-foreground hover:opacity-90"
            >
              <Link href="/telechargement">Télécharger sur Play Store</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStartedSection;
