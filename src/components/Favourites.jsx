import { useSelector } from "react-redux";
import Book from "./Book";
import uniqid from "uniqid";
import { Container, Row, Col } from "react-bootstrap";

export default function Favourites() {
  const favs = useSelector((state) => state.favs);

  return (
    <Container>
      <Row>
        {favs && favs.length > 0 ? (
          favs.map((book) => (
            <Book book={book} key={uniqid()} isFavourite={true} />
          ))
        ) : (
          <Col xs={6} className="mx-auto my-5 text-muted">
            Click on the bookmark icons to add new favourites to this list
          </Col>
        )}
      </Row>
    </Container>
  );
}
