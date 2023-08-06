import { Button } from "primereact/button";
import { TransactionsSimpleListProps } from "./types";

export const TransactionsSimpleListComponent = (transaction: TransactionsSimpleListProps) => {
    return (
        <div className="col-12">
            <div className="flex flex-row align-items-start p-4 gap-4">
                <div className={`w-4rem h-4rem border-circle flex justify-content-center align-items-center ${transaction.type === 'income' ? 'bg-green-800' : 'bg-red-800'}`}>
                    <i className="pi pi-dollar" style={{ fontSize: '2rem' }}></i>
                </div>
                <div className="flex flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-2">
                        <div className="text-2xl font-bold text-900">{transaction.category}</div>
                        <div className="flex align-items-center gap-2">
                            <span className="flex align-items-center gap-2">
                                <span className="font-semibold text-1xl">{transaction.amount}$</span>
                            </span>
                            <span className="flex align-items-center gap-2">
                                <span className="font-semibold text-1xl">{transaction.date}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <Button icon="pi pi-file-edit" className="p-button-rounded" />
                    </div>
                </div>
            </div>
        </div>
    )
}