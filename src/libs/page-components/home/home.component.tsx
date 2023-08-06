import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Chart } from 'primereact/chart';
import { TransactionsSimpleListComponent } from "../../ui/components/transactions-simple-list/transactions-simple-list.component";
import { TransactionsSimpleListProps } from "../../ui/components/transactions-simple-list/types";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const transactions: TransactionsSimpleListProps[] = [
    {
        id: '1',
        type: 'income',
        category: 'salary',
        amount: 100,
        date: '2021-01-01'
    },
    {
        id: '2',
        type: 'spent',
        category: 'food',
        amount: 50,
        date: '2021-01-01'
    }
];

export const HomePageComponent = () => {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();



    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Ingreso', 'Gasto'],
            datasets: [
                {
                    data: [100, 50],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--green-800'),
                        documentStyle.getPropertyValue('--red-800'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--green-700'),
                        documentStyle.getPropertyValue('--red-700'),
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
        setIsLoaded(true);
    }, []);

    const itemTemplate = TransactionsSimpleListComponent;
    return (
        <>
            <div className="w-full flex justify-content-center flex-column">
                <h1 className="text-center">Balance Total: 50</h1>
                <Button label="Agregar Ingreso" className="mb-2 bg-green-800 border-green-800 text-white" onClick={() => navigate('/add-income')} />
                <Button label="Agregar Egreso" className="bg-red-800 border-red-800 text-white mb-4" onClick={() => navigate('/add-spent')} />
                <div className="w-full flex justify-content-center mb-4">
                    {isLoaded && <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-25rem flex justify-content-center" />}
                </div>
            </div>

            <DataView value={transactions} itemTemplate={itemTemplate} />
        </>
    );
};