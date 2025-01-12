import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartDataPoint {
  name: string;
  high: number;
  low: number;
  open: number;
  close: number;
}

interface StatsChartProps {
  data: ChartDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/80 border border-primary/50 p-2 rounded-md backdrop-blur-sm">
        <p className="text-primary font-mono text-xs">{label}</p>
        <p className="text-primary font-mono text-xs">High: {payload[0].payload.high.toFixed(0)}</p>
        <p className="text-primary font-mono text-xs">Low: {payload[0].payload.low.toFixed(0)}</p>
        <p className="text-primary font-mono text-xs">Open: {payload[0].payload.open.toFixed(0)}</p>
        <p className="text-primary font-mono text-xs">Close: {payload[0].payload.close.toFixed(0)}</p>
      </div>
    );
  }
  return null;
};

export const StatsChart = ({ data }: StatsChartProps) => {
  return (
    <Card className="border border-primary/20 bg-secondary/5 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-mono text-primary">Estatísticas Gerais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} className="font-mono">
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
                dataKey="high"
                fill="#0066FF"
                opacity={0.3}
                isAnimationActive={true}
              />
              <Line
                type="monotone"
                dataKey="close"
                stroke="#0066FF"
                strokeWidth={2}
                dot={{ fill: '#0066FF', r: 4 }}
                isAnimationActive={true}
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};