import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Col,
  Container,
  Row,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Pagination,
  Button
} from "react-bootstrap";
import { ArrowCounterclockwise } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import uniqid from "uniqid";
import Book from "./Book";

const categories = ["scifi", "romance", "horror", "history", "fantasy"];
const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

export default function Main() {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);

  const [selectedPage, setSelectedPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [bookList, setBookList] = useState([]);

  const [category, setCategory] = useState("scifi");

  const capitalizedCategory = useMemo(() => capitalize(category), [category]);

  const favs = useSelector((state) => state.favs);

  const getBooks = useCallback(async () => {
    try {
      let query = `?offset=${offset}`;
      limit && (query += `&limit=${limit}`);
      category && (query += `&category=${category}`);

      const response = await fetch(
        "https://strive-bookstore.herokuapp.com/books" + query
      );

      if (!response.ok) throw new Error("Connection issue: " + response.body);

      const { data, numberOfItems } = await response.json();

      if (!(data instanceof Array)) throw new Error("Incorrect data format");

      setBookList(data);
      setPages(Math.floor(numberOfItems / limit));
      console.log("Fetched list.");
    } catch (error) {
      console.log(error.message);
    }
  }, [offset, limit, category]);

  useEffect(() => {
    setOffset(limit * (selectedPage - 1));
  }, [selectedPage, limit]);

  useEffect(() => {
    selectedPage > pages && setSelectedPage(pages);
  }, [limit, pages, selectedPage, setSelectedPage]);

  useEffect(getBooks, [getBooks, offset, limit, category]);

  return (
    <Container>
      <Row>
        <Col xs={12} className="d-flex justify-content-center mt-3">
          <Pagination>
            {(() => {
              let items = [];
              for (let pageN = 1; pageN <= pages; pageN++) {
                items.push(
                  <Pagination.Item
                    key={uniqid()}
                    active={pageN === selectedPage}
                    onClick={() => setSelectedPage(pageN)}
                  >
                    {pageN}
                  </Pagination.Item>
                );
              }
              return items;
            })()}
          </Pagination>
        </Col>
        <Col xs={4} className="d-flex flex-column justify-content-around">
          <span>Category:</span>
          <DropdownButton
            as={ButtonGroup}
            variant="primary"
            title={capitalizedCategory}
          >
            {categories.map((category, index) => (
              <Dropdown.Item
                key={uniqid()}
                eventKey={index}
                onClick={() => setCategory(category)}
              >
                {capitalize(category)}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col xs={4} className="d-flex flex-column justify-content-around">
          <span>Items per page:</span>
          <DropdownButton as={ButtonGroup} variant="primary" title={limit}>
            {[10, 20, 30].map((number, index) => (
              <Dropdown.Item
                key={uniqid()}
                eventKey={index}
                onClick={() => setLimit(number)}
              >
                {number}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>
        <Col xs={4} className="d-flex flex-column justify-content-around">
          <span>Refresh:</span>
          <Button onClick={getBooks}>
            <ArrowCounterclockwise />
          </Button>
        </Col>
        {bookList &&
          bookList.map((book, index) => (
            <Book
              book={book}
              index={index}
              offset={offset}
              key={uniqid()}
              isFavourite={favs.some((fav) => fav.asin === book.asin)}
            />
          ))}
      </Row>
    </Container>
  );
}
