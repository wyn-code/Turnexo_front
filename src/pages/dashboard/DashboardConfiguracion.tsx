import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const DashboardConfiguracion = () => {
  const [data, setData] = useState({
    name: "Barbería Don Carlos",
    description: "Cortes clásicos y modernos con la mejor atención.",
    phone: "+54 11 4567-8901",
    whatsapp: "+5491145678901",
    instagram: "@barberiadoncarlos",
    address: "Av. Corrientes 1234",
    city: "CABA",
    website: "",
  });

  const update = (field: string, value: string) => setData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Configuración del negocio</h2>
        <Button size="sm" onClick={() => toast.success("Configuración guardada (mock)")}>Guardar</Button>
      </div>

      <Card>
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <Label>Nombre del negocio</Label>
            <Input value={data.name} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Descripción</Label>
            <Textarea value={data.description} onChange={(e) => update("description", e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Teléfono</Label>
              <Input value={data.phone} onChange={(e) => update("phone", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>WhatsApp</Label>
              <Input value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Instagram</Label>
              <Input value={data.instagram} onChange={(e) => update("instagram", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Sitio web</Label>
              <Input value={data.website} onChange={(e) => update("website", e.target.value)} placeholder="https://tunegocio.com" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Dirección</Label>
              <Input value={data.address} onChange={(e) => update("address", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Ciudad</Label>
              <Input value={data.city} onChange={(e) => update("city", e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardConfiguracion;
