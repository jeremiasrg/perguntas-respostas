import React, { useState, useEffect } from "react";

import PageBase from "../pages/PageBase";
import Form from "../components/communs/Form";
import { Col, Container, Row, Modal, Button, Image } from "react-bootstrap";
import InputText from "../components/communs/input/InputText";
import CheckBox from "../components/communs/input/CheckBox";
import RadioButton from "../components/communs/input/RadioButton";
import InputFile from "../components/communs/input/InputFile";
import TextArea from "../components/communs/input/TextArea";
import * as StringUtils from "../base/utils/stringUtils";
import * as CypherUtils from "../base/utils/cypherUtils";
import Pergunta from "../components/Pergunta";
import Resposta from "../components/Resposta";

import xml2js from "xml2js";

export default (props) => {
  const [nome, setNome] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [size, setSize] = useState(0);
  const [xml, setXml] = useState();

  const auxPerguntas = [...perguntas];

  function addPergunta(texto = "", respostas = [{ text: "", check: false }]) {
    let questions = perguntas;

    questions.push({
      multiple: false,
      question: texto,
      answers: respostas,
    });

    setPerguntas(questions);
    setSize(perguntas.length);
  }

  function removePergunta(index) {
    console.log("Remove pergunta: " + index);

    let questions = perguntas;

    questions.splice(index, 1);

    setPerguntas(questions);
    setSize(perguntas.length);
  }

  function addResposta(perguntaIndex) {
    console.log(perguntaIndex);

    let questions = perguntas;
    questions[perguntaIndex].answers.push({ text: "", check: false });
    console.log(questions[perguntaIndex].answers.length);

    setPerguntas(questions);
    setSize(size + 1);
  }

  function removeResposta(perguntaIndex, respostaIndex) {
    let questions = perguntas;
    questions[perguntaIndex].answers.splice(respostaIndex, 1);

    setPerguntas(questions);
    setSize(size + 1);
  }

  function resetRespostas(i) {
    auxPerguntas[i].answers.map((resposta, index) => {
      resposta.check = false;
    });
    console.log("Perguntas resetadas");
    console.log(auxPerguntas);
  }

  const escrevePerguntas = () => {
    return auxPerguntas.map((pergunta, index) => (
      <Row>
        <Pergunta
          texto={auxPerguntas[index].question}
          index={index}
          onTextoChange={(valor) => (auxPerguntas[index].question = valor)}
          onMultiplaEscolhaChange={(valor) => {
            resetRespostas(index);
            auxPerguntas[index].multiple = valor;
            setSize(size + 1);
          }}
          removePergunta={() => {
            removePergunta(index);
          }}
        ></Pergunta>

        {pergunta.answers.map((resposta, i) => (
          <Resposta
            indexPergunta={index}
            index={i}
            check={resposta.check}
            texto={resposta.text}
            onTextoChange={(valor) => (resposta.text = valor)}
            multipla={auxPerguntas[index].multiple}
            removeResposta={() => {
              removeResposta(index, i);
            }}
            onOpcaoRespostaChange={(valor) => {
              if (auxPerguntas[index].multiple) {
                // resetRespostas(index);
                resposta.check = valor;
                setSize(size + 1);
              } else {
                resetRespostas(index);
                resposta.check = true;
                setSize(size + 1);
              }
            }}
          ></Resposta>
        ))}
        <Col md="12">
          <div className="btn-add-resposta">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                addResposta(index);
              }}
            >
              + Adicionar resposta
            </Button>
          </div>
        </Col>
      </Row>
    ));
  };

  const carregaXML = (xml) => {
    let parser = new xml2js.Parser();

    // let cleanedString = value.replace("\ufeff", "");

    parser
      .parseStringPromise(xml)
      .then(function (result) {
        console.log(result);

        setNome(result.Test.$.title);
        result.Test.Questions[0].Question.map((pergunta, i) => {
          //console.log(pergunta);
          let pTexto = pergunta.$.text;
          let respostas = [];
          pergunta.Answers[0].Answer.map((resposta, i2) => {
            console.log(resposta.$.correct);

            respostas.push({
              text: resposta.$.text,
              check: resposta.$.correct === "true",
            });
          });
          console.log(respostas);
          addPergunta(pTexto, respostas);
        });
      })
      .catch(function (err) {
        // Failed
        console.log(err);
      });
  };

  function onSave() {
    setSize(size + 1);
    console.log(perguntas);
    let texto = JSON.stringify(perguntas);
    console.log("Texto : " + texto);

    let rt = CypherUtils.encrypt(texto);
    console.log(rt);

    console.log("Decypher : " + CypherUtils.decrypt(rt));

    download(rt);
  }

  function download(output) {
    const element = document.createElement("a");
    const file = new Blob([output], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = nome + ".jr";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <PageBase titulo="Novo teste">
      <Form
        showCancelButton={false}
        onSave={onSave}
        saveLabel="Download"
        mdButtons="12"
      >
        <Container fluid>
          <Row>
            <Col md="6">
              <h5 style={{ marginTop: "10px" }}>
                Crie um novo teste a partir de um arquivo xml:
              </h5>
            </Col>
            <Col md="6">
              <div
                style={{
                  marginTop: "10px",
                  position: "relative",
                  top: "-26px",
                }}
              >
                <InputFile
                  tpRetorno="String"
                  value={xml}
                  onChange={(value) => {
                    console.log(value);
                    setXml(value);
                    carregaXML(value);
                  }}
                ></InputFile>
              </div>
            </Col>
            <Col md="12">
              <h5>
                ou crie um novo teste escrevendo suas perguntas e respostas
              </h5>
            </Col>
            <Col md="10">
              <InputText
                value={nome}
                onChange={(valor) => setNome(valor)}
                required={true}
                label="Título"
              ></InputText>
            </Col>
            <Col md="2">
              <Button
                style={{ marginTop: "26px" }}
                size="sm"
                onClick={addPergunta}
              >
                + Adicionar pergunta
              </Button>
            </Col>
          </Row>
          {escrevePerguntas()}
        </Container>
      </Form>
    </PageBase>
  );
};
