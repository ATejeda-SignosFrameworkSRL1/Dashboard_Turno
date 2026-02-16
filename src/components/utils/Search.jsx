import React from "react";
import { Row, Col, Form, InputGroup, FloatingLabel } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";

export const Search = ({ search, setSearch }) => {
  const handleChangeSearch = (e) => {
    const inputSearch = e.target.value;
    setSearch(inputSearch);
  };

  return (
    <>
      <InputGroup>
        <FloatingLabel controlId="floatingInputText" label="Buscar">
          <Form.Control
            type="text"
            autoComplete="off"
            placeholder="Buscar"
            value={search}
            onChange={handleChangeSearch}
          />
        </FloatingLabel>
        <InputGroup.Text
          style={{
            width: "58px",
            justifyContent: "center",
            backgroundColor: "#0d6efd",
            borderColor: "#0d6efd",
          }}
        >
          <CiSearch
            style={{ width: "24px", height: "24px", color: "#FFFFFF" }}
          />
        </InputGroup.Text>
      </InputGroup>
    </>
  );
};
