import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Star,
  Image,
  Package,
  Images,
  FileText,
  CreditCard,
  LogOut,
  MessageSquare,
  Receipt,
} from "lucide-react";
import { Button } from "./ui/button";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Início", icon: LayoutDashboard },
    { id: "featured", label: "Produtos em Destaque", icon: Star },
    { id: "logo", label: "Gerenciar Logo", icon: Image },
    { id: "products", label: "Produtos", icon: Package },
    { id: "banners", label: "Banners", icon: Images },
    { id: "orders", label: "Links PIX", icon: FileText },
    { id: "pix-orders", label: "Pedidos PIX", icon: Receipt },
    { id: "credit-card-orders", label: "Pedidos com Cartão", icon: CreditCard },
    { id: "leone-whatsapp", label: "LEONE WHATSAPP", icon: MessageSquare },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background/80 backdrop-blur-sm border-r border-primary/20">
      <div className="p-6">
        <div className="flex flex-col items-start gap-4 mb-6">
          <h2 className="text-lg font-semibold text-primary">ADMIN BLACK</h2>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                to="#"
                onClick={() => onSectionChange(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? "bg-primary/20 text-primary"
                    : "hover:bg-primary/10 text-foreground hover:text-primary"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={logout}
        className="absolute bottom-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sair</span>
      </button>
    </div>
  );
};