import { CalendarDays, Users, Briefcase, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { dashboardMetrics, mockAppointments } from "@/data/dashboardMockData";

const stats = [
  { label: "Turnos hoy", value: dashboardMetrics.turnosHoy, icon: CalendarDays, color: "text-primary" },
  { label: "Próximos turnos", value: dashboardMetrics.proximosTurnos, icon: Clock, color: "text-primary" },
  { label: "Clientes totales", value: dashboardMetrics.clientesTotales, icon: Users, color: "text-primary" },
  { label: "Servicios activos", value: dashboardMetrics.serviciosActivos, icon: Briefcase, color: "text-primary" },
];

const statusColor: Record<string, string> = {
  confirmado: "bg-primary/10 text-primary",
  pendiente: "bg-yellow-100 text-yellow-800",
  cancelado: "bg-destructive/10 text-destructive",
  completado: "bg-green-100 text-green-800",
};

const DashboardResumen = () => {
  const upcoming = mockAppointments.filter((a) => a.status !== "cancelado" && a.status !== "completado").slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="flex items-center gap-4 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <s.icon size={20} className={s.color} />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-5">
          <h3 className="font-semibold text-foreground mb-4">Próximos turnos</h3>
          <div className="space-y-3">
            {upcoming.map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="font-medium text-foreground">{a.clientName}</p>
                  <p className="text-sm text-muted-foreground">{a.serviceName} · {a.professionalName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{a.date} · {a.time}</p>
                  <Badge className={statusColor[a.status]} variant="secondary">{a.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardResumen;
