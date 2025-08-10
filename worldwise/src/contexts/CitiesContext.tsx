import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
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

interface InitialState {
  cities: City[];
  isLoading: boolean;
  currentCity: City | null;
  error: string | null;
}

type CitiesProviderProps = {
  children: ReactNode;
};

const CitiesContext = createContext<CitiesContextType | undefined>(undefined);

const initialState: InitialState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: null,
};

enum CitiesActionKind {
  LOAD = "cities/loaded",
  CREATE = "cities/created",
  DELETE = "cities/deleted",
  LOADING = "loading",
  REJECTED = "rejected",
  LOADINGCITY = "city/loaded",
}

// An interface for our actions
// 5. Discriminated union for actions
type CitiesAction =
  | { type: CitiesActionKind.LOADING }
  | { type: CitiesActionKind.LOAD; payload: City[] }
  | { type: CitiesActionKind.LOADINGCITY; payload: City }
  | { type: CitiesActionKind.CREATE; payload: City }
  | { type: CitiesActionKind.DELETE; payload: string }
  | { type: CitiesActionKind.REJECTED; payload: string };

// 6. Reducer
function reducer(state: InitialState, action: CitiesAction): InitialState {
  switch (action.type) {
    case CitiesActionKind.LOADING:
      return { ...state, isLoading: true };
    case CitiesActionKind.LOAD:
      return { ...state, isLoading: false, cities: action.payload };
    case CitiesActionKind.LOADINGCITY:
      return { ...state, isLoading: false, currentCity: action.payload };
    case CitiesActionKind.CREATE:
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case CitiesActionKind.DELETE:
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case CitiesActionKind.REJECTED:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
}

function CitiesProvider({ children }: CitiesProviderProps) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );
  // const [cities, setCities] = useState<City[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState<City | null>(null);

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: CitiesActionKind.LOADING });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data: City[] = await res.json();
        dispatch({ type: CitiesActionKind.LOAD, payload: data });
        // setCities(data);
      } catch (error) {
        dispatch({
          type: CitiesActionKind.REJECTED,
          payload: "There was an erro loading data....",
        });
        // alert("There was an erro loading data");
      }
      // } finally {
      //   setIsLoading(false);
      // }
    }

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id: string | undefined) {
    try {
      dispatch({ type: CitiesActionKind.LOADING });
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data: City = await res.json();
      dispatch({ type: CitiesActionKind.LOADINGCITY, payload: data });
      // setCurrentCity(data);
    } catch (error) {
      dispatch({
        type: CitiesActionKind.REJECTED,
        payload: "There was an erro loading data....",
      });
      // alert("There was an erro loading data");
    }
    // } finally {
    //   setIsLoading(false);
    // }
  }, []);

  async function createCity(newCity: City) {
    try {
      // setIsLoading(true);
      dispatch({ type: CitiesActionKind.LOADING });
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          ContentType: "application/json",
        },
      });

      const data: City = await res.json();
      // setCities((cities) => [...cities, data]);

      dispatch({ type: CitiesActionKind.CREATE, payload: data });
    } catch (error) {
      // alert("There was an error creating city");
      dispatch({
        type: CitiesActionKind.REJECTED,
        payload: "There was an error creating city....",
      });
    }
    // } finally {
    //   setIsLoading(false);
    // }
  }

  async function deleteCity(id: string) {
    try {
      // setIsLoading(true);
      dispatch({ type: CitiesActionKind.LOADING });
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: CitiesActionKind.DELETE, payload: id });
    } catch (error) {
      dispatch({
        type: CitiesActionKind.REJECTED,
        payload: "There was an error deleting city....",
      });
      alert("There was an error deleting city");
    }
    // } finally {
    //   setIsLoading(false);
    // }
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

export { CitiesProvider, useCities };
