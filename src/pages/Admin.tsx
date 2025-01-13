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

export default function Admin() {
  const { isAuthenticated, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  useEffect(() => {
    const setViewportMeta = () => {
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0';
        document.head.appendChild(meta);
      }
    };

    if (isAuthenticated) {
      setViewportMeta();
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
      document.documentElement.style.height = 'auto';
      document.body.style.height = 'auto';
      document.body.style.position = 'static';
      document.body.style.width = 'auto';
    };
  }, [isAuthenticated]);

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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex h-[100dvh] w-screen overflow-hidden touch-none">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-none">
        <div className="max-w-6xl mx-auto space-y-6">
          {renderActiveSection()}
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}