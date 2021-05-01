import React, { useState, useEffect } from "react";

import Forms from "../components/communs/Forms";
import { Col, Container, Row, Button } from "react-bootstrap";
import InputText from "../components/communs/input/InputText";
import { Base64 } from "../base/utils/Base64";

import Pergunta from "../components/Pergunta";
import Resposta from "../components/Resposta";

import Header from "../components/Header";
import * as cypherUtils from "../base/utils/cypherUtils";
import * as FaIcons from "react-icons/fa";

// import xml2js from "xml2js";

function ExamBuilder(props) {
  const [nome, setNome] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [size, setSize] = useState(0);
  const [countSizeQuestions, setCountSizeQuestions] = useState(0);

  const auxPerguntas = [...perguntas];

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [countSizeQuestions]);

  function addPergunta(
    texto = "",
    respostas = [{ text: "", correct: false, marked: false }],
    multiple = false
  ) {
    let questions = perguntas;

    questions.push({
      multiple: multiple,
      question: texto,
      answers: respostas,
    });

    setPerguntas(questions);
    setSize(perguntas.length);
    setCountSizeQuestions(countSizeQuestions + 1);
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
    questions[perguntaIndex].answers.push({
      text: "",
      correct: false,
      marked: false,
    });
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
      return (resposta.correct = false);
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
          multiplaEscolha={auxPerguntas[index].multiple}
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
            correct={resposta.correct}
            texto={resposta.text}
            onTextoChange={(valor) => (resposta.text = valor)}
            multipla={auxPerguntas[index].multiple}
            removeResposta={() => {
              removeResposta(index, i);
            }}
            onOpcaoRespostaChange={(valor) => {
              if (auxPerguntas[index].multiple) {
                // resetRespostas(index);
                resposta.correct = valor;
                setSize(size + 1);
              } else {
                resetRespostas(index);
                resposta.correct = true;
                setSize(size + 1);
              }
            }}
          ></Resposta>
        ))}
        <Col md="12">
          <div className="btn-add-resposta" onClick={() => {
                addResposta(index);
              }}>
              <FaIcons.FaPlus ></FaIcons.FaPlus>
          </div>
        </Col>
      </Row>
    ));
  };

  // const carregaXML = (xml) => {
  //   let parser = new xml2js.Parser();

  //   // let cleanedString = value.replace("\ufeff", "");

  //   parser
  //     .parseStringPromise(xml)
  //     .then(function (result) {
  //       console.log(result);

  //       setNome(result.Test.$.title);
  //       result.Test.Questions[0].Question.map((pergunta, i) => {
  //         //console.log(pergunta);
  //         let pTexto = pergunta.$.text;
  //         let respostas = [];
  //         let contCorrect = 0;
  //         pergunta.Answers[0].Answer.map((resposta, i2) => {
  //           console.log(resposta.$.correct);

  //           if (resposta.$.correct === "true") {
  //             contCorrect = contCorrect + 1;
  //           }

  //           respostas.push({
  //             text: resposta.$.text,
  //             correct: resposta.$.correct === "true",
  //           });
  //         });
  //         console.log(contCorrect);
  //         addPergunta(pTexto, respostas, contCorrect > 1 ? true : false);
  //       });
  //     })
  //     .catch(function (err) {
  //       // Failed
  //       console.log(err);
  //     });
  // };

  function onSave() {
    setSize(size + 1);
    let finalContent = { title: nome, questions: perguntas };
    // console.log("Final content");
    // console.log(finalContent);

    let texto = JSON.stringify(finalContent);
    // console.log("Texto : " + texto);

    let rt = Base64.btoa(texto);
    // console.log(rt);
    // let final = Base64.atob(rt);
    let encrypted = cypherUtils.encrypt(rt);
    // console.log("final: " + encrypted);

    download(encrypted);
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
    <>
      <Header />
      <section class="exam-builder section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Criação de <span>simulador</span>
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="exam-builder-form">
              <Forms
                showSaveButton={perguntas.length > 0}
                showCancelButton={false}
                onSave={onSave}
                saveLabel="Download '.jr'"
                mdButtons="12"
              >
                <Container fluid>
                  <Row>
                    <Col md="12">
                      <p>
                        Adicione perguntas e suas possíveis respostas. Quando
                        acabar, clique no botão download para baixar o simulado.
                      </p>
                      <p>
                        Pronto, agora é só carregar o simulado no app JR
                        Simulator e começar a estudar.
                      </p>
                    </Col>
                    {/* <Col md="6">
                      <p style={{ marginTop: "10px" }}>
                        Crie um novo teste a partir de um arquivo xml:
                      </p>
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
                    </Col> */}

                    <Col md="12">
                      <div class="separator"></div>
                    </Col>

                    <Col md="12">
                      <InputText
                        value={nome}
                        onChange={(valor) => setNome(valor)}
                        required={true}
                        label="Título do simulado"
                      ></InputText>
                    </Col>
                  </Row>
                  {escrevePerguntas()}
                </Container>
              </Forms>
            </div>
          </div>
        </div>
        <div class="map-questions" style={{ display: "flex" }}>
          <div class="q">
            Questões: &nbsp;
            {perguntas.map((per, index) => {
              return (
                <>
                  <a href={"#Q" + (index + 1)}>{index + 1}</a>
                  <div
                    style={{
                      color: "#ffffff",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    {" - "}
                  </div>
                </>
              );
            })}
          </div>

          <Button
            style={{ marginRight: "20px" }}
            size="sm"
            onClick={() => {
              addPergunta();
            }}
          >
            + Pergunta
          </Button>
        </div>
      </section>
    </>
  );
}
export default ExamBuilder;
