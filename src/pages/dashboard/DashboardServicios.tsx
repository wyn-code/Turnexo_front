import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Power } from "lucide-react";
import { services as mockServices } from "@/data/mockData";
import { toast } from "sonner";
import type { Service } from "@/types";

const DashboardServicios = () => {
  const [serviceList] = useState<Service[]>(
    mockServices.filter((s) => s.businessId === "1").map((s) => ({ ...s, active: true }))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Servicios</h2>
        <Button size="sm" onClick={() => toast.info("Crear servicio (próximamente)")}>
          <Plus size={14} className="mr-1" /> Nuevo servicio
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {serviceList.map((s) => (
          <Card key={s.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground">{s.duration} min · ${s.price.toLocaleString("es-AR")}</p>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="bg-primary/10 text-primary">Activo</Badge>
                <Button variant="ghost" size="icon" onClick={() => toast.info("Editar servicio (próximamente)")}><Edit size={14} /></Button>
                <Button variant="ghost" size="icon" onClick={() => toast.info("Desactivar servicio (próximamente)")}><Power size={14} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardServicios;
