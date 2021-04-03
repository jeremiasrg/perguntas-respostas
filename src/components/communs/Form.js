import React, { useState, useContext } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import InputText from "./input/InputText";
import InputDate from "./input/InputDate";
import InputDateTime from "./input/InputDateTime";
import SelectBox from "./input/SelectBox";
import MultipleSelectBox from "./input/MultipleSelectBox";
import TextArea from "./input/TextArea";
import InputFile from "./input/InputFile";
import * as APIUtils from "../../base/utils/apiUtils";
import * as DateUtils from "../../base/utils/dateUtils";
import * as operations from "../../components/communs/operations";

// import { GlobalContext } from "../../providers/global";

export default (props) => {
  const [validated, setValidated] = useState(false);

  // const { setGlobal } = useContext(GlobalContext);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      onSave();
      setValidated(false);
      form.reset();
    }
  };

  const onSave = async () => {
    // setGlobal({ isLoading: true });
    if (props.onSave === undefined) {
      let json = await montarJsonAPI();
      console.log(json);

      if (props.data.id === undefined) {
        // Novo
        await APIUtils.invokePostAPI(
          props.data.context,
          json,
          APIUtils.getToken()
        );
      } else {
        // Editar
        await APIUtils.invokePutAPI(
          props.data.context,
          json,
          APIUtils.getToken()
        );
      }
      if (props.onAfterSave) {
        props.onAfterSave();
      }
    } else {
      props.onSave();
    }
    // setGlobal({ isLoading: false });
  };

  function escreveCamposDoForm(props) {
    if (props.data !== undefined && props.data.fields !== undefined) {
      console.log(props.data);
      const fields = props.data.fields;

      let result = [];

      for (let index = 0; index < fields.length; index++) {
        const element = fields[index];
        if (element.type === "InputText") {
          let valorTemp = element.value;

          if (
            element.mask === "currency" &&
            valorTemp !== null &&
            valorTemp !== undefined
          ) {
            valorTemp = parseFloat(valorTemp);
            valorTemp = valorTemp.toFixed(2) + "";
            valorTemp = valorTemp.replace(".", ",");
          }
          result.push(
            <InputText
              key={index}
              name={element.name}
              placeholder={element.placeholder}
              label={element.label}
              required={element.required}
              disabled={element.disabled}
              mask={element.mask}
              value={valorTemp}
              md={element.md}
            />
          );
        } else if (element.type === "InputDate") {
          result.push(
            <InputDate
              key={index}
              name={element.name}
              placeholder={element.placeholder}
              label={element.label}
              required={element.required}
              disabled={element.disabled}
              value={element.value}
              md={element.md}
            />
          );
        } else if (element.type === "InputDateTime") {
          result.push(
            <InputDateTime
              key={index}
              name={element.name}
              placeholder={element.placeholder}
              label={element.label}
              required={element.required}
              disabled={element.disabled}
              value={element.value}
              md={element.md}
            />
          );
        } else if (element.type === "SelectBox") {
          result.push(
            <SelectBox
              key={index}
              name={element.name}
              options={element.options}
              required={element.required}
              value={element.value}
              md={element.md}
              label={element.label}
              disabled={element.disabled}
            ></SelectBox>
          );
        } else if (element.type === "MultipleSelectBox") {
          console.log("valor recuperado");
          console.log(element.value);

          result.push(
            <MultipleSelectBox
              key={index}
              name={element.name}
              options={element.options}
              value={element.value}
              required={element.required}
              md={element.md}
              label={element.label}
              disabled={element.disabled}
            ></MultipleSelectBox>
          );
        } else if (element.type === "TextArea") {
          result.push(
            <TextArea
              key={index}
              value={element.value}
              rows={element.rows}
              name={element.name}
              required={element.required}
              md={element.md}
              label={element.label}
              disabled={element.disabled}
            ></TextArea>
          );
        } else if (element.type === "InputFile") {
          result.push(
            <InputFile
              name={element.name}
              key={index}
              label={element.label}
              required={element.required}
              md={element.md}
              disabled={element.disabled}
            />
          );
        } else if (element.type === "Title") {
          result.push(
            <Form.Group style={{ marginTop: "15px" }} as={Col} md="12">
              <h5> {element.label} </h5>
            </Form.Group>
          );
        } else if (element.type === "Space") {
          result.push(
            <Form.Group
              style={{ marginTop: "15px" }}
              as={Col}
              md={element.md}
            ></Form.Group>
          );
        }
      }
      return result;
    }
  }

  const montarJsonAPI = async () => {
    const campos = props.data.fields;

    let objJson = {};
    if (props.data.id !== null && props.data.id !== undefined) {
      objJson["_id"] = props.data.id;
    }
    for (let index = 0; index < campos.length; index++) {
      const element = campos[index];
      let valor = "";
      let comp = document.getElementsByName(element.name);

      if (comp[0] !== undefined && comp[0] !== "") {
        if (campos[index].mask === "currency") {
          let valorString = comp[0].value + "";
          valorString = valorString.replace(".", "");
          valorString = valorString.replace(",", ".");
          valor = Number(valorString);
        } else if (campos[index].type === "InputDateTime") {
          let valorString = comp[0].value;
          valor = DateUtils.convertStringDateToUSDate(valorString);
        } else if (
          campos[index].type === "SelectBox" ||
          campos[index].type === "InputText"
        ) {
          valor = comp[0].value;
          if (valor === "") {
            valor = null;
          }
        } else if (campos[index].type === "MultipleSelectBox") {
          console.log("multiple");
          console.log(comp[0].options);

          const options = comp[0].options;
          let arrayValue = [];
          for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
              arrayValue.push(options[i].value);
            }
          }
          valor = arrayValue;

          if (valor === "null") {
            valor = null;
          }
        } else {
          valor = comp[0].value;
        }
      } else if (campos[index].type === "Method") {
        valor = await operations.init(campos[index].method);
      } else {
        if (element.type === "InputText") {
          valor = "";
        } else {
          valor = null;
        }
      }
      let attrs = null;
      if (element.name === undefined) {
        attrs = [];
      } else {
        attrs = element.name.split(".");
      }

      let stringLogica = "objJson";
      for (let i = 0; i < attrs.length; i++) {
        stringLogica = stringLogica + "['" + attrs[i] + "']";

        if (attrs.length - 1 === i) {
          const attr = attrs[i];
          if (valor === "") {
            // console.log(stringLogica);
            eval(stringLogica + "=" + "''");
          } else if (valor === null) {
            // console.log(stringLogica);
            eval(stringLogica + "=" + "null");
          } else if (Array.isArray(valor)) {
            let valorFinal = "";
            for (let z = 0; z < valor.length; z++) {
              valorFinal = valorFinal + "'" + valor[z] + "',";
            }
            valorFinal = valorFinal.substr(0, valorFinal.length - 1);
            eval(stringLogica + "=[" + valorFinal + "]");
          } else {
            // console.log("BBBBBBBB");
            // console.log(valor);

            eval(stringLogica + "=" + "`" + valor + "`");
          }
          // console.log(stringLogica);
        } else if (eval(stringLogica) === undefined) {
          const attr = attrs[i];
          eval(stringLogica + "=" + "{}");
          // console.log(stringLogica + "=" + "{}");
          // console.log(attr);
        }
      }
    }
    if (props.teste !== null && props.teste === true) {
      console.log(objJson);
      console.log("Agora em String");
      console.log(JSON.stringify(objJson));
    }

    return objJson;
  };

  return (
    <Form
      className="normal-form"
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >
      <Form.Row>{escreveCamposDoForm(props)}</Form.Row>
      {props.children}
      <Container
        fluid
        style={{
          // backgroundColor: "white",
          // padding: 0,
          marginTop: "-11px",
          // paddingRight: "10px",
          // paddingLeft: "10px",
        }}
      >
        <Row>
          <Col md={props.mdButtons}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {props.teste || props.teste === true ? (
                <Button
                  type="Button"
                  onClick={montarJsonAPI}
                  variant="secondary"
                >
                  Testar saida
                </Button>
              ) : null}
              <div style={{ width: "10px" }}></div>
              {props.showSaveButton || props.showSaveButton === undefined ? (
                <Button type="submit" variant="secondary">
                  {props.saveLabel === undefined ? "Salvar" : props.saveLabel}
                </Button>
              ) : null}
              <div style={{ width: "10px" }}></div>
              {props.showCancelButton ||
              props.showCancelButton === undefined ? (
                <Button variant="danger" onClick={props.onCancel}>
                  {props.cancelLabel === undefined
                    ? "Cancelar"
                    : props.cancelLabel}
                </Button>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};
