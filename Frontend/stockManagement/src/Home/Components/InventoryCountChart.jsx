import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);



export default function InventoryCountChart({ InventoryData }) {

    const chartRef = useRef(null);
    let chartInstance = null;


    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstance) {
            // Destroy the previous chart instance
            chartInstance.destroy();
        }

        const itemNames = InventoryData.map((item) => item.itemName);
        const quantities = InventoryData.map((item) => item.quantity);
        const colors = [
            'rgba(88, 80, 141)',
            'rgba(247, 183, 163)',
            'rgba(234, 95, 137)',
            'rgba(155, 49, 146)',
            'rgba(87, 22, 126)',
        ]; // Additional colors for slices

        chartInstance = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: itemNames,
                datasets: [
                    {
                        label: 'Inventory',
                        data: quantities,
                        backgroundColor: colors,
                    }
                ]
            },
            options: {
                // Configure chart options
            }
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


