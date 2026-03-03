import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  companyInfo,
  inscriptionUSSD,
  inscriptionApp,
} from "@/data/bmo-data";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Smartphone,
  Monitor,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Contactez-<span className="gradient-text">nous</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos
              questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-8">Nos coordonnées</h2>

              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Téléphone</h3>
                      <p className="text-lg font-bold text-primary">
                        {companyInfo.phone}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {companyInfo.altPhones.join(" / ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Email</h3>
                      <a
                        href={`mailto:${companyInfo.email}`}
                        className="text-lg font-bold text-primary hover:underline"
                      >
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 gradient-mixed rounded-xl flex items-center justify-center flex-shrink-0">
                      <Globe className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Sites Web</h3>
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

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Siège social</h3>
                      <p className="text-muted-foreground">
                        {companyInfo.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* USSD Quick Access */}
              <div className="mt-8 p-6 bg-primary/10 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">
                      *
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Accès rapide</p>
                    <p className="text-3xl font-bold text-primary">
                      {companyInfo.ussd}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold mb-6">
                Envoyez-nous un message
              </h2>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Nom</label>
                    <Input placeholder="Votre nom" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Prénom
                    </label>
                    <Input placeholder="Votre prénom" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="votre@email.com" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Téléphone
                  </label>
                  <Input type="tel" placeholder="+229 XX XX XX XX" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Sujet</label>
                  <Input placeholder="Objet de votre message" />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Message
                  </label>
                  <Textarea placeholder="Votre message..." rows={5} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-primary text-primary-foreground"
                >
                  Envoyer le message
                  <Send className="ml-2 w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* How to Create Account */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Comment créer son compte B-MO ?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Deux méthodes simples pour rejoindre B-MO
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* USSD Method */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{inscriptionUSSD.title}</h3>
                  <p className="text-sm text-muted-foreground">Sans internet</p>
                </div>
              </div>

              <ol className="space-y-3">
                {inscriptionUSSD.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 gradient-primary rounded-full flex items-center justify-center flex-shrink-0 text-sm text-primary-foreground font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* App Method */}
            <div className="glass-card rounded-3xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 gradient-blue rounded-2xl flex items-center justify-center">
                  <Monitor className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{inscriptionApp.title}</h3>
                  <p className="text-sm text-muted-foreground">Via Play Store</p>
                </div>
              </div>

              <ol className="space-y-3">
                {inscriptionApp.steps.slice(0, 8).map((step, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 gradient-blue rounded-full flex items-center justify-center flex-shrink-0 text-sm text-primary-foreground font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-muted-foreground pt-1">{step}</span>
                  </li>
                ))}
                {inscriptionApp.steps.length > 8 && (
                  <li className="text-sm text-accent pl-10">
                    +{inscriptionApp.steps.length - 8} étapes...
                  </li>
                )}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
