import React, { useState } from "react";
import Header from "../components/Header";
import { Col, Button } from "react-bootstrap";
import InputFile from "../components/communs/input/InputFile";
import InputText from "../components/communs/input/InputText";
import { Base64 } from "../base/utils/Base64";
import Timer from "../components/Timer";
import CheckBox from "../components/communs/input/CheckBox";
import RadioButton from "../components/communs/input/RadioButton";
import * as cypherUtils from "../base/utils/cypherUtils";

function RunExam(props) {
  const [arquivo, setArquivo] = useState();
  const [minutes, setMinutes] = useState(90);
  const [title, setTitle] = useState();
  const [showExam, setShowExam] = useState(false);

  const [index, setIndex] = useState(0);

  const carregaJR = (jr) => {
    let rt = cypherUtils.decrypt(jr);
    let string = Base64.atob(rt);
    let json = JSON.parse(string);
    console.log(json);
    setArquivo(json);
    setTitle(json.title);
  };

  const start = () => {
    if (title === undefined) {
      setShowExam(false);
      alert("Arquivo desconhecido");
    } else {
      setShowExam(true);
    }
  };

  return (
    <div>
      <Header />
      <section class="config-exam section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Config <span>Exam</span>
                </h2>
              </div>
            </div>
          </div>
          <div class="run-exam">
            {showExam === false ? (
              <div class="row">
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
                        console.log(value);

                        carregaJR(value);
                      }}
                    ></InputFile>
                  </div>
                </Col>
                <Col md="12">
                  <div
                    style={{
                      marginTop: "10px",
                      position: "relative",
                      top: "-26px",
                    }}
                  >
                    <InputText
                      required="true"
                      label="Minutos para realizar o teste"
                      value={minutes}
                      onChange={(value) => {
                        setMinutes(value);
                      }}
                    ></InputText>
                  </div>
                </Col>
                <Col md="12">
                  <Button
                    onClick={() => {
                      start();
                    }}
                  >
                    Começar
                  </Button>
                </Col>
              </div>
            ) : (
              <div class="row">
                <Col md="12">
                  <div class="exam-title">
                    <h3>{title}</h3>
                  </div>
                </Col>
                <Col md="12">
                  <Timer minutes={minutes} />
                </Col>
                <Col md="12">
                  <p>{arquivo.questions[index].question}</p>
                </Col>
                {arquivo.questions[index].answers.map((q, i) => {
                  return (
                    <Col md="12">
                      {/*  */}
                      {arquivo.questions[index].multiple ? (
                        <CheckBox
                          label={q.text}
                          style={{ position: "relative" }}
                        ></CheckBox>
                      ) : (
                        <RadioButton
                          label={q.text}
                          style={{ position: "relative" }}
                        ></RadioButton>
                      )}
                    </Col>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div class="btn-bar-container">
          <Button
            onClick={() => {
              index > 0 && setIndex(index - 1);
            }}
          >
            Voltar
          </Button>
          <Button
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            Próximo
          </Button>
        </div>
      </section>
    </div>
  );
}
export default RunExam;
