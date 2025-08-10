import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import "./App.css";
// import AppLayout from "./pages/AppLayout";
import MainRoutes from "./routers/MainRoutes";
import CityList from "./components/CityList";

import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { ProtectedRoute } from "./routers/ProtectedRoute";

const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <>
      <Routes>
        <Route
          path="app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList />} />

          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList />} />

          <Route path="form" element={<Form />} />
        </Route>
        <Route path="/*" element={<MainRoutes />} />
      </Routes>
    </>
  );
}

export default App;
