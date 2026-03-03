import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogClient from "@/components/BlogClient";
import { getBlogPosts, getBlogCategories } from "@/lib/db";

export const revalidate = 60

export default async function Blog() {
  const [posts, categories] = await Promise.all([
    getBlogPosts('publie'),
    getBlogCategories(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 animate-fade-in-up">
              Blog B-MO
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 animate-fade-in-up delay-100">
              Actualités & <span className="gradient-text">Innovations</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up delay-200">
              Découvrez les dernières nouvelles, guides pratiques et innovations
              du monde du paiement digital au Bénin
            </p>
          </div>
        </div>
      </section>

      <BlogClient posts={posts} categories={categories} />

      <Footer />
    </div>
  );
}
