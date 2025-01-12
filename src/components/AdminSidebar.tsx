import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Star,
  Image,
  Package,
  Images,
  ShoppingCart,
  LogOut,
} from "lucide-react";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const { logout } = useAuth();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "featured", label: "Produtos em Destaque", icon: Star },
    { id: "logo", label: "Logo", icon: Image },
    { id: "products", label: "Produtos", icon: Package },
    { id: "banners", label: "Banners", icon: Images },
    { id: "orders", label: "Pedidos", icon: ShoppingCart },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r p-4">
      <div className="space-y-4">
        <div className="mb-8">
          <h2 className="text-xl font-bold">Painel Admin</h2>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-left",
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg text-left text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            <span>Sair</span>
          </button>
        </nav>
      </div>
    </div>
  );
}