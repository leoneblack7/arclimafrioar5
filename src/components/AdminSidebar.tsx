import { Link } from "react-router-dom";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar = ({ activeSection, onSectionChange }: AdminSidebarProps) => {
  const sections = [
    { id: 'dashboard', label: 'Início' },
    { id: 'products', label: 'Gerenciar Produtos' },
    { id: 'banners', label: 'Gerenciar Banners' },
    { id: 'logo', label: 'Logo da Loja' },
    { id: 'orders', label: 'Pedidos' },
    { id: 'settings', label: 'Configurações' }
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed left-0 top-0">
      <Link to="/" className="block mb-8 text-xl font-bold">
        Painel Admin
      </Link>
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full text-left px-4 py-2 rounded transition-colors ${
              activeSection === section.id
                ? 'bg-primary text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
          >
            {section.label}
          </button>
        ))}
      </nav>
    </div>
  );
};