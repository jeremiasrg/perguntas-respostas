import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Form, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

registerLocale("pt", pt);

function InputDate(props) {
  const [state, setState] = useState(props.value);

  useEffect(() => {
    if (props.value === undefined || props.value === null) {
      setState(null);
    } else {
      setState(new Date(props.value));
    }
  }, [props.value]);

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <DatePicker
        locale="pt"
        autoComplete="off"
        selected={state}
        name={props.name}
        onChange={(value) => {
          setState(new Date(value));
          console.log(value);

          props.onChange && props.onChange(new Date(value));
        }}
        placeholderText={props.placeholder}
        required={props.required}
      />
    </Form.Group>
  );
}

export default InputDate;
