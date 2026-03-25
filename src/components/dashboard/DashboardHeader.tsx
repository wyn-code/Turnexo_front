import { SidebarTrigger } from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { LogOut, ExternalLink } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => (
  <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
    <div className="flex items-center gap-3">
      <SidebarTrigger />
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
    </div>
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" asChild>
        <Link to="/negocio/barberia-don-carlos"><ExternalLink size={14} className="mr-1" /> Ver página</Link>
      </Button>
      <Button variant="ghost" size="sm" asChild>
        <Link to="/"><LogOut size={14} className="mr-1" /> Salir</Link>
      </Button>
    </div>
  </header>
);

export default DashboardHeader;
