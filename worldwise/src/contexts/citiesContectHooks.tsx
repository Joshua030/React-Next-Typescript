import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { City } from "../types";

const BASE_URL = "http://localhost:3000";

// Define the type for your context
type CitiesContextType = {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  getCity: (id: string | undefined) => void;
  createCity: (newCity: City) => void;
  deleteCity: (id: string) => void;
};

type CitiesProviderProps = {
  children: ReactNode;
};

// export const CitiesContext = createContext<CitiesContextType | undefined>(
//   undefined
// );

function CitiesProvider({ children }: CitiesProviderProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data: City[] = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an erro loading data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCities();
  }, []);

  async function getCity(id: string | undefined) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data: City = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an erro loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity: City) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          ContentType: "application/json",
        },
      });

      const data: City = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id: string) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
  return context;
}

// export { CitiesProvider, useCities };
