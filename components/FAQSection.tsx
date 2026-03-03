import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Comment créer un compte B-MO ?",
    answer:
      "Vous pouvez créer un compte en tapant *890# sur votre téléphone et en suivant les instructions, ou en téléchargeant l'application BESTCASH sur Play Store. L'inscription prend quelques minutes et vous recevrez votre code PIN par SMS.",
  },
  {
    question: "Quels sont les opérateurs compatibles avec B-MO ?",
    answer:
      "B-MO est interopérable avec tous les principaux opérateurs mobile money au Bénin : MTN MoMo, Moov Money et Celtiis Cash. Vous pouvez envoyer et recevoir de l'argent vers ces portefeuilles.",
  },
  {
    question: "Comment retirer de l'argent avec B-MO ?",
    answer:
      "Vous pouvez retirer aux guichets automatiques UBA partout au Bénin. Via l'app ou le code USSD *890#, générez un code ATM à 6 chiffres, puis rendez-vous au GAB, choisissez 'Retrait mobile money' et entrez le code.",
  },
  {
    question: "Puis-je payer mes factures SBEE avec B-MO ?",
    answer:
      "Oui ! B-MO permet de payer vos factures SBEE prépayées et postpayées. Connectez-vous à votre compte, sélectionnez 'Factures SBEE', entrez votre numéro de compteur et le montant, puis validez avec votre code PIN.",
  },
  {
    question: "B-MO est-il sécurisé ?",
    answer:
      "Absolument ! B-MO est agréé par la BCEAO (B00/SSMP/00369-2022), conforme aux normes APDP pour la protection des données, et reconnu par l'ARCEP et la DGSF. Toutes les transactions sont sécurisées et traçables.",
  },
  {
    question: "Comment lier mon compte UBA à B-MO ?",
    answer:
      "Si vous avez le même numéro pour B-MO et UBA, la liaison est automatique via l'app. Sinon, rendez-vous en agence UBA avec une pièce d'identité valide pour effectuer la liaison manuelle.",
  },
  {
    question: "Puis-je recevoir des transferts internationaux ?",
    answer:
      "Oui, B-MO permet de recevoir des fonds envoyés via Western Union et MoneyGram directement sur votre compte. Les transferts sont également possibles vers le Sénégal, la zone CEMAC, et d'autres pays.",
  },
  {
    question: "Quels sont les frais de transaction ?",
    answer:
      "Les frais varient selon le montant et le type de transaction. Consultez notre grille tarifaire pour les détails. Les transferts vers Mobile Money commencent à partir de 200 FCFA.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-32">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up delay-100">
              Questions Fréquentes
            </h2>
            <p className="text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
              Trouvez les réponses aux questions les plus posées sur les
              services B-MO et notre solution de paiement digital.
            </p>

            <div className="mt-8 glass-card rounded-2xl p-6 animate-fade-in-up delay-300">
              <p className="text-foreground font-semibold mb-2">
                {"Besoin d'aide supplémentaire ?"}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                Notre équipe est disponible pour vous assister.
              </p>
              <p className="text-primary font-bold text-lg">
                +229 01 60 60 87 88
              </p>
              <p className="text-muted-foreground text-sm">
                info@bestcash.me
              </p>
            </div>
          </div>

          {/* Right - Accordion */}
          <div className="animate-fade-in-right">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="glass-card rounded-2xl border-none px-6 data-[state=open]:border-primary/50"
                >
                  <AccordionTrigger className="text-foreground hover:no-underline py-6 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
