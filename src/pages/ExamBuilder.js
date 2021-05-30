import React, { useState, useEffect } from "react";

import Forms from "../components/communs/Forms";
import {
  Col,
  Container,
  Row,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import InputText from "../components/communs/input/InputText";
import InputFile from "../components/communs/input/InputFile";
import { Base64 } from "../base/utils/Base64";

import Pergunta from "../components/Pergunta";
import Resposta from "../components/Resposta";

import Header from "../components/Header";
import SampleQuestions from "../assets/sampleQuestions.xml";
import * as cypherUtils from "../base/utils/cypherUtils";
import * as FaIcons from "react-icons/fa";

import { i18n } from "../translate/i18n";

import xml2js from "xml2js";

function ExamBuilder(props) {
  const [nome, setNome] = useState();
  const [perguntas, setPerguntas] = useState([]);
  const [size, setSize] = useState(0);
  const [countSizeQuestions, setCountSizeQuestions] = useState(0);
  const [arquivo, setArquivo] = useState();

  const auxPerguntas = [...perguntas];

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [countSizeQuestions]);

  function addPergunta(
    texto = "",
    img = "",
    respostas = [
      { text: "", correct: false, marked: false },
      { text: "", correct: false, marked: false },
      { text: "", correct: false, marked: false },
    ],
    multiple = false
  ) {
    let questions = perguntas;

    let arraySize = questions.length;

    if (arraySize > 0) {
      let countCorrect = 0;
      questions[arraySize - 1].answers.map((ans, index) => {
        // console.log(ans);

        if (ans.correct === true) {
          countCorrect = countCorrect + 1;
        }
        return true;
      });
      if (countCorrect === 0) {
        alert(i18n.t("messages.builder11"));
      } else {
        questions.push({
          multiple: multiple,
          question: texto,
          img: img,
          answers: respostas,
        });

        setPerguntas(questions);
        setSize(perguntas.length);
        setCountSizeQuestions(countSizeQuestions + 1);
      }
    } else {
      questions.push({
        multiple: multiple,
        question: texto,
        img: img,
        answers: respostas,
      });

      setPerguntas(questions);
      setSize(perguntas.length);
      setCountSizeQuestions(countSizeQuestions + 1);
    }
  }

  function removePergunta(index) {
    // console.log("Remove pergunta: " + index);

    let questions = perguntas;

    questions.splice(index, 1);

    setPerguntas(questions);
    setSize(perguntas.length);
  }

  function addResposta(perguntaIndex) {
    // console.log(perguntaIndex);

    let questions = perguntas;
    questions[perguntaIndex].answers.push({
      text: "",
      correct: false,
      marked: false,
    });
    // console.log(questions[perguntaIndex].answers.length);

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
    // console.log("Perguntas resetadas");
    // console.log(auxPerguntas);
  }

  const escrevePerguntas = () => {
    return auxPerguntas.map((pergunta, index) => (
      <Row>
        <Pergunta
          texto={auxPerguntas[index].question}
          img={auxPerguntas[index].img}
          index={index}
          multiplaEscolha={auxPerguntas[index].multiple}
          onTextoChange={(valor) => (auxPerguntas[index].question = valor)}
          onImgChange={(valor) => (auxPerguntas[index].img = valor)}
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
          <div
            className="btn-add-resposta"
            onClick={() => {
              addResposta(index);
            }}
          >
            <FaIcons.FaPlus></FaIcons.FaPlus>
          </div>
        </Col>
      </Row>
    ));
  };

  const carregaJR = (jr) => {
    let rt = cypherUtils.decrypt(jr);
    let string = Base64.atob(rt);
    // console.log(string);
    let json = JSON.parse(string);
    // console.log(json);
    setNome(json.title);
    json.questions.map((question, i) => {
      let pTexto = question.question;
      let pImg = question.img;
      let contCorrect = 0;
      let respostas = [];
      // console.log(question.question);
      // console.log(question.multiple);
      question.answers.map((answer, i) => {
        if (answer.correct === true) {
          contCorrect = contCorrect + 1;
        }
        // console.log(answer.correct);

        respostas.push({
          text: answer.text,
          correct: answer.correct === true,
          marked: false,
        });
        return true;
      });
      addPergunta(pTexto, pImg, respostas, contCorrect > 1 ? true : false);
      return true;
    });
  };

  const carregaXML = (xml) => {
    let parser = new xml2js.Parser();

    // let cleanedString = value.replace("\ufeff", "");

    parser
      .parseStringPromise(xml)
      .then(function (result) {
        // console.log(result);

        setNome(result.Test.$.title);
        result.Test.Questions[0].Question.map((pergunta, i) => {
          //console.log(pergunta);
          let pTexto = pergunta.$.text;
          let pImg = pergunta.$.img;
          let respostas = [];
          let contCorrect = 0;
          pergunta.Answers[0].Answer.map((resposta, i2) => {
            // console.log(resposta.$.correct);

            if (resposta.$.correct === "true") {
              contCorrect = contCorrect + 1;
            }

            respostas.push({
              text: resposta.$.text,
              correct: resposta.$.correct === "true",
              marked: false,
            });
            return true;
          });
          // console.log(contCorrect);
          addPergunta(pTexto, pImg, respostas, contCorrect > 1 ? true : false);
          return true;
        });
      })
      .catch(function (err) {
        // Failed
        // console.log(err);
      });
  };

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
    const file = new Blob([output], { type: "image/jr;charset=utf-8" });
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
                  {i18n.t("titles.creation")}{" "}
                  <span>{i18n.t("titles.exam")}</span>
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
                saveLabel={i18n.t("buttons.downloadJr")}
                mdButtons="12"
              >
                <Container fluid>
                  <Row>
                    {window.location.href.includes("examBuilder?v") ===
                    false ? (
                      <Col md="12">
                        <p>{i18n.t("messages.builder1")}</p>
                        <p>{i18n.t("messages.builder2")}</p>
                      </Col>
                    ) : null}
                    {window.location.href.includes("examBuilder?v1") ? (
                      <>
                        <Col md="12">
                          <p>{i18n.t("messages.builder3")}</p>
                          <p>
                            {i18n.t("messages.builder4")}{" "}
                            <a
                              class="link-white"
                              target="_blank"
                              rel="noreferrer"
                              href={SampleQuestions}
                            >
                              {i18n.t("messages.here")}
                            </a>{" "}
                            {i18n.t("messages.builder5")}
                          </p>
                          <p>{i18n.t("messages.builder6")}</p>
                        </Col>
                        <Col md="12">
                          <p style={{ marginTop: "10px" }}>
                            {i18n.t("messages.builder7")}
                          </p>
                        </Col>
                        <Col md="12">
                          <div
                            style={{
                              marginTop: "10px",
                              position: "relative",
                              top: "-26px",
                            }}
                          >
                            <InputFile
                              tpRetorno="String"
                              value={arquivo}
                              onChange={(value) => {
                                // console.log(value);
                                setArquivo(value);
                                carregaXML(value);
                              }}
                            ></InputFile>
                          </div>
                        </Col>
                      </>
                    ) : null}
                    {window.location.href.includes("examBuilder?v2") ? (
                      <>
                        <Col md="12">
                          <p>{i18n.t("messages.builder8")}</p>
                          <p>{i18n.t("messages.builder9")}</p>
                          <p>{i18n.t("messages.builder10")}</p>
                        </Col>
                        <Col md="12">
                          <div
                            style={{
                              marginTop: "10px",
                              position: "relative",
                              top: "-26px",
                            }}
                          >
                            <InputFile
                              tpRetorno="String"
                              value={arquivo}
                              onChange={(value) => {
                                // console.log(value);
                                setArquivo(value);
                                carregaJR(value);
                              }}
                            ></InputFile>
                          </div>
                        </Col>
                      </>
                    ) : null}

                    <Col md="10"></Col>
                    <Col md="2">
                      <DropdownButton
                        style={{ marginBottom: "20px" }}
                        id="dropdown-basic-button"
                        title={i18n.t("buttons.options")}
                      >
                        <Dropdown.Item href="/examBuilder">
                          {i18n.t("messages.makeManual")}
                        </Dropdown.Item>
                        <Dropdown.Item href="/examBuilder?v1">
                          {i18n.t("messages.makebyXML")}
                        </Dropdown.Item>
                        <Dropdown.Item href="/examBuilder?v2">
                          {i18n.t("messages.editJR")}
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>

                    <Col md="12">
                      <div class="separator"></div>
                    </Col>

                    <Col md="12">
                      <InputText
                        value={nome}
                        onChange={(valor) => setNome(valor)}
                        required={true}
                        label={i18n.t("messages.examTitle")}
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
            {i18n.t("messages.questions")} &nbsp;
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
            {i18n.t("buttons.addQuestion")}
          </Button>
        </div>
      </section>
    </>
  );
}
export default ExamBuilder;
