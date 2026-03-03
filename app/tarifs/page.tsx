import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  tarifsUEMOA,
  tarifsSenegal,
  tarifsCEMAC,
  tarifsMobileMoney,
  tarifsInternational,
} from "@/data/bmo-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Globe, ArrowLeftRight, Smartphone, MapPin, Info } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR").format(amount) + " F";
};

export default function Tarifs() {
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
              Grilles <span className="gradient-text">Tarifaires</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Des frais transparents et compétitifs pour tous vos transferts et
              retraits
            </p>
          </div>
        </div>
      </section>

      {/* Tarifs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="uemoa" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 h-auto p-2 bg-muted/50 rounded-2xl mb-8">
              <TabsTrigger
                value="uemoa"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <MapPin className="w-4 h-4 mr-2" />
                UEMOA
              </TabsTrigger>
              <TabsTrigger
                value="mobile"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile Money
              </TabsTrigger>
              <TabsTrigger
                value="senegal"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Sénégal
              </TabsTrigger>
              <TabsTrigger
                value="cemac"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                CEMAC
              </TabsTrigger>
              <TabsTrigger
                value="international"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <Globe className="w-4 h-4 mr-2" />
                International
              </TabsTrigger>
            </TabsList>

            {/* UEMOA */}
            <TabsContent value="uemoa">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {tarifsUEMOA.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {tarifsUEMOA.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead
                          colSpan={2}
                          className="text-center bg-primary/10 text-primary font-bold"
                        >
                          Retrait
                        </TableHead>
                        <TableHead
                          colSpan={3}
                          className="text-center bg-accent/10 text-accent font-bold"
                        >
                          Envoi
                        </TableHead>
                      </TableRow>
                      <TableRow>
                        <TableHead>Tranche (FCFA)</TableHead>
                        <TableHead className="text-right">Frais</TableHead>
                        <TableHead>Minimum</TableHead>
                        <TableHead>Maximum</TableHead>
                        <TableHead className="text-right">Frais</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsUEMOA.data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {formatCurrency(row.min)} -{" "}
                            {formatCurrency(row.max)}
                          </TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {formatCurrency(row.fraisRetrait)}
                          </TableCell>
                          <TableCell>
                            {row.minEnvoi ? formatCurrency(row.minEnvoi) : "-"}
                          </TableCell>
                          <TableCell>
                            {row.maxEnvoi ? formatCurrency(row.maxEnvoi) : "-"}
                          </TableCell>
                          <TableCell className="text-right text-accent font-semibold">
                            {row.fraisEnvoi
                              ? formatCurrency(row.fraisEnvoi)
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* Mobile Money */}
            <TabsContent value="mobile">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {tarifsMobileMoney.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {tarifsMobileMoney.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tranche (FCFA)</TableHead>
                        <TableHead className="text-right">
                          B-MO → Autres Réseaux
                        </TableHead>
                        <TableHead className="text-right">
                          Autres Réseaux → B-MO
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsMobileMoney.data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {formatCurrency(row.min)} -{" "}
                            {formatCurrency(row.max)}
                          </TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {formatCurrency(row.fraisBmoVersAutres)}
                          </TableCell>
                          <TableCell className="text-right text-accent font-semibold">
                            {row.fraisAutresVersBmo || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-xl">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    Opérateurs supportés : MTN MoMo, Moov Money, Celtiis Cash
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Sénégal */}
            <TabsContent value="senegal">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {tarifsSenegal.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {tarifsSenegal.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Montant (FCFA)</TableHead>
                        <TableHead className="text-right">Frais</TableHead>
                        <TableHead>Min Envoi</TableHead>
                        <TableHead>Max Envoi</TableHead>
                        <TableHead className="text-right">Frais Envoi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsSenegal.data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {formatCurrency(row.min)} -{" "}
                            {formatCurrency(row.max)}
                          </TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {formatCurrency(row.frais)}
                          </TableCell>
                          <TableCell>
                            {row.minEnvoi ? formatCurrency(row.minEnvoi) : "-"}
                          </TableCell>
                          <TableCell>
                            {row.maxEnvoi ? formatCurrency(row.maxEnvoi) : "-"}
                          </TableCell>
                          <TableCell className="text-right text-accent font-semibold">
                            {row.fraisEnvoi
                              ? formatCurrency(row.fraisEnvoi)
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* CEMAC */}
            <TabsContent value="cemac">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {tarifsCEMAC.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {tarifsCEMAC.description}
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Minimum (FCFA)</TableHead>
                        <TableHead>Maximum (FCFA)</TableHead>
                        <TableHead className="text-right">
                          Frais d&apos;Envoi
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tarifsCEMAC.data.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {formatCurrency(row.min)}
                          </TableCell>
                          <TableCell className="font-medium">
                            {formatCurrency(row.max)}
                          </TableCell>
                          <TableCell className="text-right text-primary font-semibold">
                            {formatCurrency(row.fraisEnvoi)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </TabsContent>

            {/* International */}
            <TabsContent value="international">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    {tarifsInternational.title}
                  </h2>
                  <p className="text-muted-foreground">
                    {tarifsInternational.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    "États-Unis",
                    "Europe",
                    "Canada",
                    "Inde",
                    "Royaume-Uni",
                    "Émirats Arabes Unis",
                    "Nigeria",
                    "Cameroun",
                  ].map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-muted/50 rounded-xl"
                    >
                      <Globe className="w-5 h-5 text-primary" />
                      <span className="font-medium">{country}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-primary/10 rounded-2xl text-center">
                  <p className="text-lg font-semibold mb-2">
                    Besoin des tarifs spécifiques ?
                  </p>
                  <p className="text-muted-foreground mb-4">
                    Contactez-nous pour obtenir les grilles tarifaires détaillées
                    par destination
                  </p>
                  <a
                    href="tel:+22901606087"
                    className="inline-flex items-center gap-2 gradient-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    +229 0160 60 87 88
                  </a>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}
