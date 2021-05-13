import React, { useState, useEffect } from "react";
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
  const [questions, setQuestions] = useState([]);
  const [verifyQuestions, setVerifyQuestions] = useState([]);
  const [minutes, setMinutes] = useState(90);
  const [title, setTitle] = useState();
  const [showExam, setShowExam] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const [index, setIndex] = useState(0);
  const [counter, setCounter] = useState(0);

  const auxVerifyQuestions = [...verifyQuestions];
  const auxQuestions = [...questions];

  useEffect(() => {
    createStructureVerifyQuestions();
  }, [title]);

  const carregaJR = (jr) => {
    let rt = cypherUtils.decrypt(jr);
    let string = Base64.atob(rt);
    let json = JSON.parse(string);
    console.log(json);
    setQuestions(json.questions);
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

  function onChangeAnswer(indexQuestion, indexAnswer) {
    console.log("indexQuestion: " + indexQuestion);
    console.log("indexAnswer: " + indexAnswer);
    let r = questions[indexQuestion].answers[indexAnswer].marked;
    if (auxQuestions[indexQuestion].multiple === false) {
      resetAnswers(indexQuestion);
    }
    auxQuestions[indexQuestion].answers[indexAnswer].marked = !r;
    setCounter(counter + 1);
  }

  function resetAnswers(indexQuestion) {
    for (let x in auxQuestions[indexQuestion].answers) {
      auxQuestions[indexQuestion].answers[x].marked = false;
    }
    setQuestions(auxQuestions);
  }

  function createStructureVerifyQuestions() {
    console.log("CALL createStructureVerifyQuestions");

    if (index === 0 && verifyQuestions.length === 0) {
      // console.log("PASSOU DO IF createStructureVerifyQuestions");
      let arr = [];
      for (let q in questions) {
        // console.log("****************Criando Estrutura");
        let numQ = parseInt(q) + 1;
        arr.push({ question: numQ, correct: false });
      }
      setVerifyQuestions(arr);

      // console.log("Strutura criada");
      // console.log(verifyQuestions);
    }
  }

  function checkQuestionsIsCorrect(indexQuestion) {
    let correct = true;
    let index;
    index = indexQuestion;

    let quantMarked = 0;
    let quantCorrect = 0;
    for (let x in auxQuestions[index].answers) {
      let ans = auxQuestions[index].answers[x];

      // console.log("Correct: " + ans.correct);
      // console.log("Marked: " + ans.marked);
      if (auxQuestions[index].multiple) {
        if (ans.correct === false && ans.marked === true) {
          correct = false;
        }
        if (ans.correct === true) {
          quantCorrect = quantCorrect + 1;
        }
        if (ans.marked === true) {
          quantMarked = quantMarked + 1;
        }
      } else {
        if (ans.correct === true && ans.marked === false) {
          correct = false;
        }
      }
    }
    if (auxQuestions[index].multiple && quantCorrect !== quantMarked) {
      correct = false;
    }

    if (auxVerifyQuestions.length > 0) {
      auxVerifyQuestions[index].correct = correct;
      setVerifyQuestions(auxVerifyQuestions);
      console.log(auxVerifyQuestions);
    }
  }

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
                {showResult && (
                  <>
                    <Col md="12">
                      <h3>Teste finalizado com sucesso</h3>
                    </Col>
                    <Col md="12">
                      <div class="result">
                        {auxVerifyQuestions.map((q, i) => {
                          return (
                            <div class={q.correct ? "correct" : "incorrect"}>
                              {q.question}
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </>
                )}
                <Col md="12">
                  {showResult === false && <Timer minutes={minutes} />}
                </Col>
                <Col md="12">
                  <p>{auxQuestions[index].question}</p>
                </Col>
                {auxQuestions[index].answers.map((ans, i) => {
                  return (
                    <Col md="12">
                      {/*  */}
                      {auxQuestions[index].multiple ? (
                        <div
                          style={
                            ans.correct && showAnswer
                              ? {
                                  borderWidth: "2px",
                                  borderColor: "green",
                                  borderStyle: "solid",
                                }
                              : null
                          }
                        >
                          <CheckBox
                            onChange={(e) => {
                              onChangeAnswer(index, i);
                            }}
                            value={ans.marked}
                            label={ans.text}
                          ></CheckBox>
                        </div>
                      ) : (
                        <div
                          style={
                            ans.correct && showAnswer
                              ? {
                                  borderWidth: "2px",
                                  borderColor: "green",
                                  borderStyle: "solid",
                                }
                              : null
                          }
                        >
                          <RadioButton
                            onChange={(e) => {
                              onChangeAnswer(index, i);
                            }}
                            value={ans.marked}
                            label={ans.text}
                          ></RadioButton>
                        </div>
                      )}
                    </Col>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {showExam === true && (
          <div class="btn-bar-container">
            <Button
              onClick={() => {
                checkQuestionsIsCorrect(index);
                index > 0 && setIndex(index - 1);
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={() => {
                setShowAnswer(!showAnswer);
              }}
            >
              {showAnswer ? "Esconder resposta" : "Mostrar resposta"}
            </Button>
            {questions.length === index + 1 && showResult === false ? (
              <Button
                onClick={() => {
                  checkQuestionsIsCorrect(index);
                  setShowResult(true);
                }}
              >
                Finalizar
              </Button>
            ) : (
              <Button
                onClick={() => {
                  checkQuestionsIsCorrect(index);
                  index + 1 !== questions.length && setIndex(index + 1);
                }}
              >
                Próximo
              </Button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
export default RunExam;
