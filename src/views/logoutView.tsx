import { Navigate, useLocation } from "react-router-dom";
import { PATH_ROOT } from "../routes/constants";
import { useGlobalContext } from "../contexts/global/globalContext";

export default function LogoutView() {
  const context = useGlobalContext();
  const {
    globalContextData: { auth },
    actions: { setGlobalContextData },
  } = context;
  const location = useLocation();
  const currentUser = auth?.currentUser;

  if (!currentUser) {
    auth.signOut();
    setGlobalContextData({ auth });
  }

  return <Navigate to={PATH_ROOT} state={{ from: location }} replace />;
}