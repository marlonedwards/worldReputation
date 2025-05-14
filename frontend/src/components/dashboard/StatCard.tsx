
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis,
  Tooltip
} from "recharts";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: number;
  data?: { name: string; value: number }[];
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon,
  trend,
  data,
  className
}: StatCardProps) {
  // Mock data if not provided
  const chartData = data || [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 45 },
    { name: "Apr", value: 50 },
    { name: "May", value: 35 },
    { name: "Jun", value: 65 },
    { name: "Jul", value: 75 }
  ];
  
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <div className="h-5 w-5 text-muted-foreground">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="h-[60px] mt-3">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart 
              data={chartData} 
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" hide />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {payload[0].payload.name}
                            </span>
                            <span className="font-bold text-sm">
                              {payload[0].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#1E88E5"
                fillOpacity={1}
                fill="url(#colorValue)"
                activeDot={{ r: 4, fill: "#1E88E5", strokeWidth: 0 }}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
            {trend !== undefined && (
              <span className={cn(
                "ml-1 font-medium", 
                trend > 0 ? "text-emerald-500" : 
                trend < 0 ? "text-red-500" : ""
              )}>
                {trend > 0 && "+"}{trend}%
              </span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
