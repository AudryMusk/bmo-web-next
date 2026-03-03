import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { servicesParticuliers } from "@/data/bmo-data";
import {
  ArrowLeftRight,
  Receipt,
  Wifi,
  Banknote,
  ArrowUpDown,
  Globe,
  ArrowRight,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap = {
  ArrowLeftRight,
  Receipt,
  Wifi,
  Banknote,
  ArrowUpDown,
  Globe,
};

export default function ServicesParticuliers() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-light rounded-full mb-6">
              <span className="text-sm text-muted-foreground">
                Pour les particuliers
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Services <span className="gradient-text">Particuliers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transférez, payez, retirez – tout depuis votre téléphone avec B-MO
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {servicesParticuliers.map((service, index) => {
              const IconComponent =
                iconMap[service.icon as keyof typeof iconMap] || ArrowLeftRight;

              return (
                <div
                  key={index}
                  id={service.id}
                  className="glass-card rounded-3xl p-8 scroll-mt-24"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                      <p className="text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3">
                      Fonctionnalités
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-sm bg-muted px-3 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Procedures */}
                  {service.ussdSteps && service.appSteps && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* USSD */}
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Smartphone className="w-4 h-4 text-primary" />
                          <h4 className="font-semibold text-sm">
                            Via USSD *890#
                          </h4>
                        </div>
                        <ol className="space-y-1">
                          {service.ussdSteps.slice(0, 5).map((step, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                          {service.ussdSteps.length > 5 && (
                            <li className="text-xs text-primary">
                              +{service.ussdSteps.length - 5} étapes...
                            </li>
                          )}
                        </ol>
                      </div>

                      {/* App */}
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Monitor className="w-4 h-4 text-accent" />
                          <h4 className="font-semibold text-sm">
                            Via l&apos;Application
                          </h4>
                        </div>
                        <ol className="space-y-1">
                          {service.appSteps.slice(0, 5).map((step, idx) => (
                            <li
                              key={idx}
                              className="text-xs text-muted-foreground flex items-start gap-2"
                            >
                              <span className="w-4 h-4 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                          {service.appSteps.length > 5 && (
                            <li className="text-xs text-accent">
                              +{service.appSteps.length - 5} étapes...
                            </li>
                          )}
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* Push & Pull specific */}
                  {service.linkingMethods && (
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <h4 className="font-semibold text-sm mb-2">
                          {service.linkingMethods.automatic.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3">
                          {service.linkingMethods.automatic.description}
                        </p>
                        <ol className="space-y-1">
                          {service.linkingMethods.automatic.steps
                            .slice(0, 4)
                            .map((step, idx) => (
                              <li
                                key={idx}
                                className="text-xs text-muted-foreground flex items-start gap-2"
                              >
                                <span className="w-4 h-4 bg-primary/10 text-primary rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">
                                  {idx + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                        </ol>
                      </div>
                      <div className="bg-muted/50 rounded-2xl p-4">
                        <h4 className="font-semibold text-sm mb-2">
                          {service.linkingMethods.manual.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          {service.linkingMethods.manual.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
            <p className="text-muted-foreground mb-8">
              Créez votre compte B-MO en quelques minutes et accédez à tous ces
              services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground"
              >
                Télécharger l&apos;App
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary"
              >
                <Smartphone className="mr-2 w-5 h-5" />
                Tapez *890#
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
