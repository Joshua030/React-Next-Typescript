export interface City {
  id?: string;
  cityName: string;
  country: string;
  emoji: string;
  date: string; // ISO date string
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
}

export interface Country {
  country: string;
  emoji: string;
}

export enum ButtonType {
  Primary = "primary",
  Back = "back",
  Position = "position",
}
