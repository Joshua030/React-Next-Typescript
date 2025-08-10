import { Country } from "../types";
import styles from "./CountryItem.module.css";

interface CountryItemProps {
  country: Country;
}

const flagemojiToPNG = (flag: string): JSX.Element => {
  const countryCode = Array.from(
    flag,
    (char) => (char.codePointAt(0) ?? 127397) - 127397
  )
    .map((charCode) => String.fromCharCode(charCode).toLowerCase())
    .join("");

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`Flag of ${countryCode.toUpperCase()}`}
      width={24}
      height={18}
    />
  );
};

function CountryItem({ country }: CountryItemProps) {
  return (
    <li className={styles.countryItem}>
      <span>{flagemojiToPNG(country.emoji)}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
