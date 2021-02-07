import { Action } from "../store/actions";
import { Button, Col, Image } from "react-bootstrap";
import { BookmarkStarFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";

export default function Book({ book, index, offset, isFavourite }) {
  const dispatch = useDispatch();

  return (
    <Col xs={12} className="d-flex align-items-center">
      {Number.isInteger(index) && Number.isInteger(offset) && (
        <span className="text-muted" style={{ minWidth: 20 }}>
          {offset + index + 1}
        </span>
      )}
      <Image
        fluid
        src={book.img}
        style={{ width: 150 }}
        className="my-3 mx-3"
      />
      <div>
        <h5>{book.title}</h5>
        <span>{book.price}</span>
        <Button
          variant={isFavourite ? "primary" : "secondary"}
          className="my-2 d-block"
          onClick={() => {
            dispatch({
              type: isFavourite ? Action.removeFav : Action.addFav,
              payload: book
            });
          }}
        >
          <BookmarkStarFill style={{ fontSize: "1.3em" }} />
        </Button>
      </div>
    </Col>
  );
}
