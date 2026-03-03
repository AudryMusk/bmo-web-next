import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tarifUEMOA = [
  { tranche: "1 - 5 000", fraisRetrait: "40 - 95", fraisEnvoi: "150" },
  { tranche: "5 001 - 20 000", fraisRetrait: "170 - 325", fraisEnvoi: "350" },
  { tranche: "20 001 - 50 000", fraisRetrait: "650", fraisEnvoi: "750" },
  { tranche: "50 001 - 100 000", fraisRetrait: "950", fraisEnvoi: "1 300" },
  {
    tranche: "100 001 - 200 000",
    fraisRetrait: "1 900",
    fraisEnvoi: "1 800",
  },
  {
    tranche: "200 001 - 500 000",
    fraisRetrait: "2 800 - 3 250",
    fraisEnvoi: "2 800 - 4 000",
  },
  {
    tranche: "500 001 - 1 000 000",
    fraisRetrait: "4 500 - 5 500",
    fraisEnvoi: "5 800",
  },
  {
    tranche: "1 000 001 - 2 000 000",
    fraisRetrait: "7 500 - 8 000",
    fraisEnvoi: "10 000 - 13 000",
  },
];

const tarifMobileMoney = [
  {
    tranche: "1 - 2 000",
    fraisBmoVersAutres: "200",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "2 001 - 5 000",
    fraisBmoVersAutres: "225",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "5 001 - 40 000",
    fraisBmoVersAutres: "300",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "40 001 - 75 000",
    fraisBmoVersAutres: "350",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "75 001 - 400 000",
    fraisBmoVersAutres: "400",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "400 001 - 1 000 000",
    fraisBmoVersAutres: "450",
    fraisAutresVersBmo: "0,2%",
  },
  {
    tranche: "1 000 001 - 2 000 000",
    fraisBmoVersAutres: "500",
    fraisAutresVersBmo: "0,2%",
  },
];

const tarifInternational = [
  {
    destination: "Sénégal",
    min: "1 - 20 000",
    frais: "1 200 FCFA",
  },
  {
    destination: "Sénégal",
    min: "20 001 - 100 000",
    frais: "1 500 - 2 000 FCFA",
  },
  {
    destination: "Sénégal",
    min: "100 001 - 500 000",
    frais: "2 500 - 5 000 FCFA",
  },
  { destination: "CEMAC", min: "1 - 20 000", frais: "1 200 FCFA" },
  {
    destination: "CEMAC",
    min: "20 001 - 100 000",
    frais: "2 000 - 2 500 FCFA",
  },
  {
    destination: "CEMAC",
    min: "100 001 - 500 000",
    frais: "3 500 - 5 000 FCFA",
  },
];

const PricingSection = () => {
  return (
    <section id="tarifs" className="py-20 lg:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block animate-fade-in-up">
            Tarifs
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in-up delay-100">
            Grilles Tarifaires
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in-up delay-200">
            Des frais transparents et compétitifs pour tous vos transferts
          </p>
        </div>

        {/* Pricing Tabs */}
        <Tabs defaultValue="uemoa" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50">
            <TabsTrigger
              value="uemoa"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Zone UEMOA
            </TabsTrigger>
            <TabsTrigger
              value="mobile"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Mobile Money
            </TabsTrigger>
            <TabsTrigger
              value="international"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              International
            </TabsTrigger>
          </TabsList>

          <TabsContent value="uemoa" className="animate-fade-in-up">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="gradient-primary">
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Tranche (FCFA)
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Frais de Retrait
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        {"Frais d'Envoi"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarifUEMOA.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4 text-foreground font-medium">
                          {row.tranche}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {row.fraisRetrait} FCFA
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {row.fraisEnvoi} FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="mobile" className="animate-fade-in-up">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="gradient-primary">
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Tranche (FCFA)
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        B-MO → Autres réseaux
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Autres réseaux → B-MO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarifMobileMoney.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4 text-foreground font-medium">
                          {row.tranche}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {row.fraisBmoVersAutres} FCFA
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {row.fraisAutresVersBmo}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Interopérabilité avec MTN MoMo, Moov Money et Celtiis Cash
            </p>
          </TabsContent>

          <TabsContent value="international" className="animate-fade-in-up">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="gradient-primary">
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Destination
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        Montant (FCFA)
                      </th>
                      <th className="text-left p-4 text-primary-foreground font-semibold">
                        {"Frais d'Envoi"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarifInternational.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t border-border hover:bg-secondary/30 transition-colors"
                      >
                        <td className="p-4 text-foreground font-medium">
                          {row.destination}
                        </td>
                        <td className="p-4 text-muted-foreground">{row.min}</td>
                        <td className="p-4 text-muted-foreground">
                          {row.frais}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Également disponible vers USA, Europe, Canada, Émirats, Nigeria,
              Cameroun
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default PricingSection;
