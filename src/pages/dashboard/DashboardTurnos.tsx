import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, RefreshCw, XCircle } from "lucide-react";
import { mockAppointments } from "@/data/dashboardMockData";
import { toast } from "sonner";

const statusColor: Record<string, string> = {
  confirmado: "bg-primary/10 text-primary",
  pendiente: "bg-yellow-100 text-yellow-800",
  cancelado: "bg-destructive/10 text-destructive",
  completado: "bg-green-100 text-green-800",
};

const DashboardTurnos = () => {
  const [appointments] = useState(mockAppointments);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Gestión de turnos</h2>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Servicio</TableHead>
                <TableHead>Profesional</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{a.clientName}</TableCell>
                  <TableCell>{a.serviceName}</TableCell>
                  <TableCell>{a.professionalName}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{a.time}</TableCell>
                  <TableCell><Badge className={statusColor[a.status]} variant="secondary">{a.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => toast.info(`Detalle de turno de ${a.clientName}`)}><Eye size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => toast.info("Reprogramar turno (próximamente)")}><RefreshCw size={14} /></Button>
                      <Button variant="ghost" size="icon" onClick={() => toast.info("Cancelar turno (próximamente)")}><XCircle size={14} /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTurnos;
