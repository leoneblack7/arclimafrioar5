import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedBanner, setSelectedBanner] = useState<number>(0);

  const banners = [
    "/lovable-uploads/e9383322-dd18-4278-8a53-e88e5446ffcb.png",
    "/lovable-uploads/a0789ab6-2c1a-4953-8f38-5c7f5eed8ea1.png",
    "/lovable-uploads/1c1e50b3-34fd-4534-815c-81860aeffec9.png",
    "/lovable-uploads/37d5d2b4-9a29-44df-93a9-66c2a43bdb82.png"
  ];

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add("dark");
    const savedTheme = localStorage.getItem("theme") || "dark";
    const savedBanner = localStorage.getItem("adminBanner") || "0";
    setTheme(savedTheme as "light" | "dark");
    setSelectedBanner(Number(savedBanner));
    document.body.style.backgroundImage = `url(${banners[Number(savedBanner)]})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  const changeBanner = (index: number) => {
    setSelectedBanner(index);
    localStorage.setItem("adminBanner", String(index));
    document.body.style.backgroundImage = `url(${banners[index]})`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        {theme === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        )}
      </Button>
      <div className="flex flex-col gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg">
        {banners.map((banner, index) => (
          <div
            key={index}
            onClick={() => changeBanner(index)}
            className={`w-8 h-8 rounded cursor-pointer bg-cover ${
              selectedBanner === index ? "ring-2 ring-primary" : ""
            }`}
            style={{ backgroundImage: `url(${banner})` }}
          />
        ))}
      </div>
    </div>
  );
}