import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mysqlService } from "@/utils/mysqlService";

interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  gradient?: string;
}

const themes: Theme[] = [
  {
    id: "pandora",
    name: "Pandora Style",
    colors: {
      primary: "#FFB6C1",
      secondary: "#FFC0CB",
      accent: "#FF69B4",
      background: "#FFF0F5",
      text: "#4A4A4A"
    },
    gradient: "linear-gradient(135deg, #fdfcfb 0%, #FFB6C1 100%)"
  },
  {
    id: "nike",
    name: "Nike Sport",
    colors: {
      primary: "#000000",
      secondary: "#FF4655",
      accent: "#FFFFFF",
      background: "#F5F5F5",
      text: "#000000"
    }
  },
  {
    id: "apple",
    name: "Apple Clean",
    colors: {
      primary: "#000000",
      secondary: "#86868b",
      accent: "#0066CC",
      background: "#FFFFFF",
      text: "#1d1d1f"
    }
  },
  {
    id: "samsung",
    name: "Samsung Tech",
    colors: {
      primary: "#1428A0",
      secondary: "#000000",
      accent: "#0077C8",
      background: "#FFFFFF",
      text: "#000000"
    }
  },
  {
    id: "zara",
    name: "Zara Fashion",
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#808080",
      background: "#F5F5F5",
      text: "#000000"
    }
  },
  {
    id: "adidas",
    name: "Adidas Sport",
    colors: {
      primary: "#000000",
      secondary: "#FFFFFF",
      accent: "#00A3E0",
      background: "#F5F5F5",
      text: "#000000"
    }
  },
  {
    id: "amazon",
    name: "Amazon Shop",
    colors: {
      primary: "#FF9900",
      secondary: "#232F3E",
      accent: "#37475A",
      background: "#EAEDED",
      text: "#111111"
    }
  },
  {
    id: "sephora",
    name: "Sephora Beauty",
    colors: {
      primary: "#000000",
      secondary: "#FF0000",
      accent: "#C4008F",
      background: "#FFFFFF",
      text: "#000000"
    },
    gradient: "linear-gradient(45deg, #FF0000, #C4008F)"
  },
  {
    id: "louis-vuitton",
    name: "Louis Vuitton Luxury",
    colors: {
      primary: "#964B00",
      secondary: "#000000",
      accent: "#B87A3D",
      background: "#FFFFFF",
      text: "#000000"
    }
  },
  {
    id: "gucci",
    name: "Gucci Fashion",
    colors: {
      primary: "#1F1F1F",
      secondary: "#BA8B02",
      accent: "#E4B120",
      background: "#FFFFFF",
      text: "#000000"
    },
    gradient: "linear-gradient(45deg, #BA8B02, #E4B120)"
  }
];

export const ThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");

  const applyTheme = async (theme: Theme) => {
    const root = document.documentElement;
    const { colors } = theme;

    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--text", colors.text);

    if (theme.gradient) {
      root.style.setProperty("--theme-gradient", theme.gradient);
    } else {
      root.style.removeProperty("--theme-gradient");
    }

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

  useEffect(() => {
    const loadSavedTheme = async () => {
      try {
        const activeTheme = await mysqlService.getActiveTheme();
        if (activeTheme) {
          const themeToApply = themes.find(t => t.id === activeTheme.id) || themes[0];
          applyTheme(themeToApply);
        }
      } catch (error) {
        console.error("Error loading saved theme:", error);
      }
    };

    loadSavedTheme();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciador de Temas</CardTitle>
        <CardDescription>
          Escolha entre diferentes temas inspirados em grandes lojas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className={`p-4 rounded-lg border transition-all cursor-pointer hover:scale-105 ${
                currentTheme === theme.id
                  ? "ring-2 ring-primary"
                  : "hover:border-primary"
              }`}
              style={{
                background: theme.gradient || theme.colors.background,
                border: `1px solid ${theme.colors.primary}`
              }}
              onClick={() => applyTheme(theme)}
            >
              <h3 className="font-semibold mb-2" style={{ color: theme.colors.text }}>
                {theme.name}
              </h3>
              <div className="flex gap-2">
                {Object.entries(theme.colors).map(([key, color]) => (
                  <div
                    key={key}
                    className="w-6 h-6 rounded-full"
                    style={{ backgroundColor: color }}
                    title={key}
                  />
                ))}
              </div>
              <div className="mt-4 p-2 rounded" style={{ background: theme.colors.background }}>
                <div className="flex items-center justify-between mb-2" style={{ color: theme.colors.text }}>
                  <span>Preview</span>
                  <div className="flex gap-2">
                    <div className="w-4 h-4" style={{ background: theme.colors.primary }} />
                    <div className="w-4 h-4" style={{ background: theme.colors.secondary }} />
                  </div>
                </div>
                <div 
                  className="h-12 rounded"
                  style={{ 
                    background: theme.gradient || theme.colors.accent,
                    border: `1px solid ${theme.colors.primary}`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
