import { Pie } from 'react-chartjs-2';
import { Box } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData, ChartDataset } from 'chart.js';

import './style.scss'

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartBox: React.FC = () => {

    const data: ChartData<'pie'> = {
        labels: ['واریز', 'برداشت', 'فراموشی رمز', 'تحلیل تماس'],
        datasets: [
            {
                data: [12, 19, 3, 5],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            } as ChartDataset<'pie'>,
        ],
    };

    const options: ChartOptions<'pie'> = {
        responsive: true,
        layout: {
            padding: {
                left: 50, // Adjust based on the legend size
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
        plugins: {
            legend: {
                rtl: true,
                position: 'left',
                labels: {
                    boxWidth: 7,
                    boxHeight: 7,
                    generateLabels: (chart) => {
                        const data = chart.data;

                        const dataset = data.datasets[0] as ChartDataset<'pie'>;
                        const backgroundColor = dataset.backgroundColor as string[];

                        return data.labels?.map((label, i) => ({
                            text: label as string,
                            fillStyle: backgroundColor[i] || '#000',
                            strokeStyle: '#fff',
                            lineWidth: 0.5,
                        })) || [];
                    },
                    usePointStyle: true,
                    font: {
                        family: 'ShabnamThin, sans-serif',
                        size: 14,
                        lineHeight: 1.5,
                    },
                },
            },
        },
        maintainAspectRatio: false,
    };


    return (
        <Box flex="1" className='PieChartBox'>
            <Pie data={data} options={options} id='1' />
        </Box>
    );
};

export default PieChartBox;
