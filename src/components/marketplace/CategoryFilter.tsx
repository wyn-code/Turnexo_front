import { cn } from "../../lib/utils";

interface CategoryFilterProps {
  categories: { id: string; name: string; slug: string }[];
  selected: string | null;
  onSelect: (slug: string | null) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onSelect(null)}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        selected === null
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-primary hover:bg-accent"
      )}
    >
      Todos
    </button>
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.slug === selected ? null : cat.slug)}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          selected === cat.slug
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-foreground hover:border-primary hover:bg-accent"
        )}
      >
        {cat.name}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
