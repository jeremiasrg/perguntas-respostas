import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";

export default (props) => {
  const [state, setState] = useState(props.value);

  useEffect(() => {
    setState(props.value);
  }, [props.value]);

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <Form.Control
        as="textarea"
        required={props.required}
        disabled={props.disabled}
        rows={props.rows}
        name={props.name}
        onChange={(value) => {
          setState(value.target.value);
          props.onChange && props.onChange(value.currentTarget.value);
        }}
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
