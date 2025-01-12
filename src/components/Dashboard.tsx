import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart3, CreditCard, Link, Search, Edit2, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const Dashboard = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  
  const [stats, setStats] = useState([
    {
      id: "pix",
      title: "Pagamentos PIX",
      value: "32",
      icon: BarChart3,
      description: "Pagamentos gerados hoje"
    },
    {
      id: "cards",
      title: "Cartões Coletados",
      value: "24",
      icon: CreditCard,
      description: "Total de cartões salvos"
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
    value: parseInt(stat.value)
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/80 border border-primary/50 p-2 rounded-md backdrop-blur-sm">
          <p className="text-primary font-mono">{`${label}: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Início</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.id} className="border border-primary/20 bg-secondary/5 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-primary animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {editingId === stat.id ? (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-24 bg-black/50 border-primary/30"
                    />
                    <Button
                      size="sm"
                      onClick={() => handleSave(stat.id)}
                      className="bg-primary/20 hover:bg-primary/40"
                    >
                      Salvar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold font-mono text-primary">{stat.value}</div>
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEdit(stat.id)}
                        className="hover:bg-primary/20"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleReset(stat.id)}
                        className="hover:bg-primary/20"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-primary/20 bg-secondary/5 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="font-mono text-primary">Estatísticas Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} className="font-mono">
                <CartesianGrid strokeDasharray="3 3" stroke="#0066FF20" />
                <XAxis 
                  dataKey="name" 
                  stroke="#0066FF" 
                  tick={{ fill: '#0066FF' }}
                />
                <YAxis 
                  stroke="#0066FF" 
                  tick={{ fill: '#0066FF' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="value" 
                  fill="#0066FF"
                  radius={[4, 4, 0, 0]}
                  className="animate-pulse"
                >
                  {chartData.map((entry, index) => (
                    <g key={`cell-${index}`}>
                      <linearGradient
                        id={`colorGradient-${index}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#0066FF" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#0066FF" stopOpacity={0.2} />
                      </linearGradient>
                    </g>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};