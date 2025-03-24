import React from "react";
import { Accordion } from "react-bootstrap";

const FAQ = (props) => {
  return (
    <>
      <Accordion.Item eventKey={props.id} className="py-2 my-2 item">
        <Accordion.Header>{`Q. ${props.question}`}</Accordion.Header>

        <Accordion.Body>{`Ans. ${props.answer}`}</Accordion.Body>
      </Accordion.Item>
    </>
  );
};

export default FAQ;
