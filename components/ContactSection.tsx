import { Mail, Phone, MapPin, Globe } from "lucide-react";
import ContactFormClient from "@/components/ContactFormClient";

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-20 lg:py-32 hero-gradient relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
              Contact
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up delay-100">
              Contactez-nous
              <br />
              <span className="gradient-text">Nous sommes là pour vous</span>
            </h2>

            <p className="text-muted-foreground mb-12 leading-relaxed animate-fade-in-up delay-200">
              Notre équipe est disponible pour répondre à vos questions et vous
              accompagner dans l&apos;utilisation de B-MO.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Phone,
                  label: "Téléphone",
                  value: "+229 0160608788",
                  secondary: "+229 0154102179",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@bestcash.me",
                  secondary: null,
                },
                {
                  icon: Globe,
                  label: "Sites Web",
                  value: "www.bmo.bj",
                  secondary: "www.bestcash.me",
                },
                {
                  icon: MapPin,
                  label: "Siège",
                  value: "Fidjrossè, route des pêches",
                  secondary: "Cotonou - Bénin",
                },
              ].map((contact, index) => (
                <div
                  key={contact.label}
                  className="flex items-start gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {contact.label}
                    </p>
                    <p className="text-foreground font-medium">
                      {contact.value}
                    </p>
                    {contact.secondary && (
                      <p className="text-foreground font-medium">
                        {contact.secondary}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* IFU */}
            <div className="mt-8 glass-card rounded-xl p-4 inline-block animate-fade-in-up delay-500">
              <p className="text-sm text-muted-foreground">
                IFU:{" "}
                <span className="text-foreground font-medium">
                  3201710041944
                </span>
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="glass-card rounded-3xl p-8 animate-fade-in-right">
            <h3 className="text-xl font-bold text-foreground mb-6">
              Envoyez-nous un message
            </h3>
            <ContactFormClient />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
