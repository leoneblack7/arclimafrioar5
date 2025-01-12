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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Admin() {
  const { isAuthenticated, login, currentUsername, changeUsername } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [oldUsername, setOldUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleUsernameChange = (e: React.FormEvent) => {
    e.preventDefault();
    changeUsername(oldUsername, newUsername);
    setOldUsername("");
    setNewUsername("");
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
        {activeSection === "telegram-bot" && (
          <>
            <TelegramBotManager />
            <Card className="mt-8 p-6">
              <h2 className="text-2xl font-bold mb-4">Gerenciar Usuário</h2>
              <p className="text-muted-foreground mb-4">Usuário atual: {currentUsername}</p>
              <form onSubmit={handleUsernameChange} className="space-y-4">
                <div>
                  <label htmlFor="oldUsername" className="block text-sm font-medium mb-1">
                    Usuário Antigo
                  </label>
                  <Input
                    id="oldUsername"
                    value={oldUsername}
                    onChange={(e) => setOldUsername(e.target.value)}
                    placeholder="Digite o usuário atual"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="newUsername" className="block text-sm font-medium mb-1">
                    Novo Usuário
                  </label>
                  <Input
                    id="newUsername"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    placeholder="Digite o novo usuário"
                    required
                  />
                </div>
                <Button type="submit">
                  Alterar Usuário
                </Button>
              </form>
            </Card>
          </>
        )}
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