import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  companyInfo,
  vision,
  mission,
  values,
  regulatoryCompliance,
} from "@/data/bmo-data";
import {
  Shield,
  Eye,
  Target,
  Heart,
  Lock,
  Users,
  CheckCircle2,
  Building2,
  Award,
} from "lucide-react";

const valueIcons = {
  Accessibilité: Eye,
  Transparence: Target,
  Sécurité: Lock,
  Collaboration: Users,
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-light rounded-full mb-6">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                {companyInfo.parentCompany}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Qui sommes-nous ?
            </h1>

            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {companyInfo.parentCompany}, partenaire stratégique de la banque
              UBA et distributeur principal du produit BESTCASH, est une société
              anonyme régie par le droit béninois avec un capital social de{" "}
              <span className="text-primary font-semibold">
                {companyInfo.capital}
              </span>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Vision */}
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
              <p className="text-muted-foreground leading-relaxed">{vision}</p>
            </div>

            {/* Mission */}
            <div className="glass-card rounded-3xl p-8 lg:p-10">
              <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-muted-foreground leading-relaxed">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Nos Valeurs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les principes fondamentaux qui guident chacune de nos actions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent =
                valueIcons[value.title as keyof typeof valueIcons] || Heart;
              return (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card-light rounded-full mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Conformité & Réglementation
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Reconnaissance Officielle
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Emmanuel La Grâce (ELG), à travers le produit B-MO, respecte
              toutes les exigences légales et a reçu toutes les autorisations
              nécessaires en matière de distribution de la monnaie électronique
              au Bénin.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {regulatoryCompliance.map((item, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 lg:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold">{item.authority}</h3>
                      {item.reference && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                          {item.reference}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {item.description}
                    </p>

                    {item.benefits && (
                      <ul className="space-y-2">
                        {item.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 lg:p-12">
            <h2 className="text-2xl font-bold mb-8 text-center">
              Informations Légales
            </h2>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Raison sociale
                  </p>
                  <p className="font-semibold">{companyInfo.parentCompany}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Capital social</p>
                  <p className="font-semibold">{companyInfo.capital}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Agrément BCEAO
                  </p>
                  <p className="font-semibold text-primary">
                    {companyInfo.agreement}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IFU</p>
                  <p className="font-semibold">{companyInfo.ifu}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Téléphone</p>
                  <p className="font-semibold">{companyInfo.phone}</p>
                  <p className="text-sm text-muted-foreground">
                    {companyInfo.altPhones.join(" / ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-semibold">{companyInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sites web</p>
                  {companyInfo.websites.map((site, idx) => (
                    <a
                      key={idx}
                      href={site}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-primary hover:underline"
                    >
                      {site}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground">Siège social</p>
              <p className="font-medium">{companyInfo.address}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
