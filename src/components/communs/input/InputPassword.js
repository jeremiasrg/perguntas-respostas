import React, { useCallback, useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import {
  maskCEP,
  maskCurrency,
  maskCPF,
  maskCNPJ,
  maskTelefone,
} from "../../../base/utils/masks";

export default (props) => {
  const [state, setState] = useState(props.value);

  // useEffect(() => {
  //   setState(props.value);
  // }, []);

  const handleKeyup = useCallback((e) => {
    defineMascara(props, e);
    setState(e.currentTarget.value);
  }, []);

  function defineMascara(props, e) {
    if (typeof props.mask != "undefined") {
      switch (props.mask.toLowerCase()) {
        case "cep":
          return maskCEP(e);
        case "currency":
          return maskCurrency(e);
        case "cpf":
          return maskCPF(e);
        case "cnpj":
          return maskCNPJ(e);
        case "telefone":
          return maskTelefone(e);
      }
    }
  }

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>

      <Form.Control
        type="password"
        name={props.name}
        autoComplete="off"
        onKeyUp={handleKeyup}
        onChange={(value) => {
          setState(value.currentTarget.value);
          props.onChange && props.onChange(value.currentTarget.value);
        }}
        required={props.required}
        mask={props.mask}
        placeholder={props.placeholder}
        value={state}
      />
      {props.errorFeedback && (
        <Form.Control.Feedback type="invalid">
          {props.errorFeedback}
        </Form.Control.Feedback>
      )}
      {!props.errorFeedback && (
        <Form.Control.Feedback type="invalid">
          Por favor preencha o campo.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
