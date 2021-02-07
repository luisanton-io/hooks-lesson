import React, { useContext } from "react";
import { Navbar } from "react-bootstrap";
import { BookmarkStarFill } from "react-bootstrap-icons";
import { ThemeContext, Themes } from "../contexts/theme";
import ThemeToggler from "./ThemeToggler";
import { useHistory, withRouter } from "react-router-dom";

export default withRouter(function NavigationBar() {
  const [theme] = useContext(ThemeContext);
  const history = useHistory();
  console.log(history.location);
  return (
    <Navbar
      className={`styled-navbar no-select text-white ${
        theme === Themes.dark ? "bg-dark" : "bg-primary"
      }`}
    >
      <ThemeToggler />
      {history.location.pathname !== "/favourites" && (
        <div
          className="d-flex align-items-center ml-auto cursor-pointer"
          onClick={() => {
            history.push("/favourites");
          }}
        >
          <BookmarkStarFill className="mx-2" />
          Favourite Books
        </div>
      )}
    </Navbar>
  );
});
