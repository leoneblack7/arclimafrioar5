import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Verifica o token apenas se ele existir E se a sessão ainda for válida
    const token = localStorage.getItem("auth_token");
    const lastLogin = localStorage.getItem("last_login");
    
    if (token && lastLogin) {
      // Verifica se o último login foi há menos de 24 horas
      const lastLoginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      const timeElapsed = currentTime - lastLoginTime;
      const hoursElapsed = timeElapsed / (1000 * 60 * 60);
      
      if (hoursElapsed < 24) {
        setIsAuthenticated(true);
      } else {
        // Se passou mais de 24 horas, limpa o token
        localStorage.removeItem("auth_token");
        localStorage.removeItem("last_login");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    if (username === "leone" && password === "2601") {
      localStorage.setItem("auth_token", "admin_token");
      localStorage.setItem("last_login", new Date().toISOString());
      setIsAuthenticated(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Erro no login",
      description: "Usuário ou senha incorretos.",
    });
    return false;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("last_login");
    setIsAuthenticated(false);
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}