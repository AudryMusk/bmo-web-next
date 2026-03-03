"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronRight,
  Search,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image?: string
}

interface BlogClientProps {
  posts: BlogPost[]
  categories: string[]
}

export default function BlogClient({ posts, categories }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tous" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

  return (
    <>
      {/* Search & Filter */}
      <section className="py-8 border-b border-border sticky top-16 lg:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href={`/blog/${featuredPost.slug}`}>
              <article className="group relative bg-card rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-2xl">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto min-h-[400px] bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 overflow-hidden">
                    {featuredPost.image ? (
                      <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 gradient-primary opacity-20 blur-[60px] rounded-full scale-150" />
                          <div className="w-32 h-32 gradient-primary rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                            <span className="text-primary-foreground font-bold text-5xl">B</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="absolute top-6 left-6 px-4 py-2 bg-accent text-accent-foreground text-sm font-semibold rounded-full shadow-lg">
                      ⭐ À la Une
                    </span>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <span className="inline-block w-fit px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                      {featuredPost.category}
                    </span>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-muted-foreground mb-6 line-clamp-3">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                      {"Lire l'article complet"}
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {regularPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <article
                  key={post.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  className={`group transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-10"
                  }`}
                >
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
                      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                        {post.image ? (
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                              <span className="text-primary-foreground font-bold text-2xl">B</span>
                            </div>
                          </div>
                        )}
                        <span className="absolute top-4 left-4 px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          Lire la suite
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-muted-foreground">
                Essayez de modifier votre recherche ou vos filtres
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Restez informé avec <span className="gradient-text">B-MO</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Recevez nos dernières actualités et guides pratiques directement
              dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Votre adresse email"
                type="email"
                className="flex-1"
              />
              <Button className="gradient-primary text-primary-foreground">
                {"S'abonner"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
