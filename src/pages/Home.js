import React, { useState, useEffect } from "react";
import PageBase from "../pages/PageBase";
import Form from "../components/communs/Form";
import { Col, Container, Row, Modal, Button, Image } from "react-bootstrap";
import InputText from "../components/communs/input/InputText";
import CheckBox from "../components/communs/input/CheckBox";
import RadioButton from "../components/communs/input/RadioButton";
import TextArea from "../components/communs/input/TextArea";
import * as StringUtils from "../base/utils/stringUtils";

export default (props) => {
  const [nome, setNome] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [size, setSize] = useState(0);

  const auxPerguntas = [...perguntas];

  function addPergunta() {
    let questions = perguntas;

    let guid = StringUtils.generateGuid();

    questions.push({
      id: guid,
      multiple: false,
      question: "",
      answers: [{ text: "", check: false }],
    });

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

  function resetRespostas(i) {
    auxPerguntas[i].answers.map((resposta, index) => {
      resposta.check = false;
    });
  }

  const escrevePerguntas = () => {
    return auxPerguntas.map((pergunta, index) => (
      <Row>
        <Col md="12">
          <div className="pergunta">
            <Col md="auto">
              <div className="numero"> {index + 1 + " - "} </div>
            </Col>
            <TextArea
              md="10"
              value={auxPerguntas[index].question}
              onChange={(valor) => (auxPerguntas[index].question = valor)}
              required={false}
              label=" "
            ></TextArea>
            <div style={{ marginTop: "41px" }}>
              <CheckBox
                md="auto"
                label="Multipla escolha ?"
                value={auxPerguntas[index].multiple}
                onChange={(valor) => {
                  auxPerguntas[index].multiple = valor;
                  // setPerguntas(auxPerguntas);
                  resetRespostas(index);
                  setSize(size + 1);
                }}
              ></CheckBox>
            </div>
          </div>
        </Col>

        {pergunta.answers.map((resposta, i) => (
          <>
            <Col md="12">
              <div className="resposta">
                <div className="letra">
                  {StringUtils.converteNumeroEmLetra(i + 1) + ")"}

                  {auxPerguntas[index].multiple ? (
                    <CheckBox
                      md="auto"
                      value={resposta.check}
                      onChange={(valor) => (resposta.check = valor)}
                    ></CheckBox>
                  ) : (
                    <RadioButton
                      md="auto"
                      // name={auxPerguntas[index].id}
                      value={resposta.check}
                      onChange={(valor) => {
                        resetRespostas(index);
                        resposta.check = true;
                        setSize(size + 1);
                      }}
                    ></RadioButton>
                  )}
                </div>
                <TextArea
                  md="10"
                  value={resposta.text}
                  onChange={(valor) => (resposta.text = valor)}
                  required={false}
                  label=" "
                ></TextArea>
              </div>
            </Col>
          </>
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

  function onSave() {
    setSize(size + 1);
    console.log(perguntas);
  }
  return (
    <PageBase titulo="Novo teste">
      <Form showCancelButton={false} onSave={onSave}>
        <Container fluid>
          <Row>
            <Col md="12">
              <h5>Crie um novo teste</h5>
            </Col>
            <Col md="10">
              <InputText
                value={nome}
                onChange={(valor) => setNome(valor)}
                required={false}
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
            <Col md="12">
              <div style={{ marginTop: "15px" }}>
                <h5>
                  Adicione perguntas e informe a(s) resposta(s) correta(s)
                </h5>
              </div>
            </Col>
          </Row>
          {escrevePerguntas()}
        </Container>
      </Form>
    </PageBase>
  );
};
