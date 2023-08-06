import { Navigate, Outlet } from "react-router-dom";

type TProtectedRoute = {
    redirectTo: string;
    isAllowed: boolean;
    children?: React.ReactNode;
}

export const ProtectedRoute = ({ redirectTo, isAllowed, children }: TProtectedRoute) => {
    if (!isAllowed) return <Navigate to={redirectTo} replace />;
    return children ?? <Outlet />
};