import React, { useState, useContext } from "react";
import { Form, Col } from "react-bootstrap";
// import { GlobalContext } from "../../../providers/global";

export default (props) => {
  const [state, setState] = useState("");

  // const { setGlobal } = useContext(GlobalContext);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function onChange(e) {
    let file = e.target.files[0];
    // setGlobal({ isLoading: true });
    let retorno = await toBase64(file);
    console.log(retorno);
    props.onChange && props.onChange(retorno);
    setState(retorno);
    // setGlobal({ isLoading: false });
  }

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <Form.File required={props.required} onChange={onChange} />
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
