import { Auth, signInWithEmailAndPassword } from "firebase/auth";
import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  PATH_DASHBOARD,
  PATH_PASSWORD_RESET,
  PATH_SINGUP,
} from "../routes/constants";
import { useGlobalContext } from "../contexts/global/globalContext";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

async function login(
  form: HTMLFormElement,
  from: string,
  auth: Auth,
  navigate: NavigateFunction
) {
  const formData = new FormData(form);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  if (userCredential.user) {
    navigate(from, { replace: true });
  }
}

export default function LoginView() {
  const { t } = useTranslation();
  const {
    globalContextData: { auth },
  } = useGlobalContext();

  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);

  const from = location.state?.from?.pathname || PATH_DASHBOARD;

  useEffect(() => {
    if (auth.currentUser) navigate(from, { replace: true });
  }, []);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(event.currentTarget, from, auth, navigate).catch((err) => {
      setErrorMessage(err.code.replace("/", "."));
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="email">{t("email")}:</label>
          <input id="email" name="email" type="email" autoComplete="on" />
          <label htmlFor="password">{t("password")}:</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="on"
          />
          <button type="submit">{t("login")}</button>
        </form>
        {errorMessage && <span>{t(errorMessage)}</span>}
      </div>
      <div>
        <span>
          <Link to={PATH_SINGUP}>{t("singup")}</Link>
        </span>
        <span> | </span>
        <span>
          <Link to={PATH_PASSWORD_RESET}>{t("forget your password?")}</Link>
        </span>
      </div>
    </div>
  );
}
