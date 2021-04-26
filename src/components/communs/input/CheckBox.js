import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
// import { GlobalContext } from "../../../providers/global";

function CheckBox(props) {
  const [state, setState] = useState(false);

  // const { setGlobal } = useContext(GlobalContext);

  async function onChange(value) {
    setState(value.currentTarget.checked);

    if (props.onChange !== undefined) {
      props.onChange(value.currentTarget.checked);
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
        type="checkbox"
        defaultChecked={state}
        checked={props.value}
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
export default CheckBox;
