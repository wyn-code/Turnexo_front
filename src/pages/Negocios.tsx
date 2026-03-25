import { useState, useMemo } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import SearchBar from "@/components/marketplace/SearchBar";
import CategoryFilter from "@/components/marketplace/CategoryFilter";
import BusinessGrid from "@/components/marketplace/BusinessesGrid";
import { recommendedBusinesses, categories, cities } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Negocios = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = [...recommendedBusinesses];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory) {
      const catName = categories.find((c) => c.slug === selectedCategory)?.name;
      if (catName) result = result.filter((b) => b.category === catName);
    }

    if (selectedCity) {
      const cityName = cities.find((c) => c.slug === selectedCity)?.name;
      if (cityName) result = result.filter((b) => b.city === cityName);
    }

    // Sort by rating (recomendados)
    result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, selectedCategory, selectedCity]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Explorar negocios
          </h1>
          <p className="mt-2 text-muted-foreground">
            Encontrá el negocio ideal y reservá tu turno en segundos.
          </p>
        </div>

        {/* Filters row */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <Select
            value={selectedCity ?? "all"}
            onValueChange={(v) => setSelectedCity(v === "all" ? null : v)}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Ciudad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las ciudades</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c.id} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category chips */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-muted-foreground">
          {filtered.length} negocio{filtered.length !== 1 && "s"} encontrado{filtered.length !== 1 && "s"}
        </p>

        {/* Grid */}
        <BusinessGrid businesses={filtered} />
      </main>

      <Footer />
    </div>
  );
};

export default Negocios;
