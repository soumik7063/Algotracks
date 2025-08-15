import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ContestDataContext from "./ContestDataContext.jsx";
import ProfileContext from "./components/profile/ProfileContext.jsx";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
      <ProfileContext>
        <ContestDataContext>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ContestDataContext>
      </ProfileContext>
  </AuthProvider>
);
