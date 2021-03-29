import React, { useState, useEffect } from "react";
import PageBase from "../pages/PageBase";
import Form from "../components/communs/Form";
import { Col, Container, Row, Modal, Button, Image } from "react-bootstrap";
import InputText from "../components/communs/input/InputText";

export default (props) => {
  const [nome, setNome] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [size, setSize] = useState(0);

  const auxPerguntas = [...perguntas];

  function addPergunta() {
    let questions = perguntas;

    questions.push({ question: "aaa", answers: [] });

    setPerguntas(questions);
    setSize(perguntas.length);
  }

  function addResposta(perguntaIndex) {
    console.log(perguntaIndex);

    let questions = perguntas;
    questions[perguntaIndex].answers.push({});
    console.log(questions[perguntaIndex].answers.length);

    setPerguntas(questions);
    setSize(size + 1);
  }

  const escrevePerguntas = () => {
    return auxPerguntas.map((pergunta, index) => (
      <>
        <Col md="12">
          <div>Pergunta {index + 1}</div>
          <InputText
            value={auxPerguntas[index].question}
            onChange={(valor) => (auxPerguntas[index].question = valor)}
            required={false}
            label=" "
          ></InputText>
        </Col>
        <Col md="1">
          <Button
            onClick={() => {
              addResposta(index);
            }}
          >
            +
          </Button>
        </Col>
        <Col md="12">
          <div>Respostas</div>
          {pergunta.answers.map((resposta, i) => (
            <div>resposta {i}</div>
          ))}
        </Col>
      </>
    ));
  };

  function onSave() {}
  return (
    <PageBase titulo="Novo teste">
      <div>
        <Form showCancelButton={false} onSave={onSave}>
          <Container>
            <Row>
              <Col md="12">
                <h5>Crie um novo teste</h5>
              </Col>
              <Col md="12">
                <InputText
                  value={nome}
                  onChange={(valor) => setNome(valor)}
                  required={false}
                  label="Título"
                ></InputText>
              </Col>
              <Col md="11">
                <h5>
                  Adicione perguntas e informe a(s) resposta(s) correta(s)
                </h5>
              </Col>
              <Col md="1">
                <Button onClick={addPergunta}>+</Button>
              </Col>
              {escrevePerguntas()}
            </Row>
          </Container>
        </Form>
      </div>
    </PageBase>
  );
};
