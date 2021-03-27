import React, { useState, useEffect, useContext } from "react";
import { Form, Col } from "react-bootstrap";
import * as operations from "../operations.js";
// import { GlobalContext } from "../../../providers/global";

export default (props) => {
  const [state, setState] = useState(props.value);
  const [options, setOptions] = useState();

  // const { setGlobal } = useContext(GlobalContext);

  useEffect(() => {
    async function callAPI() {
      // setGlobal({ isLoading: true });
      await escreveOptions(props);
      // setGlobal({ isLoading: false });
    }
    callAPI();
  }, []);

  useEffect(() => {
    setState(props.value);
  }, [props.value, props.options]);

  async function escreveOptions(props) {
    const options = props.options;

    if (Array.isArray(options)) {
      if (options !== undefined && options !== null) {
        const resultado = options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ));
        setOptions(resultado);
      }
    } else {
      let resultado = await operations.init(props.options);

      setOptions(resultado);
    }

    return null;
  }

  function onChange(e) {
    const options = e.target.options;
    let value;
    let text;
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value = options[i].value;
        text = options[i].text;
      }
    }
    setState(value);
    if (props.onChange !== undefined) {
      props.onChange(value, text);
    }
  }

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <Form.Control
        onChange={onChange}
        as="select"
        required={props.required}
        disabled={props.disabled}
        defaultValue={props.value}
        name={props.name}
        value={state}
      >
        <option value={""}>Selecione</option>
        {options}
      </Form.Control>
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
