import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Services: [
    { name: "Transferts", href: "/services/particuliers#transfers" },
    { name: "Paiement Factures", href: "/services/particuliers#bills" },
    { name: "Crédits & Forfaits", href: "/services/particuliers#airtime" },
    { name: "Retrait GAB UBA", href: "/services/particuliers#withdrawal" },
    { name: "Push & Pull", href: "/services/particuliers#pushpull" },
  ],
  Entreprises: [
    { name: "Paiement de Masse", href: "/services/business#mass-payment" },
    { name: "Collecte B-MO Pay", href: "/services/business#collection" },
    { name: "TPE B-MO", href: "/services/business#tpe" },
    { name: "Transfert Planifié", href: "/services/business#scheduled" },
  ],
  Liens: [
    { name: "Tarifs", href: "/tarifs" },
    { name: "Réseau", href: "/reseau" },
    { name: "Blog", href: "/blog" },
    { name: "À propos", href: "/a-propos" },
    { name: "Contact", href: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-card py-16 lg:py-20 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/bmo-logo.png" alt="bmo logo" className="max-h-20" />
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-sm">
              Solution de paiement digital et de mobile banking pour simplifier
              vos transactions financières au Bénin et en Afrique.
            </p>

            <div className="space-y-3 mb-6">
              <a
                href="tel:+2290148414813"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+229 01 48 41 48 13</span>
              </a>
              <a
                href="tel:+2290161844447"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">+229 01 61 84 44 47</span>
              </a>
              <a
                href="mailto:info@bestcash.me"
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">info@bestcash.me</span>
              </a>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  Fidjrossè, Cotonou - Bénin
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-foreground font-semibold mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certifications Bar */}
        <div className="py-6 border-t border-b border-border mb-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span>Agrément BCEAO: B00/SSMP/00369-2022</span>
            <span className="hidden sm:inline">•</span>
            <span>IFU: 3201710041944</span>
            <span className="hidden sm:inline">•</span>
            <span>Partenaire UBA</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Emmanuel La Grâce SA - B-MO. Tous
            droits réservés.
          </p>
          <div className="flex gap-6">
            <Link
              href="/a-propos"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/a-propos"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              {"Conditions d'utilisation"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
