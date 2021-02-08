import React from "react";
import { Row, Col } from "react-bootstrap";

const Radio = ({ check, cliente }) => {
  return (
    <div className="form-check">
      <Row>
        <Col>
          <label className="form-check-label" for="flexCheckDefault">
            <p>
              <u>{check.label}</u>
              {": " + cliente[check.path]}
            </p>
          </label>
        </Col>
        <Col>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          ></input>
        </Col>
      </Row>
    </div>
  );
};

export default Radio;
