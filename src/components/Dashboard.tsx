import { useState } from "react";
import { BarChart3, CreditCard, Link, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StatCard } from "./dashboard/StatCard";
import { StatsChart } from "./dashboard/StatsChart";
import { getFromLocalStorage } from "@/utils/localStorage";

export const Dashboard = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const calculateCardStats = () => {
    const allOrders = getFromLocalStorage('orders', []);
    const creditOrders = allOrders.filter((order: any) => order.payment_method === 'credit');
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    return {
      total: creditOrders.length,
      today: creditOrders.filter((order: any) => new Date(order.timestamp) >= today).length,
      week: creditOrders.filter((order: any) => new Date(order.timestamp) >= sevenDaysAgo).length,
      month: creditOrders.filter((order: any) => new Date(order.timestamp) >= monthStart).length,
    };
  };

  const cardStats = calculateCardStats();
  
  const [stats, setStats] = useState([
    {
      id: "pix",
      title: "Pagamentos PIX",
      value: "32",
      icon: BarChart3,
      description: "Pagamentos gerados hoje"
    },
    {
      id: "cards-total",
      title: "Cartões Coletados",
      value: cardStats.total.toString(),
      icon: CreditCard,
      description: "Total de cartões salvos"
    },
    {
      id: "cards-today",
      title: "Cartões Hoje",
      value: cardStats.today.toString(),
      icon: CreditCard,
      description: "Cartões coletados hoje"
    },
    {
      id: "cards-week",
      title: "Cartões na Semana",
      value: cardStats.week.toString(),
      icon: CreditCard,
      description: "Últimos 7 dias"
    },
    {
      id: "cards-month",
      title: "Cartões no Mês",
      value: cardStats.month.toString(),
      icon: CreditCard,
      description: "Mês atual"
    },
    {
      id: "visits",
      title: "Visitas ao Site",
      value: "156",
      icon: Link,
      description: "Cliques únicos hoje"
    },
    {
      id: "searches",
      title: "Consultas de Rastreio",
      value: "48",
      icon: Search,
      description: "Consultas por CPF hoje"
    }
  ]);

  const handleEdit = (id: string) => {
    const stat = stats.find(s => s.id === id);
    if (stat) {
      setEditValue(stat.value);
      setEditingId(id);
    }
  };

  const handleSave = (id: string) => {
    if (!editValue.match(/^\d+$/)) {
      toast({
        title: "Erro",
        description: "Por favor, insira apenas números",
        variant: "destructive"
      });
      return;
    }

    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, value: editValue } : stat
    ));
    setEditingId(null);
    setEditValue("");
    
    toast({
      title: "Sucesso",
      description: "Valor atualizado com sucesso"
    });
  };

  const handleReset = (id: string) => {
    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, value: "0" } : stat
    ));
    
    toast({
      title: "Sucesso",
      description: "Valor zerado com sucesso"
    });
  };

  const chartData = stats.map(stat => ({
    name: stat.title.split(' ')[0],
    high: parseInt(stat.value) * 1.2,
    low: parseInt(stat.value) * 0.8,
    open: parseInt(stat.value) * 0.9,
    close: parseInt(stat.value) * 1.1,
  }));

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Início</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            {...stat}
            isEditing={editingId === stat.id}
            editValue={editValue}
            onEdit={handleEdit}
            onSave={handleSave}
            onReset={handleReset}
            onEditValueChange={setEditValue}
          />
        ))}
      </div>

      <StatsChart data={chartData} />
    </div>
  );
};