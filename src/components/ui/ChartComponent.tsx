
import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'area' | 'pie' | 'radar';

type ChartProps = {
  type: ChartType;
  data: any[];
  xKey: string;
  yKeys: {
    key: string;
    name?: string;
    color?: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  title?: string;
  subtitle?: string;
};

// Default colors for charts
const COLORS = ['#0284c7', '#0891b2', '#0ea5e9', '#38bdf8', '#7dd3fc'];

const ChartComponent = ({
  type,
  data,
  xKey,
  yKeys,
  height = 300,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  title,
  subtitle,
}: ChartProps) => {
  // Assign default colors if not provided
  const chartYKeys = yKeys.map((item, index) => ({
    ...item,
    color: item.color || COLORS[index % COLORS.length],
  }));

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {chartYKeys.map((item, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={item.key}
                name={item.name || item.key}
                stroke={item.color}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {chartYKeys.map((item, index) => (
              <Bar
                key={index}
                dataKey={item.key}
                name={item.name || item.key}
                fill={item.color}
              />
            ))}
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey={xKey} />
            <YAxis />
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
            {chartYKeys.map((item, index) => (
              <Area
                key={index}
                type="monotone"
                dataKey={item.key}
                name={item.name || item.key}
                fill={item.color}
                stroke={item.color}
                fillOpacity={0.3}
              />
            ))}
          </AreaChart>
        );
      case 'pie':
        // For pie charts, we format the data differently
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => entry[xKey]}
              outerRadius={80}
              dataKey={chartYKeys[0].key}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </PieChart>
        );
      case 'radar':
        return (
          <RadarChart cx="50%" cy="50%" outerRadius={80} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={xKey} />
            <PolarRadiusAxis />
            {chartYKeys.map((item, index) => (
              <Radar
                key={index}
                name={item.name || item.key}
                dataKey={item.key}
                stroke={item.color}
                fill={item.color}
                fillOpacity={0.6}
              />
            ))}
            {showTooltip && <Tooltip />}
            {showLegend && <Legend />}
          </RadarChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {title && <h3 className="text-sm font-medium">{title}</h3>}
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      <div className="mt-2" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
