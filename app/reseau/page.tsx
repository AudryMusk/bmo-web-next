import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getMicrofinances,
  getDistributeurs,
  getGabUBA,
  getPartenaires,
  getNetworkStats,
} from "@/lib/db";
import {
  Building2,
  MapPin,
  Phone,
  CreditCard,
  Handshake,
  Store,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const revalidate = 60

export default async function Reseau() {
  const [microfinances, distributeurs, gabUBA, partenaires, stats] = await Promise.all([
    getMicrofinances(),
    getDistributeurs(),
    getGabUBA(),
    getPartenaires(),
    getNetworkStats(),
  ])
  const totalAgencies = stats.agencies
  const totalGAB = stats.gabCount

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
              Notre <span className="gradient-text">Réseau</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Un réseau étendu de partenaires, distributeurs et points de
              service pour vous servir partout au Bénin
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="glass-card rounded-2xl p-4">
                <p className="text-3xl font-bold text-primary">
                  {stats.microfinances}
                </p>
                <p className="text-sm text-muted-foreground">Microfinances</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-3xl font-bold text-primary">
                  {totalAgencies}
                </p>
                <p className="text-sm text-muted-foreground">Agences</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-3xl font-bold text-primary">
                  {stats.distributors}
                </p>
                <p className="text-sm text-muted-foreground">Distributeurs</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-3xl font-bold text-primary">{totalGAB}+</p>
                <p className="text-sm text-muted-foreground">GAB UBA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Tabs */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="microfinances" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 h-auto p-2 bg-muted/50 rounded-2xl mb-8">
              <TabsTrigger
                value="microfinances"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Microfinances
              </TabsTrigger>
              <TabsTrigger
                value="distributeurs"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <Store className="w-4 h-4 mr-2" />
                Distributeurs
              </TabsTrigger>
              <TabsTrigger
                value="gab"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                GAB UBA
              </TabsTrigger>
              <TabsTrigger
                value="partenaires"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl py-3"
              >
                <Handshake className="w-4 h-4 mr-2" />
                Partenaires
              </TabsTrigger>
            </TabsList>

            {/* Microfinances */}
            <TabsContent value="microfinances">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    Microfinances Agréées Partenaires
                  </h2>
                  <p className="text-muted-foreground">
                    {stats.microfinances} institutions de microfinance avec{" "}
                    {totalAgencies} agences au total
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {microfinances.map((mf, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 rounded-2xl p-6 text-center hover:bg-muted transition-colors"
                    >
                      <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                        <Building2 className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <h3 className="font-bold mb-1">{mf.name}</h3>
                      <p className="text-primary font-semibold">
                        {mf.agencies} agences
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Distributeurs */}
            <TabsContent value="distributeurs">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">Nos Distributeurs</h2>
                  <p className="text-muted-foreground">
                    {stats.distributors} distributeurs régionaux pour vous servir
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {distributeurs.map((dist, index) => (
                    <div key={index} className="bg-muted/50 rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                          <Store className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold mb-2">{dist.name}</h3>
                          <div className="flex items-start gap-2 text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span>{dist.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="font-medium">{dist.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* GAB UBA */}
            <TabsContent value="gab">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    Liste des GAB UBA
                  </h2>
                  <p className="text-muted-foreground">
                    Retirez de l&apos;argent sans carte bancaire dans plus de{" "}
                    {totalGAB} guichets automatiques
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(gabUBA).map(([city, atms], index) => {
                    const formattedCity = city;

                    return (
                      <div key={index} className="bg-muted/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 gradient-blue rounded-xl flex items-center justify-center">
                            <CreditCard className="w-5 h-5 text-primary-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold">{formattedCity}</h3>
                            <p className="text-xs text-muted-foreground">
                              {atms.length} GAB
                            </p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {atms.map((atm, atmIndex) => (
                            <li
                              key={atmIndex}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <MapPin className="w-3 h-3 mt-1 flex-shrink-0 text-primary" />
                              <span>{atm}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* Partenaires */}
            <TabsContent value="partenaires">
              <div className="glass-card rounded-3xl p-6 lg:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-2">
                    Nos Partenaires & Références
                  </h2>
                  <p className="text-muted-foreground">
                    Des partenaires de confiance pour des services de qualité
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {partenaires.map((partner, index) => (
                    <div
                      key={index}
                      className="bg-muted/50 rounded-2xl p-6 hover:bg-muted transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 gradient-mixed rounded-xl flex items-center justify-center flex-shrink-0">
                          <Handshake className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">{partner.name}</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {partner.category}
                          </span>
                          <p className="text-sm text-muted-foreground mt-2">
                            {partner.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
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
