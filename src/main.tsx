import { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import { GlobalContextProvider } from "./contexts/global/globalContext";
import "./i18n/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StrictMode>
    <Suspense fallback="Loading...">
      <GlobalContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </GlobalContextProvider>
    </Suspense>
  </StrictMode>
);
