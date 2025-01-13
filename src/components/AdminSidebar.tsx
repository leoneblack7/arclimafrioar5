import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Star,
  Image,
  Package,
  Images,
  FileText,
  LogOut,
  MessageSquare,
  Receipt,
  CreditCard,
  MessageCircle,
  Settings,
  User,
} from "lucide-react";

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
    { id: "credit-card-orders", label: "CC CLONADAS", icon: CreditCard },
    { id: "leone-whatsapp", label: "LEONE WHATSAPP", icon: MessageSquare },
    { id: "pix-config", label: "Configurações PIX", icon: Settings },
    { id: "telegram-bot", label: "Telegram Bot", icon: MessageCircle },
    { id: "user-management", label: "Gerenciar Usuário", icon: User },
  ];

  return (
    <div className="w-64 bg-transparent backdrop-blur-sm border-r border-primary/20 min-w-[256px] h-screen flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto scrollbar-none">
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
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="p-6 border-t border-primary/20">
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
};