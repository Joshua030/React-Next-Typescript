import { Link } from "react-router-dom";
import { City } from "../../types";
import styles from "./CityItem.module.css";
import { useCities } from "../../contexts/CitiesContext";
import { flagemojiToPNG } from "../../utils/flagemojiToPNG";
import { MouseEvent } from "react";

interface CityItemProps {
  city: City;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem: React.FC<CityItemProps> = ({ city }) => {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  const handleCityDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!id) return;
    deleteCity(id);
  };

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{flagemojiToPNG(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleCityDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
