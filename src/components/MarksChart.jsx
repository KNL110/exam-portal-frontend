import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const MarksChart = ({ marks, totalMarks, examName }) => {
    if (!marks || marks.length === 0) {
        return (
            <div className="chart-placeholder" style={{ textAlign: 'center', padding: '20px' }}>
                <p>No data available for chart</p>
            </div>
        );
    }

    // Create frequency distribution
    const rangeSize = Math.max(1, Math.ceil(totalMarks / 10)); // At least 1, max 10 ranges
    const ranges = [];
    
    for (let i = 0; i <= totalMarks; i += rangeSize) {
        const maxValue = Math.min(i + rangeSize - 1, totalMarks);
        ranges.push({
            label: i === maxValue ? `${i}` : `${i}-${maxValue}`,
            min: i,
            max: maxValue,
            count: 0
        });
    }
    
    // Count students in each range
    marks.forEach(mark => {
        const rangeIndex = Math.floor(mark / rangeSize);
        if (ranges[rangeIndex]) {
            ranges[rangeIndex].count++;
        }
    });

    const data = {
        labels: ranges.map(range => range.label),
        datasets: [
            {
                label: 'Number of Students',
                data: ranges.map(range => range.count),
                backgroundColor: 'rgba(46, 125, 50, 0.8)',
                borderColor: 'rgba(46, 125, 50, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Marks Distribution - ${examName || 'Exam'}`,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: 'Number of Students'
                }
            },
            x: {
                title: {
                    display: true,
                    text: 'Marks Range'
                }
            }
        },
    };

    return (
        <div className="chart-container" style={{ maxWidth: '600px', margin: '20px auto' }}>
            <Bar data={data} options={options} />
        </div>
    );
};
