import Favourites from "../components/Favourites";
import Main from "../components/Main";
import { Switch, Route } from "react-router";
import { useContext, useMemo } from "react";
import { ThemeContext, Themes } from "../contexts/theme";
import uniqid from "uniqid";

const routeProps = [
  {
    path: "/",
    component: Main,
    exact: true
  },
  {
    path: "/favourites",
    component: Favourites
  }
];

export default function Routes() {
  const [theme] = useContext(ThemeContext);

  const routes = useMemo(
    () => (
      <Switch>
        {routeProps.map((props) => (
          <Route {...props} key={uniqid()} />
        ))}
      </Switch>
    ),
    []
  );

  return (
    <div
      className={`${theme === Themes.dark ? "dark-wrapper" : "light-wrapper"}`}
    >
      {routes}
    </div>
  );
}
