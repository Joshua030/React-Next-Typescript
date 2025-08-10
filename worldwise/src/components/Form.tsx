import { FormEvent, useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { ButtonType, City } from "../types";
import BackButton from "./BackButton";
import { useUrlPositions } from "../hooks/useUrlPositions";
import Spinner from "./Spinner";
import { flagemojiToPNG } from "../utils/flagemojiToPNG";
import Message from "./Message";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";

import { es } from "date-fns/locale"; // ✅ correct
import { useCities } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

registerLocale("es", es);

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function convertToEmoji(countryCode: string): string {
  const codePoints: number[] = countryCode
    .toUpperCase()
    .split("")
    .map((char: string): number => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date()); // format: YYYY-MM-DD
  const [notes, setNotes] = useState<string>("");
  const [lat, lng] = useUrlPositions();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode) {
          throw new Error(
            "That doesn't seem to  be a city. Click somewhere else"
          );
        }

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        if (error instanceof Error) {
          setGeocodingError(error.message);
        } else {
          setGeocodingError("An unknown error occurred.");
        }
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cityName || !date || !lat || !lng) return;
    const newCity: City = {
      cityName,
      country,
      emoji: convertToEmoji(emoji),
      date: date.toISOString(),
      notes,
      position: { lat, lng },
    };

    await createCity(newCity);
    navigate("/app");
  };

  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking  on the map" />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCityName(e.target.value)
          }
          value={cityName}
        />
        {emoji && (
          <span className={styles.flag}>
            {flagemojiToPNG(convertToEmoji(emoji))}
          </span>
        )}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(e.target.value)
          }
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
          locale="es"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setNotes(e.target.value)
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={ButtonType.Primary}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
