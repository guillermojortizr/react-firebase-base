import { Routes as RoutesBase, Route } from "react-router-dom";
import Protected from "../components/protected";
import {
  PATH_CONFIRM_PASSWORD_RESET,
  PATH_DASHBOARD,
  PATH_LOGIN,
  PATH_LOGOUT,
  PATH_PASSWORD_RESET,
  PATH_ROOT,
  PATH_SINGUP,
} from "./constants";
import Public from "../components/public";
import ConfirmPasswordResetView from "../views/confirmPasswordResetView";
import DashboardView from "../views/dashboardView";
import LandingView from "../views/landingView";
import LoginView from "../views/loginView";
import PasswordResetView from "../views/passwordResetView";
import SingupView from "../views/singupView";
import LogoutView from "../views/logoutView";

export default function Routes() {
  return (
    <RoutesBase>
      <Route element={<Protected />}>
        <Route path={PATH_DASHBOARD} element={<DashboardView />} />
      </Route>
      <Route element={<Public />}>
        <Route path={PATH_ROOT} element={<LandingView />} />
        <Route path={PATH_SINGUP} element={<SingupView />} />
        <Route path={PATH_LOGIN} element={<LoginView />} />
        <Route path={PATH_PASSWORD_RESET} element={<PasswordResetView />} />
        <Route
          path={PATH_CONFIRM_PASSWORD_RESET}
          element={<ConfirmPasswordResetView />}
        />
        <Route path={PATH_LOGOUT} element={<LogoutView />} />
      </Route>
    </RoutesBase>
  );
}
