import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PasswordStrength,
  commonPasswords,
  trigraphs,
} from "tai-password-strength";
import { useEffect, useState } from "react";
import PasswordValidator from "../components/passwordValidator";
import { PATH_DASHBOARD, PATH_LOGIN } from "../routes/constants";
import { useGlobalContext } from "../contexts/global/globalContext";
import { useTranslation } from "react-i18next";

const strengthTester = new PasswordStrength();
strengthTester.addCommonPasswords(commonPasswords);
strengthTester.addTrigraphMap(trigraphs);

export default function SingupView() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || PATH_DASHBOARD;
  const {
    globalContextData: { auth },
  } = useGlobalContext();
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (auth?.currentUser) navigate(from, { replace: true });
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">{t("email")}:</label>
        <input id="email" name="email" type="email" autoComplete="on" />
        <label htmlFor="password">{t("password")}:</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <PasswordValidator password={password} getIsValidPassword={setValid} />
        <button type="submit" disabled={!valid}>
          {t("singup")}
        </button>
      </form>
      <div>
        <span>
          <Link to={PATH_LOGIN}>{t("already registered?")}</Link>
        </span>
      </div>
    </div>
  );
}
