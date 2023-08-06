import { Card } from "primereact/card";
import { Link } from "react-router-dom";

export const NotFoundPage = ({ url }: { url: string }) => {
    return (
        <div className="flex justify-center items-center">
            <Card className="w-full">
                <h1 className="text-center text-4xl font-bold my-2">Page Not Found</h1>
                <h3 className="text-center text-2xl">404</h3>
                <Link className="w-full" to={url}><p className="text-center">Go back to home</p></Link>
            </Card>
        </div>
    );
}