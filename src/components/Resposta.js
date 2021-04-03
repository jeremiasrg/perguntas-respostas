import React, { useEffect, useState } from "react";

import { Col, Button } from "react-bootstrap";
import TextArea from "../components/communs/input/TextArea";
import CheckBox from "../components/communs/input/CheckBox";
import RadioButton from "../components/communs/input/RadioButton";

import * as StringUtils from "../base/utils/stringUtils";

export default (props) => {
  const [texto, setTexto] = useState();
  const [check, setCheck] = useState();

  useEffect(() => {
    setCheck(props.check);
  }, [props.multipla, props.check]);

  useEffect(() => {
    setTexto(props.texto);
  }, [props.texto]);

  return (
    <Col md="12">
      <div className="resposta">
        <div className="letra">
          {StringUtils.converteNumeroEmLetra(props.index + 1) + ")"}

          {props.multipla ? (
            <CheckBox
              md="auto"
              value={check}
              onChange={(valor) => {
                // setCheck(valor);
                props.onOpcaoRespostaChange(valor);
              }}
            ></CheckBox>
          ) : (
            <RadioButton
              md="auto"
              value={check}
              onChange={(valor) => {
                // setCheck(true);
                props.onOpcaoRespostaChange(true);
              }}
            ></RadioButton>
          )}
        </div>
        <TextArea
          md="10"
          value={texto}
          onChange={(valor) => {
            setTexto(valor);
            props.onTextoChange(valor);
          }}
          required={true}
          label=" "
        ></TextArea>
        <div style={{ marginTop: "40px" }}>
          <Button
            onClick={() => {
              props.removeResposta(props.indexPergunta, props.index);
            }}
            variant="danger"
            size="sm"
          >
            X
          </Button>
        </div>
      </div>
    </Col>
  );
};
