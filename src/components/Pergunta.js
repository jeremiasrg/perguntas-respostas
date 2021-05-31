import React, { useState, useEffect } from "react";

import { Col } from "react-bootstrap";
import TextArea from "../components/communs/input/TextArea";
import CheckBox from "../components/communs/input/CheckBox";
import * as FaIcons from "react-icons/fa";

import InputFile from "../components/communs/input/InputFile";

import { i18n } from "../translate/i18n";

function Pergunta(props) {
  const [texto, setTexto] = useState("");
  const [multiple, setMultiple] = useState();
  const [img, setImg] = useState("");

  useEffect(() => {
    setTexto(props.texto);
    setMultiple(props.multiplaEscolha);
    setImg(props.img);
  }, [props.multiplaEscolha, props.texto, props.img]);

  return (
    <>
      <Col md="12" id={"Q" + (props.index + 1)}>
        <TextArea
          md="12"
          label={i18n.t("messages.question") + (props.index + 1) + " "}
          autoFocus
          rows="4"
          value={texto}
          onChange={(valor) => {
            setTexto(valor);
            props.onTextoChange(valor);
          }}
          required={true}
        ></TextArea>

        <div
          style={{
            position: "absolute",
            top: "0px",
            right: "20px",
            color: "white",
            cursor: "pointer",
          }}
          onClick={() => {
            props.removePergunta(props.index);
          }}
        >
          <FaIcons.FaTimes style={{ color: "#ff5252" }} />
        </div>
      </Col>
      <Col md="6" style={{ marginTop: "-15px" }}>
        <CheckBox
          md="auto"
          label={i18n.t("messages.multipleChoice")}
          value={multiple}
          onChange={(valor) => {
            setMultiple(valor);
            props.onMultiplaEscolhaChange(valor);
          }}
        ></CheckBox>
      </Col>
      <Col md="6" style={{ marginTop: "-15px" }}>
        <FaIcons.FaImage
          className="icon-img"
          onClick={() => {
            document.getElementById("ipf" + props.index + 1).click();
          }}
        />
        <InputFile
          accept=".jpg"
          onChange={(e, file) => {
            if (file.size < 15000) {
              console.log(file);
              setImg(e);
              props.onImgChange(e);
            } else {
              alert(i18n.t("messages.builder12"));
            }
          }}
          style={{ display: "none" }}
          id={"ipf" + props.index + 1}
        ></InputFile>
      </Col>
      <Col
        md="12"
        style={{
          marginLeft: "15px",
          marginTop: "-15px",
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        {img && <img alt="img" src={img} width="100%"></img>}
      </Col>
    </>
  );
}
export default Pergunta;
