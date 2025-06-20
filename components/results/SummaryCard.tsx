

"use client";
import { Bar } from "react-chartjs-2";

export function SummaryCard({
  redundancy,
  aiReadiness,
  savings,
}: {
  redundancy: number;
  aiReadiness: number;
  savings: number;
}) {
  const chartData = {
    labels: ["Redundancy", "AI Readiness", "Estimated Savings"],
    datasets: [
      {
        label: "Score",
        data: [redundancy, aiReadiness, savings],
        backgroundColor: ["#EF4444", "#3B82F6", "#FACC15"],
      },
    ],
  };

  return (
    <div className="mb-6 card">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <p className="text-sm mb-1">
        Redundancy Index: <strong>{redundancy}%</strong>
      </p>
      <p className="text-sm mb-1">
        AI Readiness Index: <strong>{aiReadiness}%</strong>
      </p>
      <p className="text-sm mb-4">
        Estimated Savings: <strong>${savings.toLocaleString()}</strong>
      </p>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
        }}
      />
    </div>
  );
}