import React, { useState, useContext } from "react";
import { Form, Col } from "react-bootstrap";
// import { GlobalContext } from "../../../providers/global";

export default (props) => {
  const [state, setState] = useState(false);

  // const { setGlobal } = useContext(GlobalContext);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function onChange(value) {
    setState(value.currentTarget.ckecked);
    console.log(value.currentTarget.value);

    if (props.onChange !== undefined) {
      props.onChange(value.currentTarget.ckecked);
    }
  }

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      {/* <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label> */}
      <Form.Check
        required={props.required}
        type="radio"
        checked={props.value}
        name={props.name}
        label={props.label}
        onChange={onChange}
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
