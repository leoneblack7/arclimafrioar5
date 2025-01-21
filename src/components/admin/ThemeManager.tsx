import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mysqlService } from "@/utils/mysqlService";
import { ThemeCard } from "./theme/ThemeCard";
import { Theme } from "@/types/theme";

const themes: Theme[] = [
  {
    id: "default",
    name: "ArclimaFrio Padrão",
    colors: {
      primary: "#0066CC",
      secondary: "#004999",
      accent: "#0088FF",
      background: "#FFFFFF",
      text: "#000000"
    }
  },
  {
    id: "modern-tech",
    name: "Tecnologia Moderna",
    colors: {
      primary: "#6E59A5",
      secondary: "#1A1F2C",
      accent: "#D6BCFA",
      background: "#F1F0FB",
      text: "#1A1F2C"
    },
    gradient: "linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)"
  },
  {
    id: "eco-fresh",
    name: "Eco Fresh",
    colors: {
      primary: "#4CAF50",
      secondary: "#2E7D32",
      accent: "#81C784",
      background: "#F2FCE2",
      text: "#1B5E20"
    },
    gradient: "linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)"
  },
  {
    id: "sunset-breeze",
    name: "Brisa do Pôr do Sol",
    colors: {
      primary: "#FF9800",
      secondary: "#F57C00",
      accent: "#FFB74D",
      background: "#FFF3E0",
      text: "#E65100"
    },
    gradient: "linear-gradient(to right, #ffc3a0 0%, #ffafbd 100%)"
  },
  {
    id: "ocean-wave",
    name: "Onda do Oceano",
    colors: {
      primary: "#0288D1",
      secondary: "#01579B",
      accent: "#4FC3F7",
      background: "#E1F5FE",
      text: "#01579B"
    },
    gradient: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
  },
  {
    id: "luxury-gold",
    name: "Luxo Dourado",
    colors: {
      primary: "#FFD700",
      secondary: "#B8860B",
      accent: "#DAA520",
      background: "#FFFAF0",
      text: "#8B4513"
    },
    gradient: "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7)"
  },
  {
    id: "luxury-dark",
    name: "Luxo Escuro",
    colors: {
      primary: "#C0A080",
      secondary: "#2C2C2C",
      accent: "#E0C0A0",
      background: "#1A1A1A",
      text: "#FFFFFF"
    },
    gradient: "linear-gradient(to right, #2C2C2C, #1A1A1A)"
  },
  {
    id: "nature-fresh",
    name: "Natureza Fresca",
    colors: {
      primary: "#4CAF50",
      secondary: "#388E3C",
      accent: "#81C784",
      background: "#F1F8E9",
      text: "#212121"
    },
    gradient: "linear-gradient(108deg, rgba(242,245,139,1) 17.7%, rgba(148,197,20,0.68) 91.2%)"
  },
  {
    id: "ocean-breeze",
    name: "Brisa do Mar",
    colors: {
      primary: "#039BE5",
      secondary: "#0277BD",
      accent: "#4FC3F7",
      background: "#E1F5FE",
      text: "#01579B"
    },
    gradient: "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)"
  },
  {
    id: "sunset-glow",
    name: "Brilho do Pôr do Sol",
    colors: {
      primary: "#FF9800",
      secondary: "#F57C00",
      accent: "#FFB74D",
      background: "#FFF3E0",
      text: "#E65100"
    },
    gradient: "linear-gradient(111.4deg, rgba(238,113,113,1) 1%, rgba(246,215,148,1) 58%)"
  },
  {
    id: "royal-purple",
    name: "Roxo Real",
    colors: {
      primary: "#9C27B0",
      secondary: "#7B1FA2",
      accent: "#BA68C8",
      background: "#F3E5F5",
      text: "#4A148C"
    },
    gradient: "linear-gradient(102.3deg, rgba(147,39,143,1) 5.9%, rgba(234,172,232,1) 64%, rgba(246,219,245,1) 89%)"
  }
];

export const ThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const activeTheme = await mysqlService.getActiveTheme();
        if (activeTheme) {
          setCurrentTheme(activeTheme.id);
        }
      } catch (error) {
        console.error("Error loading saved theme:", error);
      }
    };

    loadSavedTheme();
  }, []);

  const applyTheme = async (theme: Theme) => {
    try {
      await mysqlService.saveTheme({
        id: theme.id,
        name: theme.name,
        colors: theme.colors,
        gradient: theme.gradient,
        is_active: true
      });
      
      setCurrentTheme(theme.id);
      toast.success(`Tema ${theme.name} aplicado com sucesso!`);
      
    } catch (error) {
      console.error("Error applying theme:", error);
      toast.error("Erro ao aplicar tema");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciador de Temas</CardTitle>
        <CardDescription>
          Escolha entre diferentes temas para personalizar sua loja
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              isActive={currentTheme === theme.id}
              onSelect={applyTheme}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
