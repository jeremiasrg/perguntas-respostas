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

  const handleMultSelect = (e) => {
    const options = e.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setState(value);
  };

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

  return (
    <Form.Group as={Col} md={props.md || "12"}>
      <Form.Label>
        {props.label}
        {props.required ? <span className="requiredLabel">*</span> : null}
      </Form.Label>
      <Form.Control
        onChange={handleMultSelect}
        as="select"
        multiple
        required={props.required}
        defaultValue={props.value}
        name={props.name}
        value={state}
      >
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
