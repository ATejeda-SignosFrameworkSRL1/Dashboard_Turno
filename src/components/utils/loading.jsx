import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

export const Loading = () => {
  const [widthLoad, setWidthLoad] = useState();

  useEffect(() => {
    const sidebar = localStorage.getItem("sidebar") ?? true;
    setWidthLoad(sidebar);
  }, []);

  return (
    <>
      <Row
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "12.5em",
          marginTop: "12.5em",
          width: "100%",
        }}
      >
        <Col xs={12}>
          <span className="loader"></span>
        </Col>
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <h3 style={{ color: "white", marginLeft: "1em" }}>Consultando...</h3>
        </Col>
      </Row>
    </>
  );
};
