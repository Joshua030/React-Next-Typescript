import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext.tsx";
import { AuthProvider } from "./contexts/FakeAuthcontext.tsx";
import { Suspense } from "react";
import SpinnerFullPage from "./components/SpinnerFullPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
        <Suspense fallback={<SpinnerFullPage />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </CitiesProvider>
  </AuthProvider>
);
