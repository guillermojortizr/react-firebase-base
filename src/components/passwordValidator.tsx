import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  PasswordStrength,
  commonPasswords,
  trigraphs,
} from 'tai-password-strength';

const strengthTester = new PasswordStrength();
strengthTester.addCommonPasswords(commonPasswords);
strengthTester.addTrigraphMap(trigraphs);
const VERY_WEAK = 'VERY_WEAK';
const MIN_PASSWORD_LENGTH = 8;
const staticsInitialState = {
  passwordLength: 0,
  strengthCode: '',
  charsets: {
    lower: false,
    number: false,
    symbol: false,
    upper: false,
  },
};

interface Props {
  password: string;
  getIsValidPassword: Function;
}

export default function PasswordValidator({
  password,
  getIsValidPassword,
}: Props) {
  const { t } = useTranslation();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [statics, setPasswordStrengthStatics] = useState(
    staticsInitialState as any
  );

  function validatePassword(password: string): void {
    const result = strengthTester.check(password);
    setPasswordStrengthStatics(result);
  }

  useEffect(() => {
    validatePassword(password);
  }, [password]);

  useEffect(() => {
    const valid =
      statics.passwordLength >= MIN_PASSWORD_LENGTH &&
      statics.strengthCode != VERY_WEAK &&
      statics.charsets.lower &&
      statics.charsets.upper &&
      statics.charsets.number &&
      statics.charsets.symbol;
    setIsValidPassword(valid);
  }, [statics]);

  useEffect(() => {
    getIsValidPassword(isValidPassword);
  }, [isValidPassword]);

  const showIsVeryWeak = () =>
    statics.passwordLength >= MIN_PASSWORD_LENGTH &&
    statics.strengthCode === VERY_WEAK && (
      <li>
        <span>{t('too weak')} ⚠</span>
      </li>
    );

  const showLower = () => <li>{t('lowercase')} <span hidden={!statics.charsets?.lower}>✓</span></li>;
  const showUpper = () => <li>{t('uppercase')} <span hidden={!statics.charsets?.upper}>✓</span></li>;
  const showNumber = () => <li>{t('number')} <span hidden={!statics.charsets?.number}>✓</span></li>;
  const showSymbol = () => <li>{t('symbol')} <span hidden={!statics.charsets?.symbol}>✓</span></li>;
  const showLength = () => <li>{t('minimum length')} <span hidden={statics.passwordLength < MIN_PASSWORD_LENGTH}>✓</span></li>;

  return (
    <details className="dropdown">
      <summary className="btn">🛈</summary>
      <ul className="menu dropdown-content z-[1]">
        {showIsVeryWeak()}
        {showLower()}
        {showUpper()}
        {showNumber()}
        {showSymbol()}
        {showLength()}
      </ul>
    </details>
  );
}
