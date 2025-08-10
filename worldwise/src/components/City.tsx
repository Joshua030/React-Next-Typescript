import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { useParams } from "react-router-dom";

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

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

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");
  // TEMP DATA

  //debut location
  // const location = useLocation();
  // useEffect(() => {
  //   console.log("Navigation occurred:", location.key, location.pathname);
  // }, [location]);

  useEffect(() => {
    console.trace("City mounted");
  }, []);

  useEffect(() => {
    getCity(id);
  }, [id, getCity]);

  if (isLoading || !currentCity) return <Spinner />;

  const { cityName, emoji, notes, date } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name {id}</h6>
        <h3>
          <span>{flagemojiToPNG(emoji)}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
