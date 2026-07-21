"use client";

import {
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { STATUS_COLORS, STATUS_LABELS } from "@/lib/job-status";
import type { JobStatus } from "@prisma/client";

type StatusCount = { status: JobStatus; _count: number };
type MonthPoint = { month: string; count: number };

export function StatusBarChart({ data }: { data: StatusCount[] }) {
  const chartData = data.map((d) => ({
    status: STATUS_LABELS[d.status],
    count: d._count,
    fill: STATUS_COLORS[d.status],
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a221c" />
        <XAxis
          dataKey="status"
          stroke="#a89a8c"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#a89a8c"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#171310",
            border: "1px solid #2a221c",
            borderRadius: "12px",
            fontSize: "13px",
          }}
          cursor={{ fill: "rgba(232, 117, 43, 0.06)" }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={index} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ApplicationsLineChart({ data }: { data: MonthPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a221c" />
        <XAxis
          dataKey="month"
          stroke="#a89a8c"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#a89a8c"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#171310",
            border: "1px solid #2a221c",
            borderRadius: "12px",
            fontSize: "13px",
          }}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#e8752b"
          strokeWidth={2.5}
          dot={{ fill: "#e8752b", r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
