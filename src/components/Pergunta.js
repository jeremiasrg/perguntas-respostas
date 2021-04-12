import React, { useState, useEffect } from "react";

import { Col, Button } from "react-bootstrap";
import TextArea from "../components/communs/input/TextArea";
import CheckBox from "../components/communs/input/CheckBox";

export default (props) => {
  const [texto, setTexto] = useState("");
  const [multiple, setMultiple] = useState();

  useEffect(() => {
    setTexto(props.texto);
    setMultiple(props.multiplaEscolha);
  }, [props.texto]);

  return (
    <Col md="12">
      <div className="pergunta">
        <Col md="auto">
          <div className="numero"> {props.index + 1 + " - "} </div>
        </Col>
        <TextArea
          md="10"
          rows="4"
          value={texto}
          onChange={(valor) => {
            setTexto(valor);
            props.onTextoChange(valor);
          }}
          required={true}
          label=" "
        ></TextArea>
        <Col md="auto">
          <div style={{ marginTop: "65px" }}>
            <Button
              onClick={() => {
                props.removePergunta(props.index);
              }}
              variant="danger"
              size="sm"
            >
              X
            </Button>
          </div>
        </Col>
        <div style={{ marginTop: "65px" }}>
          <CheckBox
            md="auto"
            label="Multipla escolha?"
            value={multiple}
            onChange={(valor) => {
              setMultiple(valor);
              props.onMultiplaEscolhaChange(valor);
            }}
          ></CheckBox>
        </div>
      </div>
    </Col>
  );
};
