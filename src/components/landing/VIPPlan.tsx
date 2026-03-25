import { Button } from "../../components/ui/button";
import { Crown, Check } from "lucide-react";

const perks = [
  "Personalización avanzada de tu página",
  "Prioridad en los resultados de búsqueda",
  "Estadísticas detalladas de reservas",
  "Soporte prioritario",
  "Recordatorios automáticos para clientes",
];

const VIPPlan = () => (
  <section className="bg-background py-16 sm:py-24">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Plan VIP
        </h2>
        <p className="mt-3 text-muted-foreground">
          Llevá tu negocio al siguiente nivel con nuestra membresía premium.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-lg rounded-2xl border-2 border-primary bg-card p-8 shadow-lg sm:p-10">
        <div className="flex items-center justify-center gap-2 text-primary">
          <Crown size={28} />
          <span className="text-2xl font-bold">VIP</span>
        </div>
        <ul className="mt-8 space-y-4">
          {perks.map((perk) => (
            <li key={perk} className="flex items-start gap-3 text-foreground">
              <Check size={18} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-sm">{perk}</span>
            </li>
          ))}
        </ul>
        <Button size="lg" className="mt-8 w-full gap-2">
          <Crown size={18} />
          Quiero ser VIP
        </Button>
      </div>
    </div>
  </section>
);

export default VIPPlan;
