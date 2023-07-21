import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const SalesVsPurchaseChart = ({ InventoryData }) => {

    const chartRef = useRef(null);
    let chartInstance = null;

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance) {
            // Destroy the previous chart instance
            chartInstance.destroy();
        }

        // Example data for sales and purchases
        const salesData = InventoryData.map((inventory) => inventory.sales); // Example sales data for three categories
        const purchaseData = InventoryData.map((inventory) => inventory.purchase); // Example purchase data for three categories
        const labels = InventoryData.map((inventory) => inventory.itemName);; // Labels for the categories

        chartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Sales',
                        data: salesData,
                        backgroundColor: 'rgba(88, 80, 141)', // Color for sales bars
                    },
                    {
                        label: 'Purchases',
                        data: purchaseData,
                        backgroundColor: 'rgba(188, 80, 144)', // Color for purchase bars
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                // Other chart options
            },
        });

        return () => {
            // Cleanup: Destroy the chart instance when the component unmounts
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [InventoryData]);

    return <canvas ref={chartRef} />;
};

export default SalesVsPurchaseChart;
