import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATH_LOGIN } from "../routes/constants";
import { useGlobalContext } from "../contexts/global/globalContext";

export default function Protected() {
    const { globalContextData: { auth } } = useGlobalContext();
    const location = useLocation();
    const currentUser = auth?.currentUser;

    if (!currentUser) {
        return <Navigate to={PATH_LOGIN} state={{ from: location }} replace />;
    }

    return <Outlet />;
}
