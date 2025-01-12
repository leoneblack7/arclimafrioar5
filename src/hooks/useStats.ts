import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, CreditCard, Link, Search } from "lucide-react";
import { useCardStats } from "./useCardStats";

export const useStats = () => {
  const { toast } = useToast();
  const cardStats = useCardStats();
  
  const [stats, setStats] = useState([
    {
      id: "visits-no-purchase",
      title: "Visitas sem Compra",
      value: "124",
      icon: Link,
      description: "Visitas sem finalizar compra hoje"
    },
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
      return stat.value;
    }
    return "";
  };

  const handleSave = (id: string, value: string) => {
    if (!value.match(/^\d+$/)) {
      toast({
        title: "Erro",
        description: "Por favor, insira apenas números",
        variant: "destructive"
      });
      return;
    }

    setStats(stats.map(stat => 
      stat.id === id ? { ...stat, value } : stat
    ));
    
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

  return {
    stats,
    handleEdit,
    handleSave,
    handleReset
  };
};