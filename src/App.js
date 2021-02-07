import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import Routes from "./routes";
import { ThemeContext, initialState } from "./contexts/theme";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

export default function App() {
  const [theme, setTheme] = useState(initialState);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContext.Provider value={[theme, setTheme]}>
          <NavigationBar />
          <Routes />
        </ThemeContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}
