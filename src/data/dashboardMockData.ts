import type { Appointment } from "@/types";

export const mockAppointments: Appointment[] = [
  { id: "a1", clientName: "Juan Pérez", clientPhone: "+54 11 1234-5678", clientEmail: "juan@mail.com", serviceId: "s1", serviceName: "Corte clásico", professionalId: "p1", professionalName: "Carlos Méndez", date: "2026-03-18", time: "10:00", status: "confirmado" },
  { id: "a2", clientName: "María López", clientPhone: "+54 11 2345-6789", clientEmail: "maria@mail.com", serviceId: "s2", serviceName: "Corte + barba", professionalId: "p2", professionalName: "Martín López", date: "2026-03-18", time: "11:00", status: "pendiente" },
  { id: "a3", clientName: "Lucas García", clientPhone: "+54 11 3456-7890", clientEmail: "lucas@mail.com", serviceId: "s4", serviceName: "Coloración", professionalId: "p3", professionalName: "Diego Ruiz", date: "2026-03-18", time: "14:00", status: "confirmado" },
  { id: "a4", clientName: "Ana Rodríguez", clientPhone: "+54 11 4567-8901", clientEmail: "ana@mail.com", serviceId: "s1", serviceName: "Corte clásico", professionalId: "p1", professionalName: "Carlos Méndez", date: "2026-03-19", time: "09:30", status: "confirmado" },
  { id: "a5", clientName: "Pedro Martínez", clientPhone: "+54 11 5678-9012", clientEmail: "pedro@mail.com", serviceId: "s3", serviceName: "Barba completa", professionalId: "p2", professionalName: "Martín López", date: "2026-03-19", time: "16:00", status: "pendiente" },
  { id: "a6", clientName: "Sofía Díaz", clientPhone: "+54 11 6789-0123", clientEmail: "sofia@mail.com", serviceId: "s5", serviceName: "Corte degradé", professionalId: "p1", professionalName: "Carlos Méndez", date: "2026-03-17", time: "15:00", status: "completado" },
  { id: "a7", clientName: "Tomás Fernández", clientPhone: "+54 11 7890-1234", clientEmail: "tomas@mail.com", serviceId: "s2", serviceName: "Corte + barba", professionalId: "p2", professionalName: "Martín López", date: "2026-03-16", time: "10:30", status: "cancelado" },
];

export const dashboardMetrics = {
  turnosHoy: 3,
  proximosTurnos: 5,
  clientesTotales: 47,
  serviciosActivos: 5,
};
