import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../firebase/app";
import { PATH_LOGIN } from "../routes/constants";
import { useState } from "react";
import { useGlobalContext } from "../contexts/global/globalContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function PasswordResetView() {
  const { t } = useTranslation();
  const { globalContextData: { auth } } = useGlobalContext();
  const [sent, setSent] = useState<boolean | null>(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (error) {
      setSent(null);
      console.error(error);
    }
  }

  return (
    <>
      {sent && <div>{t('code sent successfully')}</div>}

      {sent === null && <div>{t('error sending code')}</div>}

      {!sent && <div>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">{t('email')}:</label>
            <input id="email" name="email" type="email" autoComplete="on" />
            <button type="submit">{t('send')}</button>
          </form>
        </div>
        <div>
          <span>
            <Link to={PATH_LOGIN}>{t('login')}</Link>
          </span>
        </div>
      </div>}
    </>
  );
}
