import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function Myprogress() {
  const data = {
    labels: [
      "23 Sep",
      "24 Sep",
      "25 Sep",
      "26 Sep",
      "27 Sep",
      "28 Sep",
      "29 Sep",
      "30 Sep",
      "01 Oct",
    ],
    datasets: [
      {
        label: "Present",
        data: [20, 35, 70, 85, 60, 90, 55, 40, 20],
        borderColor: "#fb923c",
        backgroundColor: "rgba(251,146,60,0.35)",
        fill: true,
        tension: 0.45,
        pointRadius: 0,
      },
      {
        label: "Absence",
        data: [10, 40, 30, 20, 75, 60, 50, 30, 15],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.35)",
        fill: true,
        tension: 0.45,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#fb7185",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#64748b",
          maxRotation: 0,
          autoSkip: true,
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: (v) => `${v}%`,
          color: "#64748b",
        },
        grid: {
          color: "#e5e7eb",
        },
      },
    },
  };

  return (
    <div className="w-full flex justify-center px-2 md:px-4">
      <div
        className="
          w-full max-w-5xl
          h-[260px] sm:h-[300px] md:h-[340px]
          p-4 md:p-6
          rounded-2xl shadow-lg
          bg-white text-slate-800
          dark:bg-slate-900 dark:text-slate-100
          transition-colors duration-500
        "
      >
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h2 className="text-base md:text-lg font-semibold">
            Total Attendance Report
          </h2>

          <div className="flex gap-4 text-xs md:text-sm">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-400"></span>
              Present
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Absence
            </span>
          </div>
        </div>

       
        <div className="relative w-full h-full">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
