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
    id: "github",
    name: "GitHub Dark",
    colors: {
      primary: "#238636",
      secondary: "#30363d",
      accent: "#58a6ff",
      background: "#0d1117",
      text: "#c9d1d9"
    }
  },
  {
    id: "discord",
    name: "Discord",
    colors: {
      primary: "#5865F2",
      secondary: "#2f3136",
      accent: "#ed4245",
      background: "#36393f",
      text: "#dcddde"
    }
  },
  {
    id: "spotify",
    name: "Spotify",
    colors: {
      primary: "#1DB954",
      secondary: "#282828",
      accent: "#1ed760",
      background: "#121212",
      text: "#ffffff"
    }
  },
  {
    id: "twitter",
    name: "Twitter Blue",
    colors: {
      primary: "#1DA1F2",
      secondary: "#15202b",
      accent: "#794bc4",
      background: "#192734",
      text: "#ffffff"
    }
  },
  {
    id: "netflix",
    name: "Netflix",
    colors: {
      primary: "#E50914",
      secondary: "#141414",
      accent: "#564d4d",
      background: "#000000",
      text: "#ffffff"
    },
    gradient: "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)"
  },
  {
    id: "facebook",
    name: "Facebook",
    colors: {
      primary: "#1877F2",
      secondary: "#f0f2f5",
      accent: "#42b72a",
      background: "#ffffff",
      text: "#050505"
    }
  },
  {
    id: "amazon",
    name: "Amazon",
    colors: {
      primary: "#FF9900",
      secondary: "#232F3E",
      accent: "#37475A",
      background: "#EAEDED",
      text: "#111111"
    }
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    colors: {
      primary: "#0A66C2",
      secondary: "#f3f2ef",
      accent: "#057642",
      background: "#ffffff",
      text: "#000000"
    }
  },
  {
    id: "instagram",
    name: "Instagram",
    colors: {
      primary: "#E4405F",
      secondary: "#405DE6",
      accent: "#FFDC80",
      background: "#ffffff",
      text: "#262626"
    },
    gradient: "linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d)"
  },
  {
    id: "twitch",
    name: "Twitch",
    colors: {
      primary: "#9146FF",
      secondary: "#18181B",
      accent: "#bf94ff",
      background: "#0e0e10",
      text: "#efeff1"
    }
  }
];

export const ThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState<string>(() => {
    return localStorage.getItem("admin-theme") || "github";
  });

  const applyTheme = (theme: Theme) => {
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

    localStorage.setItem("admin-theme", theme.id);
    setCurrentTheme(theme.id);
    toast.success(`Tema ${theme.name} aplicado com sucesso!`);
  };

  useEffect(() => {
    const savedTheme = themes.find(t => t.id === currentTheme);
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gerenciador de Temas</CardTitle>
        <CardDescription>
          Escolha entre diferentes temas inspirados em grandes sites
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};