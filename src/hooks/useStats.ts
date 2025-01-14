import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { BarChart3, CreditCard, Link, Search } from "lucide-react";
import { useCardStats } from "./useCardStats";
import axios from "axios";

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

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await axios.get('/api/stats/read.php');
        if (response.data && Array.isArray(response.data)) {
          setStats(prevStats => {
            // Mescla os dados do servidor com os dados padrão
            const updatedStats = [...prevStats];
            response.data.forEach(serverStat => {
              const index = updatedStats.findIndex(stat => stat.id === serverStat.id);
              if (index !== -1) {
                updatedStats[index] = {
                  ...updatedStats[index],
                  value: serverStat.value
                };
              }
            });
            return updatedStats;
          });
        }
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      }
    };
    loadStats();
  }, []);

  const handleEdit = (id: string) => {
    const stat = stats.find(s => s.id === id);
    if (stat) {
      return stat.value;
    }
    return "";
  };

  const handleSave = async (id: string, value: string) => {
    if (!value.match(/^\d+$/)) {
      toast({
        title: "Erro",
        description: "Por favor, insira apenas números",
        variant: "destructive"
      });
      return;
    }

    try {
      await axios.post('/api/stats/update.php', {
        id,
        value
      });

      setStats(stats.map(stat => 
        stat.id === id ? { ...stat, value } : stat
      ));
      
      toast({
        title: "Sucesso",
        description: "Valor atualizado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao atualizar estatística:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar valor",
        variant: "destructive"
      });
    }
  };

  const handleReset = async (id: string) => {
    try {
      await axios.post('/api/stats/update.php', {
        id,
        value: "0"
      });

      setStats(stats.map(stat => 
        stat.id === id ? { ...stat, value: "0" } : stat
      ));
      
      toast({
        title: "Sucesso",
        description: "Valor zerado com sucesso"
      });
    } catch (error) {
      console.error('Erro ao zerar estatística:', error);
      toast({
        title: "Erro",
        description: "Erro ao zerar valor",
        variant: "destructive"
      });
    }
  };

  return {
    stats,
    handleEdit,
    handleSave,
    handleReset
  };
};