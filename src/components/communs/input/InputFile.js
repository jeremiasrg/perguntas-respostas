import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
// import { GlobalContext } from "../../../providers/global";

function InputFile(props) {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState("");

  // const { setGlobal } = useContext(GlobalContext);

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const toBinaryString = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  async function onChange(e) {
    let file = e.target.files[0];
    // setGlobal({ isLoading: true });
    // console.log(file);

    let retorno;

    if (props.tpRetorno === undefined) {
      retorno = await toBase64(file);
      // console.log(retorno);
    } else {
      retorno = await toBinaryString(file);
      // console.log(retorno);
    }
    props.onChange && props.onChange(retorno, file);
    setState(retorno);
    // setGlobal({ isLoading: false });
  }

  return (
    <Form.Group style={props.style} as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <Form.File
        accept={props.accept}
        id={props.id}
        required={props.required}
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
export default InputFile;
