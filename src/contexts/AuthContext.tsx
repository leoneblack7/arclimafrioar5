import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { mysqlService } from "@/utils/mysqlService";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  changeUsername: (oldUsername: string, newUsername: string) => void;
  currentUsername: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUsername, setCurrentUsername] = useState("leone");
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const lastLogin = localStorage.getItem("last_login");
    
    if (token && lastLogin) {
      const lastLoginTime = new Date(lastLogin).getTime();
      const currentTime = new Date().getTime();
      const hoursElapsed = (currentTime - lastLoginTime) / (1000 * 60 * 60);
      
      if (hoursElapsed < 24) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("last_login");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await mysqlService.saveUser({ username, password });
      
      if (response.success) {
        localStorage.setItem("auth_token", "admin_token");
        localStorage.setItem("last_login", new Date().toISOString());
        setIsAuthenticated(true);
        setCurrentUsername(username);
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: "Erro ao tentar fazer login.",
      });
      return false;
    }
  };

  const changeUsername = async (oldUsername: string, newUsername: string) => {
    try {
      const response = await mysqlService.saveUser({
        username: oldUsername,
        newUsername: newUsername
      });

      if (response.success) {
        if (currentUsername === oldUsername) {
          setCurrentUsername(newUsername);
        }
        
        toast({
          title: "Usuário alterado com sucesso!",
          description: `Nome de usuário alterado de ${oldUsername} para ${newUsername}.`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro na alteração",
        description: "Não foi possível alterar o usuário.",
      });
    }
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
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changeUsername, currentUsername }}>
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