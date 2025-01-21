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
  // ... Continuing with more themes
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
  // Add more themes here...
  {
    id: "nordic-frost",
    name: "Gelo Nórdico",
    colors: {
      primary: "#90CAF9",
      secondary: "#64B5F6",
      accent: "#42A5F5",
      background: "#E3F2FD",
      text: "#1565C0"
    },
    gradient: "linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)"
  }
];

export const ThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [previewFrame, setPreviewFrame] = useState<HTMLIFrameElement | null>(null);

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
      
      // Update preview iframe if it exists
      if (previewFrame?.contentWindow) {
        const doc = previewFrame.contentWindow.document;
        const style = doc.createElement('style');
        style.textContent = `
          :root {
            --primary: ${theme.colors.primary};
            --secondary: ${theme.colors.secondary};
            --accent: ${theme.colors.accent};
            --background: ${theme.colors.background};
            --text: ${theme.colors.text};
            ${theme.gradient ? `--theme-gradient: ${theme.gradient};` : ''}
          }
        `;
        doc.head.appendChild(style);
      }
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
              
              {/* Theme Preview */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4 bg-white shadow-lg">
                <div className="absolute top-0 w-full h-12" style={{ background: theme.colors.primary }}>
                  <div className="flex items-center h-full px-4">
                    <div className="w-24 h-6 rounded" style={{ background: theme.colors.accent }}></div>
                  </div>
                </div>
                <div className="absolute top-16 left-4 right-4">
                  <div className="w-full h-8 rounded mb-2" style={{ background: theme.colors.secondary }}></div>
                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-1/3 h-16 rounded"
                        style={{ background: theme.colors.accent }}
                      ></div>
                    ))}
                  </div>
                  <div className="w-3/4 h-4 rounded mb-2" style={{ background: theme.colors.text }}></div>
                  <div className="w-1/2 h-4 rounded" style={{ background: theme.colors.text }}></div>
                </div>
              </div>

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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};