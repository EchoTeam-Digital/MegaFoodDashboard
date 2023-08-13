"use client";
import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useTheme } from "next-themes";

const CustomersAndSalesChart = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--text-color");
      const textColorSecondary = documentStyle.getPropertyValue(
        "--text-color-secondary"
      );
      const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

      const data = {
        labels: [
          "يناير",
          "فبراير",
          "مارس",
          "ابريل",
          "مايو",
          "يونيو",
          "يوليو",
          "اغسطس",
          "سبتمبر",
          "اكتوبر",
          "نوفمبر",
          "ديسمبر",
        ],
        datasets: [
          {
            label: "الطلبات",
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
          },
          {
            label: "المبيعات",
            data: [28, 48, 40, 19, 86, 80, 120, 28, 48, 40, 19, 86],
            fill: false,
            borderColor: documentStyle.getPropertyValue("--pink-500"),
            tension: 0.4,
          },
        ],
      };
      const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        plugins: {
          legend: {
            labels: {
              color: theme === 'dark' ? "#fff" : textColor, // Set label color based on mode
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: theme === 'dark' ? "#fff" : textColorSecondary, // Set tick color based on mode
            },
            grid: {
              color: theme === 'dark' ? textColorSecondary : surfaceBorder, // Set grid color based on mode
            },
          },
          y: {
            ticks: {
              color: theme === 'dark' ? "#fff" : textColorSecondary,
            },
            grid: {
              color: theme === 'dark' ? textColorSecondary : surfaceBorder,
            },
          },
        },
      };

      setChartData(data);
      setChartOptions(options);
    }
  }, [theme]);

  return (
    <div className="card w-full">
      <div className="text-end">
        <h1 className="font-extrabold text-gray-500 dark:text-white">
          المبيعات
        </h1>
        <div className="flex justify-end">
          <span className="mr-2 text-success-500">$1,752.30</span>
          <p className="font-medium text-medium text-gray-400">:عائد اليوم</p>
        </div>
      </div>
      <Chart
        type="line"
        data={chartData}
        options={chartOptions}
        height="450px"
        className="dark:text-white"
      />
    </div>
  );
};

export default CustomersAndSalesChart;
