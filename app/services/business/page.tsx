import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getServicesBusiness } from "@/lib/db";
import {
  Users,
  Wallet,
  CreditCard,
  GraduationCap,
  Ship,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap = {
  Users,
  Wallet,
  CreditCard,
  GraduationCap,
  Ship,
  Calendar,
};

export const revalidate = 60

export default async function ServicesBusiness() {
  const servicesBusiness = await getServicesBusiness()
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
                Pour les professionnels
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Services <span className="gradient-text">Business</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Solutions de paiement et collecte pour entreprises et institutions
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Paiement de Masse - Featured */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 mb-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Paiement de Masse</h2>
                <p className="text-muted-foreground mb-6">
                  {servicesBusiness[0].description}
                </p>

                <h3 className="font-semibold mb-3">Caractéristiques</h3>
                <ul className="space-y-2 mb-6">
                  {servicesBusiness[0].characteristics?.map((char, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="font-semibold mb-3">{"Cas d'usage"}</h3>
                <div className="flex flex-wrap gap-2">
                  {servicesBusiness[0].useCases?.map((useCase, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Avantages</h3>
                <ul className="space-y-3">
                  {servicesBusiness[0].advantages?.map((adv, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-xs text-primary-foreground font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-muted-foreground">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Collecte B-MO Pay */}
          <div className="glass-card rounded-3xl p-8 lg:p-12 mb-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="w-16 h-16 gradient-blue rounded-2xl flex items-center justify-center mb-6">
                  <Wallet className="w-8 h-8 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Collecte B-MO Pay</h2>
                <p className="text-muted-foreground mb-6">
                  {servicesBusiness[1].description}
                </p>

                <h3 className="font-semibold mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {servicesBusiness[1].characteristics?.map((char, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted/50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Procédure de collecte</h3>
                <ol className="space-y-2">
                  {servicesBusiness[1].steps?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="w-6 h-6 bg-accent/10 text-accent rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* TPE B-MO */}
          <div className="glass-card rounded-3xl p-8 mb-12" id="tpe">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 gradient-mixed rounded-2xl flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">TPE B-MO</h2>
                <p className="text-sm text-primary font-medium mb-4">
                  Modèle: FEITIAN F20
                </p>
                <p className="text-muted-foreground mb-4">
                  {servicesBusiness[2].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {servicesBusiness[2].features?.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-sm bg-muted px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Other Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesBusiness.slice(3).map((service, index) => {
              const IconComponent =
                iconMap[service.icon as keyof typeof iconMap] || Calendar;

              return (
                <div
                  key={index}
                  id={service.id}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {service.description}
                  </p>

                  {service.features && (
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {service.useCases && (
                    <div className="flex flex-wrap gap-2">
                      {service.useCases.map((useCase, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Devenez partenaire B-MO</h2>
            <p className="text-muted-foreground mb-8">
              Contactez notre équipe commerciale pour intégrer les solutions B-MO
              dans votre entreprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground"
              >
                Nous contacter
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <a href="tel:+22901606087">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary w-full sm:w-auto"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  +229 0160 60 87 88
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
