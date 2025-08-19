// import { getAddress } from "../../services/apiGeocoding";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

type Position = { lat: number; lng: number };
interface UserState {
  username: string;
  status: string;
  position: Position | null;
  address: string;
  error: string | null;
}

function getPosition(): Promise<Position> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => reject(err),
    );
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    lat: positionObj.lat,
    lng: positionObj.lng,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

const initialState: UserState = {
  username: "",
  status: "idle", // Inactivo
  position: null,
  address: "",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddress.pending, (state) => {
      state.status = "loading"; // Cargando
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.status = "idle"; // Cargado con éxito
      state.address = action.payload.address;
      state.position = action.payload.position;
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.status = "error"; // Fallido
      state.error = action.error.message || null;
    });
  },
});

export const { updateName } = userSlice.actions;
export default userSlice.reducer;
