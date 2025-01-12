import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatData {
  id: string;
  title: string;
  value: string;
}

interface StatsChartProps {
  stats: StatData[];
}

export const StatsChart = ({ stats }: StatsChartProps) => {
  // Transform stats data for the chart
  const chartData = stats.map(stat => ({
    name: stat.title.split(' ')[0], // Simplify labels to first word only
    value: parseInt(stat.value)
  }));

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Visão Geral das Estatísticas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer
            config={{
              primary: {
                theme: {
                  light: "var(--primary)",
                  dark: "var(--primary)",
                },
              },
            }}
          >
            <BarChart 
              data={chartData} 
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              maxBarSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                width={40}
              />
              <Tooltip 
                content={<ChartTooltip />}
                cursor={{ fill: 'transparent' }}
              />
              <Bar 
                dataKey="value" 
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};