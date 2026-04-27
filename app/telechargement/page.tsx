import Link from "next/link";
import { Download, Smartphone, ArrowLeft, Globe, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TelechargementPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-24 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[160px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 relative z-10">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l’accueil
            </Link>

            <section className="rounded-3xl border border-border bg-card/70 backdrop-blur-md p-8 sm:p-12 shadow-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-5">
                <Download className="w-3.5 h-3.5" />
                Téléchargement B-MO
              </div>

              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    Téléchargez l’application B-MO
                  </h1>
                  <p className="text-muted-foreground text-lg max-w-2xl">
                    Accédez à B-MO partout : sur mobile via les stores ou directement
                    en ligne avec le portail web. Choisissez la meilleure option
                    pour vous.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    Paiements sécurisés
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Interface premium
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Téléchargez sur PlayStore
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Installez l’application B-MO sur Android et profitez d’une
                    expérience fluide au quotidien.
                  </p>
                  <Button size="lg" className="w-full font-semibold" asChild>
                    <a href="https://play.google.com/store/search?q=bmo+bestcash" target="_blank" rel="noreferrer">
                      Télécharger sur PlayStore
                    </a>
                  </Button>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-4">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Téléchargez sur AppStore
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Installez l’application B-MO sur iPhone et restez connecté à
                    vos finances.
                  </p>
                  <Button size="lg" variant="outline" className="w-full font-semibold" asChild>
                    <a href="https://apps.apple.com/search?term=bmo+bestcash" target="_blank" rel="noreferrer">
                      Télécharger sur AppStore
                    </a>
                  </Button>
                </div>

                <div className="rounded-2xl border border-border bg-background/80 p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    Ouvrir l’appli web
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Accédez immédiatement à votre espace B-MO via le portail web
                    sécurisé.
                  </p>
                  <Button asChild size="lg" className="w-full font-semibold">
                    <Link href="https://www.bmo.bj" target="_blank" rel="noreferrer">
                      Ouvrir le portail web
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
