import React, { useState } from "react";
import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import { Form, Col } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import pt from "date-fns/locale/pt";

registerLocale("pt", pt);

function InputDate(props) {
  const [state, setState] = useState(props.value);

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
        dateFormat="dd/MM/yyyy H:mm"
        name={props.name}
        placeholderText={props.placeholder}
        required={props.required}
        showTimeInput
        timeInputLabel="Horário:"
        onChange={(date) => setState(date)}
      />
    </Form.Group>
  );
}

export default InputDate;
