import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [selectedBanner, setSelectedBanner] = useState<number>(0);

  const banners = [
    "/lovable-uploads/be106df6-7f56-49b8-8767-4cf73aa20a7b.png",
    "/lovable-uploads/3f83f27c-39bc-4118-9240-41e9d4d45fbf.png",
    "/lovable-uploads/b628c938-51f7-44ca-9c86-ff0be454ec82.png",
    "/lovable-uploads/cac2472b-8231-4414-8fd3-13200a6cecc9.png"
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