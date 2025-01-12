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
} from "lucide-react";
import { Button } from "./ui/button";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const { logout } = useAuth();
  const [logoUrl, setLogoUrl] = useState("");
  const [storeName, setStoreName] = useState("LEONE WHATSAPP");

  useEffect(() => {
    const storedLogoUrl = localStorage.getItem("storeLogoUrl");
    if (storedLogoUrl) setLogoUrl(storedLogoUrl);
  }, []);

  const menuItems = [
    { id: "dashboard", label: "Início", icon: LayoutDashboard },
    { id: "featured", label: "Produtos em Destaque", icon: Star },
    { id: "logo", label: "Gerenciar Logo", icon: Image },
    { id: "products", label: "Produtos", icon: Package },
    { id: "banners", label: "Banners", icon: Images },
    { id: "orders", label: "Pedidos", icon: FileText },
    { id: "credit-card-orders", label: "Pedidos com Cartão", icon: CreditCard },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-background/80 backdrop-blur-sm border-r border-primary/20">
      <div className="p-6">
        <div className="flex flex-col items-start gap-4 mb-6">
          {logoUrl ? (
            <img src={logoUrl} alt={storeName} className="h-12 w-auto" />
          ) : (
            <h2 className="text-lg font-semibold text-primary">{storeName}</h2>
          )}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 w-full"
            asChild
          >
            <a
              href="https://wa.me/5565992708533?text="
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </Button>
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