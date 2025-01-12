import { useEffect, useState } from "react";
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
import { UserManager } from "@/components/admin/UserManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Admin() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("/lovable-uploads/a0789ab6-2c1a-4953-8f38-5c7f5eed8ea1.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="w-full max-w-md p-8 space-y-6 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg border border-border">
          <h1 className="text-3xl font-bold text-center text-foreground">Login Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                Senha
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
        {activeSection === "telegram-bot" && <TelegramBotManager />}
        {activeSection === "user-management" && <UserManager />}
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
      </div>
      <ThemeToggle />
    </div>
  );
}