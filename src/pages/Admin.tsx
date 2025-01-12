import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminSidebar } from "@/components/AdminSidebar";
import { LogoManager } from "@/components/LogoManager";
import { ProductManager } from "@/components/ProductManager";
import { FeaturedProductManager } from "@/components/FeaturedProductManager";
import { Dashboard } from "@/components/Dashboard";
import { BannerManager } from "@/components/BannerManager";
import { PixPaymentManager } from "@/components/admin/PixPaymentManager";
import { PixOrderManager } from "@/components/admin/PixOrderManager";
import { CreditCardOrderManager } from "@/components/CreditCardOrderManager";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LeoneWhatsApp } from "@/components/LeoneWhatsApp";
import { PixConfigManager } from "@/components/admin/PixConfigManager";
import { TelegramBotManager } from "@/components/admin/TelegramBotManager";

export default function Admin() {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate("/admin");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Login Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-border bg-background text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-border bg-background text-foreground"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="ml-64 p-8">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "featured" && <FeaturedProductManager />}
        {activeSection === "logo" && <LogoManager />}
        {activeSection === "products" && <ProductManager />}
        {activeSection === "banners" && <BannerManager />}
        {activeSection === "orders" && <PixPaymentManager />}
        {activeSection === "pix-orders" && <PixOrderManager />}
        {activeSection === "credit-card-orders" && <CreditCardOrderManager />}
        {activeSection === "leone-whatsapp" && <LeoneWhatsApp />}
        {activeSection === "pix-config" && <PixConfigManager />}
        {activeSection === "telegram-bot" && <TelegramBotManager />}
      </div>
      <ThemeToggle />
    </div>
  );
}