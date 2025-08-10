import { useCities } from "../../contexts/CitiesContext";
import { City, Country } from "../../types";
import CountryItem from "../CountryItem";
import Message from "../Message";
import Spinner from "../Spinner";
import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  const countries: Country[] = cities.reduce<Country[]>((arr, city: City) => {
    if (!arr.some((el) => el.country === city.country)) {
      arr.push({ country: city.country, emoji: city.emoji });
    }
    return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
