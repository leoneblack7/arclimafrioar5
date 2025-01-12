import { useStats } from "@/hooks/useStats";
import { StatsGrid } from "./dashboard/StatsGrid";
import { StatsChart } from "./dashboard/StatsChart";

export const Dashboard = () => {
  const { stats, handleEdit, handleSave, handleReset } = useStats();

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
      
      <StatsGrid
        stats={stats}
        onEdit={handleEdit}
        onSave={handleSave}
        onReset={handleReset}
      />

      <StatsChart data={chartData} />
    </div>
  );
};