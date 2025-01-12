import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r p-4">
      <nav className="space-y-2">
        <button
          onClick={() => onSectionChange("dashboard")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "dashboard" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => onSectionChange("products")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "products" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Produtos
        </button>
        <button
          onClick={() => onSectionChange("featured")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "featured" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Produtos em Destaque
        </button>
        <button
          onClick={() => onSectionChange("logo")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "logo" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Logo
        </button>
        <button
          onClick={() => onSectionChange("banners")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "banners" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Banners
        </button>
        <button
          onClick={() => onSectionChange("orders")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "orders" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Pedidos
        </button>
        <button
          onClick={() => onSectionChange("credit-card-orders")}
          className={`w-full text-left px-4 py-2 rounded ${
            activeSection === "credit-card-orders" ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          Pedidos com Cartão
        </button>
      </nav>
    </aside>
  );
}
