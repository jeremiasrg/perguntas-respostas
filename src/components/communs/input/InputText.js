import React, { useCallback, useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import {
  maskCEP,
  maskCurrency,
  maskCPF,
  maskCNPJ,
  maskTelefone,
  maskCartaoCredito,
  maskValidadeCartao,
} from "../../../base/utils/masks";

function InputText(props) {
  const [state, setState] = useState(props.value);
  const [isInvalid, setIsInvalid] = useState(props.isInvalid);

  useEffect(() => {
    setState(props.value);
    setIsInvalid(props.isInvalid);
  }, [props.value, props.isInvalid]);

  const handleKeyup = useCallback(
    (e) => {
      defineMascara(props, e);
      setState(e.currentTarget.value);
    },
    [props]
  );

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
        case "cartaocredito":
          return maskCartaoCredito(e);
        case "validadecartao":
          return maskValidadeCartao(e);
        default:
      }
    }
  }

  function onChange(value) {
    setState(value.currentTarget.value);
    if (
      props.onChange !== undefined &&
      props.mask !== undefined &&
      props.mask.toLowerCase() === "currency"
    ) {
      let valorOriginal = maskCurrency(value).currentTarget.value;
      let valorFloat = valorOriginal.replace(".", "");
      valorFloat = valorFloat.replace(",", ".");
      let valorFinal = Number(valorFloat);
      props.onChange(value.currentTarget.value, valorFinal);
    } else if (
      props.onChange !== undefined &&
      props.mask !== undefined &&
      props.mask.toLowerCase() === "cpf"
    ) {
      let valorOriginal = maskCurrency(value).currentTarget.value;
      let valorSemPontos = valorOriginal.replace(".", "");
      valorSemPontos = valorSemPontos.replace("-", "");
      props.onChange(value.currentTarget.value, valorSemPontos);
    } else if (
      props.onChange !== undefined &&
      props.mask !== undefined &&
      props.mask.toLowerCase() === "cep"
    ) {
      let valorOriginal = maskCurrency(value).currentTarget.value;
      let valorSemTraco = valorOriginal.replace("-", "");
      props.onChange(value.currentTarget.value, valorSemTraco);
    } else if (props.onChange !== undefined) {
      props.onChange(value.currentTarget.value, null);
    }
  }

  return (
    <Form.Group hasValidation as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>

      <Form.Control
        name={props.name}
        autoComplete="off"
        onKeyUp={handleKeyup}
        onChange={onChange}
        onBlur={(value) => {
          props.onBlur && props.onBlur(value.currentTarget.value);
        }}
        type={props.type}
        required={props.required}
        disabled={props.disabled}
        mask={props.mask}
        placeholder={props.placeholder}
        value={state}
        isInvalid={isInvalid}
      />

      {props.errorFeedback !== undefined ? (
        <Form.Control.Feedback type="invalid">
          {props.errorFeedback}
        </Form.Control.Feedback>
      ) : (
        <Form.Control.Feedback type="invalid">
          Por favor preencha o campo.
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}
export default InputText;
