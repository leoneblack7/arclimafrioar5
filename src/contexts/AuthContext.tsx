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
    console.log("AuthProvider mounted");
    const token = localStorage.getItem("auth_token");
    const lastLogin = localStorage.getItem("last_login");
    
    if (token && lastLogin) {
      const lastLoginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      const hoursElapsed = (currentTime - lastLoginTime) / (1000 * 60 * 60);
      
      console.log("Token exists, hours elapsed:", hoursElapsed);
      
      if (hoursElapsed < 24) {
        console.log("Setting authenticated to true");
        setIsAuthenticated(true);
      } else {
        console.log("Token expired, clearing");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("last_login");
        setIsAuthenticated(false);
      }
    } else {
      console.log("No token found");
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    console.log("Login attempt:", username);
    
    if (username === "leone" && password === "2601") {
      console.log("Login successful");
      const now = new Date();
      localStorage.setItem("auth_token", "admin_token");
      localStorage.setItem("last_login", now.toISOString());
      setIsAuthenticated(true);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo.",
      });
      return true;
    }
    
    console.log("Login failed");
    toast({
      variant: "destructive",
      title: "Erro no login",
      description: "Usuário ou senha incorretos.",
    });
    return false;
  };

  const logout = () => {
    console.log("Logging out");
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