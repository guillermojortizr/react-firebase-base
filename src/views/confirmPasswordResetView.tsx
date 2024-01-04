import { useState } from "react";
import { useLocation } from "react-router-dom";
import { confirmPasswordReset } from "firebase/auth";
import { useGlobalContext } from "../contexts/global/globalContext";
import PasswordValidator from "../components/passwordValidator";
import { useTranslation } from "react-i18next";

export default function ConfirmPasswordResetView() {
  const { t } = useTranslation();
  const {
    globalContextData: { auth },
  } = useGlobalContext();

  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const oobCode = params.get("oobCode") ?? "";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newPassword = formData.get("password") as string;

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
    } catch (error) {
      const { code, message } = error as unknown as any;
      console.error({ code, message });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="password">{t("enter new password")}:</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="on"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <PasswordValidator password={password} getIsValidPassword={setValid} />
        <button type="submit" disabled={!valid}>
          {t("save")}
        </button>
      </form>
    </div>
  );
}
