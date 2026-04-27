"use client";

import { useState } from "react";
import {
  Smartphone, CreditCard, Zap, Building2, Globe,
  Tv, Receipt, Wallet, ArrowRight, X, Smartphone as Phone2,
  Hash,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

type Procedure = { title: string; steps: string[] };

type Service = {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
  appProcedures: Procedure[];
  ussdProcedures?: Procedure[];
};

const services: Service[] = [
  {
    icon: Smartphone,
    title: "Transferts Mobile Money",
    description: "Envoyez de l'argent vers un compte B-MO ou vers les portefeuilles Mobile Money.",
    href: "/services/particuliers#transfers",
    appProcedures: [
      {
        title: "Transfert B-MO → B-MO",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transfert B-MO",
          "Choisissez Entrer le contact",
          "Saisissez le numéro du bénéficiaire, le montant et la raison",
          "Entrez le nom et prénom du bénéficiaire",
          "Cliquez sur Envoyer puis Confirmer",
          "Entrez votre code PIN",
        ],
      },
      {
        title: "Transfert vers Wallet Mobile (MTN, Moov, Celtiis)",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts → Wallet mobile → National",
          "Saisissez le numéro du bénéficiaire puis continuer",
          "Entrez le montant, nom et prénoms du bénéficiaire",
          "Choisissez la raison du transfert",
          "Cliquez sur Récapitulatif puis Confirmer",
          "Entrez votre code PIN",
        ],
      },
    ],
    ussdProcedures: [
      {
        title: "Transfert B-MO → B-MO (USSD uniquement)",
        steps: [
          "Tapez *890#",
          "Sélectionnez 1 – Client",
          "Choisissez Transfert B-MO",
          "Sélectionnez Entrer le contact",
          "Saisissez le numéro, montant, raison et nom du bénéficiaire",
          "Cliquez sur Envoyer puis Confirmer",
          "Entrez votre code PIN",
        ],
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Crédits & Forfaits",
    description: "Achetez du crédit d'appel et des forfaits internet sur tous les réseaux GSM.",
    href: "/services/particuliers#airtime",
    appProcedures: [
      {
        title: "Achat de forfait Internet",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Crédits et forfaits",
          "Choisissez Forfait internet",
          "Choisissez le bénéficiaire",
          "Cliquez sur Suivant, entrez le numéro puis continuer",
          "Choisissez l'offre et cliquez Suivant",
          "Cliquez sur Suivant et continuer",
          "Entrez votre code PIN",
        ],
      },
      {
        title: "Achat de forfait Mixte",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Crédits et forfaits",
          "Choisissez Forfait mixte",
          "Choisissez le bénéficiaire",
          "Cliquez sur Suivant, entrez le numéro puis continuer",
          "Choisissez l'offre et cliquez Suivant",
          "Cliquez sur Suivant et continuer",
          "Entrez votre code PIN",
        ],
      },
    ],
  },
  {
    icon: Zap,
    title: "Factures SBEE",
    description: "Payez vos factures d'électricité prépayées et postpayées en quelques clics.",
    href: "/services/particuliers#bills",
    appProcedures: [
      {
        title: "Achat de crédit SBEE",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Factures SBEE",
          "Choisissez Achat de crédit",
          "Saisissez le numéro de compteur et le montant",
          "Cliquez sur Suivant",
          "Faites le récapitulatif et confirmez",
          "Entrez votre code PIN",
        ],
      },
    ],
    ussdProcedures: [
      {
        title: "Paiement facture SBEE",
        steps: [
          "Composez *890#",
          "Sélectionnez 1 – Client",
          "Rendez-vous dans le menu 7 – Facture",
          "Sélectionnez 1 – Prépayé SBEE ou 2 – Postpayé SBEE",
          "Renseignez les informations du compteur",
          "Entrez votre mot de passe pour valider",
        ],
      },
    ],
  },
  {
    icon: Tv,
    title: "Réabonnement Canal+",
    description: "Gérez vos abonnements Canal+ simplement depuis votre compte B-MO.",
    href: "/services/particuliers#bills",
    appProcedures: [
      {
        title: "Réabonnement Canal+",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Réabonnement Canal+",
          "Choisissez Me réabonner",
          "Saisissez le numéro de la carte puis cliquez sur Suivant",
          "Faites le récapitulatif puis Confirmer",
          "Entrez votre code PIN",
        ],
      },
    ],
  },
  {
    icon: Building2,
    title: "Retrait GAB UBA",
    description: "Retirez de l'argent aux guichets automatiques UBA partout au Bénin.",
    href: "/services/particuliers#withdrawal",
    appProcedures: [
      {
        title: "Valider ou annuler une opération en cours",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Choisissez Historique en bas de la page d'accueil",
          "Cliquez sur Opération en cours",
          "Cliquez sur Confirmer l'opération",
          "Entrez le code à 4 chiffres reçu de l'expéditeur et validez",
        ],
      },
    ],
    ussdProcedures: [
      {
        title: "Retrait au GAB UBA",
        steps: [
          "Tapez *890#",
          "Choisissez 1 – Client",
          "Sélectionnez 8 – Retrait GAB",
          "Choisissez 2 – Effectuer une opération",
          "Entrez le montant souhaité",
          "Entrez un code PIN ATM à 4 chiffres de votre choix",
          "Entrez votre mot de passe de connexion",
          "Recevez par SMS un code ATM à 6 chiffres",
          "Au GAB, choisissez Retrait mobile money",
          "Entrez le code ATM à 4 chiffres choisi au début",
          "Entrez le code ATM à 6 chiffres reçu par SMS",
          "Entrez le montant et validez",
        ],
      },
      {
        title: "Valider ou annuler une opération",
        steps: [
          "Tapez *890#",
          "Sélectionnez 1 – Client",
          "Sélectionnez 4 – Opération en cours",
          "Sélectionnez 1 – Traçabilité de l'opération",
          "Choisissez Annuler ou Confirmer",
          "Entrez votre mot de passe B-MO pour valider",
        ],
      },
    ],
  },
  {
    icon: Globe,
    title: "Transfert UEMOA",
    description: "Envoyez des fonds vers les pays de la zone UEMOA via B-MO / UBA.",
    href: "/services/particuliers#international",
    appProcedures: [
      {
        title: "Transfert vers la zone UEMOA",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts",
          "Choisissez Wallet mobile",
          "Cliquez sur UEMOA",
          "Choisissez le pays et entrez le numéro du bénéficiaire",
          "Cliquez sur Suivant puis continuez",
          "Entrez le montant et choisissez le portefeuille de destination",
          "Entrez le nom et prénoms du bénéficiaire",
          "Cliquez sur Récapitulatif puis confirmez",
          "Entrez votre code PIN",
        ],
      },
    ],
  },
  {
    icon: Receipt,
    title: "B-MO Pay",
    description: "Rechargez votre compte B-MO depuis MTN, Moov ou Celtiis. Consultez votre solde.",
    href: "/services/business#collection",
    appProcedures: [
      {
        title: "Recharge B-MO Pay depuis un portefeuille mobile",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur B-MO Pay",
          "Sélectionnez Recharge B-MO Pay",
          "Entrez le numéro de téléphone du portefeuille (MTN, Moov, Celtiis)",
          "Indiquez le montant à transférer",
          "Renseignez votre prénom et nom",
          "Cliquez sur Suivant puis Confirmer",
          "Saisissez votre code PIN B-MO",
          "Validez avec le code PIN de votre opérateur",
        ],
      },
      {
        title: "Vérifier votre solde B-MO",
        steps: [
          "Ouvrez l'application B-MO",
          "Cliquez sur l'icône « ACTION » en haut de l'écran",
          "Votre solde s'affiche instantanément",
        ],
      },
    ],
    ussdProcedures: [
      {
        title: "Consulter le solde via USSD",
        steps: [
          "Tapez *890#",
          "Choisissez 1 – Client",
          "Choisissez 2 – Solde",
          "Saisissez votre code PIN à 6 chiffres puis validez",
        ],
      },
    ],
  },
  {
    icon: Wallet,
    title: "Push & Pull Bancaire",
    description: "Transférez entre votre compte B-MO et votre compte bancaire UBA.",
    href: "/services/particuliers#pushpull",
    appProcedures: [
      {
        title: "Virement UBA → B-MO (Pull)",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts → Push & Pull",
          "Choisissez Virement vers B-MO",
          "Choisissez le compte ou la carte prépayée",
          "Saisissez le montant de la transaction",
          "Validez",
        ],
      },
      {
        title: "Virement B-MO → UBA (Push)",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts → Push & Pull",
          "Choisissez Virement vers UBA",
          "Choisissez le compte ou la carte prépayée",
          "Saisissez le montant de la transaction",
          "Validez",
        ],
      },
      {
        title: "Liaison automatique (même numéro B-MO et UBA)",
        steps: [
          "Connectez-vous à l'application B-MO",
          "Cliquez sur Transferts → Push & Pull",
          "Cliquez sur Liaison de compte bancaire et carte prépayée",
          "Cochez Compte bancaire ou Carte prépayée",
          "Renseignez votre numéro de compte ou identifiant client",
          "Entrez les 4 derniers chiffres de votre carte prépayée et validez",
        ],
      },
    ],
  },
];

function StepsBlock({ procedure }: { procedure: Procedure }) {
  return (
    <div className="mb-6 last:mb-0">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        {procedure.title}
      </p>
      <ol className="space-y-2.5">
        {procedure.steps.map((step, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-[11px] font-bold text-primary-foreground mt-0.5">
              {i + 1}
            </span>
            <span className="text-sm text-foreground leading-relaxed">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function FeaturesSection() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Service | null>(null);
  const [tab, setTab] = useState<"app" | "ussd">("app");

  function openModal(service: Service) {
    setActive(service);
    setTab("app");
    setOpen(true);
  }

  return (
    <section id="services" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">
            Nos Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tout pour simplifier vos finances
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            B-MO offre une gamme complète de services financiers digitaux pour particuliers et entreprises
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service) => (
            <button
              key={service.title}
              onClick={() => openModal(service)}
              className="group glass-card rounded-2xl p-6 lg:p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 text-left w-full cursor-pointer"
            >
              <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{service.description}</p>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                Voir comment utiliser <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link href="/services/particuliers">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Services Particuliers <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link href="/services/business">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
              Services Business <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg w-full p-0 overflow-hidden rounded-2xl border border-border">
          {active && (
            <>
              {/* Header gradient */}
              <div className="gradient-primary px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <active.icon className="w-6 h-6 text-white" />
                </div>
                <DialogHeader className="flex-1 min-w-0">
                  <DialogTitle className="text-white text-lg font-bold leading-tight">
                    {active.title}
                  </DialogTitle>
                  <p className="text-white/75 text-xs mt-0.5 leading-snug">{active.description}</p>
                </DialogHeader>
              </div>

              {/* Tabs (only when USSD available) */}
              {active.ussdProcedures && (
                <div className="flex border-b border-border">
                  <button
                    onClick={() => setTab("app")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${tab === "app"
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Phone2 className="w-4 h-4" />
                    Via Application
                  </button>
                  <button
                    onClick={() => setTab("ussd")}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${tab === "ussd"
                        ? "text-primary border-b-2 border-primary bg-primary/5"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <Hash className="w-4 h-4" />
                    Via USSD *890#
                  </button>
                </div>
              )}

              {/* Steps */}
              <div className="px-6 py-5 max-h-[55vh] overflow-y-auto space-y-1">
                {tab === "app"
                  ? active.appProcedures.map((p, i) => <StepsBlock key={i} procedure={p} />)
                  : active.ussdProcedures?.map((p, i) => <StepsBlock key={i} procedure={p} />)
                }
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-muted/30">
                <button
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  Fermer
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
