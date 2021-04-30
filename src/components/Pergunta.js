import React, { useState, useEffect } from "react";

import { Col } from "react-bootstrap";
import TextArea from "../components/communs/input/TextArea";
import CheckBox from "../components/communs/input/CheckBox";
import * as FaIcons from "react-icons/fa";

function Pergunta(props) {
  const [texto, setTexto] = useState("");
  const [multiple, setMultiple] = useState();

  useEffect(() => {
    setTexto(props.texto);
    setMultiple(props.multiplaEscolha);
  }, [props.multiplaEscolha, props.texto]);

  return (
    <Col md="12" id={"Q" + (props.index + 1)}>
      <TextArea
        md="12"
        label={"Questão " + (props.index + 1) + " "}
        autoFocus
        rows="4"
        value={texto}
        onChange={(valor) => {
          setTexto(valor);
          props.onTextoChange(valor);
        }}
        required={true}
      ></TextArea>

      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "115px",
          color: "white",
          cursor: "pointer",
        }}
        onClick={() => {
          props.removePergunta(props.index);
        }}
      >
        <FaIcons.FaTimes />
      </div>

      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "115px",
        }}
      >
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
    </Col>
  );
}
export default Pergunta;
