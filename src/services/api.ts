import apiClient from "@/lib/api-client";
import { API_CONFIG } from "@/lib/api-config";
import type { Service, Professional } from "@/types";

export interface CreateBusinessRequest {
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  address: string;
  city: string;
  province: string;
  locality?: string;
  phone?: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface BusinessResponse {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  address: string;
  city: string;
  province: string;
  locality?: string;
  phone?: string;
  whatsapp: string;
  instagram?: string;
  facebook?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppointmentResponse {
  id: string;
  businessId: string;
  serviceId: string;
  professionalId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
}

// Servicio de Negocios
export const businessService = {
  // Obtener todos los negocios
  getAllBusinesses: async (params?: { category?: string; city?: string; page?: number; limit?: number }) => {
    return apiClient.get<BusinessResponse[]>(API_CONFIG.endpoints.businesses, params);
  },

  // Obtener negocio por slug
  getBusinessBySlug: async (slug: string) => {
    return apiClient.get<BusinessResponse>(API_CONFIG.endpoints.businessDetail(slug));
  },

  // Obtener negocio por ID
  getBusinessById: async (id: string) => {
    return apiClient.get<BusinessResponse>(API_CONFIG.endpoints.businesses + `/${id}`);
  },

  // Crear un nuevo negocio
  createBusiness: async (data: CreateBusinessRequest) => {
    return apiClient.post<BusinessResponse>(API_CONFIG.endpoints.businessCreate, data);
  },

  // Actualizar un negocio
  updateBusiness: async (id: string, data: Partial<CreateBusinessRequest>) => {
    return apiClient.put<BusinessResponse>(API_CONFIG.endpoints.businessUpdate(id), data);
  },

  // Eliminar un negocio
  deleteBusiness: async (id: string) => {
    return apiClient.delete<{ message: string }>(API_CONFIG.endpoints.businessDelete(id));
  },

  // Obtener servicios de un negocio
  getBusinessServices: async (businessId: string) => {
    return apiClient.get<Service[]>(API_CONFIG.endpoints.servicesByBusiness(businessId));
  },

  // Obtener empleados de un negocio
  getBusinessProfessionals: async (businessId: string) => {
    return apiClient.get<Professional[]>(API_CONFIG.endpoints.professionalsByBusiness(businessId));
  },

  // Obtener horarios de un negocio
  getBusinessSchedule: async (businessId: string) => {
    return apiClient.get<Record<string, Record<string, string>>>(API_CONFIG.endpoints.schedulesByBusiness(businessId));
  },
};

// Servicio de Servicios
export const serviceService = {
  // Crear un servicio
  createService: async (businessId: string, data: Omit<Service, "id" | "businessId">) => {
    return apiClient.post<Service>(API_CONFIG.endpoints.services, {
      ...data,
      businessId,
    });
  },

  // Actualizar un servicio
  updateService: async (serviceId: string, data: Partial<Service>) => {
    return apiClient.put<Service>(`${API_CONFIG.endpoints.services}/${serviceId}`, data);
  },

  // Eliminar un servicio
  deleteService: async (serviceId: string) => {
    return apiClient.delete<{ message: string }>(`${API_CONFIG.endpoints.services}/${serviceId}`);
  },
};

// Servicio de Empleados/Profesionales
export const professionalService = {
  // Crear un profesional
  createProfessional: async (businessId: string, data: Omit<Professional, "id" | "businessId">) => {
    return apiClient.post<Professional>(API_CONFIG.endpoints.professionals, {
      ...data,
      businessId,
    });
  },

  // Actualizar un profesional
  updateProfessional: async (professionalId: string, data: Partial<Professional>) => {
    return apiClient.put<Professional>(`${API_CONFIG.endpoints.professionals}/${professionalId}`, data);
  },

  // Eliminar un profesional
  deleteProfessional: async (professionalId: string) => {
    return apiClient.delete<{ message: string }>(`${API_CONFIG.endpoints.professionals}/${professionalId}`);
  },
};

// Servicio de Turnos/Citas
export const appointmentService = {
  // Crear una cita
  createAppointment: async (data: AppointmentResponse) => {
    return apiClient.post<AppointmentResponse>(API_CONFIG.endpoints.appointmentCreate, data);
  },

  // Obtener cita por ID
  getAppointmentById: async (id: string) => {
    return apiClient.get<AppointmentResponse>(API_CONFIG.endpoints.appointmentDetail(id));
  },

  // Obtener citas de un usuario
  getUserAppointments: async (params?: { status?: string; page?: number; limit?: number }) => {
    return apiClient.get<AppointmentResponse[]>(API_CONFIG.endpoints.appointments, params);
  },

  // Actualizar un cita
  updateAppointment: async (id: string, data: Partial<AppointmentResponse>) => {
    return apiClient.put<AppointmentResponse>(API_CONFIG.endpoints.appointmentUpdate(id), data);
  },

  // Cancelar una cita
  cancelAppointment: async (id: string, reason?: string) => {
    return apiClient.patch<AppointmentResponse>(API_CONFIG.endpoints.appointmentCancel(id), { reason });
  },
};

export default {
  businessService,
  serviceService,
  professionalService,
  appointmentService,
};
