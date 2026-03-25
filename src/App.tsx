import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Negocios from "./pages/Negocios.tsx";
import NegocioPerfil from "./pages/NegocioPerfil.tsx";
import Reservar from "./pages/Reservar.tsx";
import RegistrarNegocio from "./pages/RegistrarNegocio.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/negocios" element={<Negocios />} />
          <Route path="/negocio/:slug" element={<NegocioPerfil />} />
          <Route path="/reservar/:slug" element={<Reservar />} />
          <Route path="/registrar-negocio" element={<RegistrarNegocio />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
