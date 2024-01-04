import { useTranslation } from "react-i18next"

export default function LandingView() {
  const { t } = useTranslation()
  return <>{t('welcome')}</>
}