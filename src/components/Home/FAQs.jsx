import React, { useState } from "react";
import FAQ from "./FAQ";
import faqAPI from "../../apis/faqAPI";
import { Accordion } from "react-bootstrap";
import "../../stylesheets/Home/FAQs.css";

const FAQs = () => {
  const [faq] = useState(faqAPI);
  return (
    <>
      <section className="faq-section" id="faq">
        <div className="container">
          <div className="mb-1 section-title text-center">
            <h2>FAQs</h2>
            <p style={{ color: "var(--textLight)" }}>Here is some FAQs.</p>
          </div>

          <Accordion>
            {faq.map((element) => {
              const { id, question, answer } = element;
              return <FAQ id={id} question={question} answer={answer} />;
            })}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default FAQs;
