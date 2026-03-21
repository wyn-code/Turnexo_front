import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Palette, Image, Star, Megaphone, LayoutGrid } from "lucide-react";

const standardFeatures = [
  "Página pública del negocio",
  "Reservas online",
  "Gestión de turnos",
  "Panel de administración",
];

const vipFeatures = [
  { icon: Palette, label: "Cambiar colores de marca" },
  { icon: Image, label: "Elegir estilo de portada" },
  { icon: LayoutGrid, label: "Agregar más galerías" },
  { icon: Megaphone, label: "Destacar promociones" },
  { icon: Star, label: "Agregar secciones extra" },
];

const DashboardPersonalizacion = () => (
  <div className="space-y-6">
    <h2 className="text-lg font-semibold text-foreground">Personalización</h2>

    <div className="grid gap-6 sm:grid-cols-2">
      {/* Standard */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Plan Estándar</h3>
            <Badge variant="secondary">Actual</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Incluye todo lo necesario para empezar.</p>
          <ul className="space-y-2">
            {standardFeatures.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Check size={14} className="text-primary" /> {f}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* VIP */}
      <Card className="border-primary ring-2 ring-primary/20">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Plan VIP</h3>
          </div>
          <p className="text-sm text-muted-foreground">Diferenciá tu negocio con herramientas premium.</p>
          <ul className="space-y-2">
            {vipFeatures.map((f) => (
              <li key={f.label} className="flex items-center gap-2 text-sm text-foreground">
                <f.icon size={14} className="text-primary" /> {f.label}
              </li>
            ))}
          </ul>
          <Button className="w-full">
            <Crown size={14} className="mr-2" /> Upgrade a VIP
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default DashboardPersonalizacion;
