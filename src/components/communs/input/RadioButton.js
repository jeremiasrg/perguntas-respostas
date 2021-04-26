import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
// import { GlobalContext } from "../../../providers/global";

function RadioButton(props) {
  const [setState] = useState(false);

  // const { setGlobal } = useContext(GlobalContext);

  async function onChange(value) {
    setState(value.currentTarget.ckecked);

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
}
export default RadioButton;
