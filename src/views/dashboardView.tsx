import { useTranslation } from "react-i18next";

export default function DashboardView() {
  const { t } = useTranslation();
  return <>{t('dashboard')}</>
}
