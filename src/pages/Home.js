/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import * as FaIcons from "react-icons/fa";
// import { Accordion, Card } from "react-bootstrap";
import Header from "../components/Header";

import img1 from "../assets/img/app-screenshots/1.png";
import img2 from "../assets/img/app-screenshots/2.png";
import img3 from "../assets/img/app-screenshots/3.png";
import img4 from "../assets/img/app-screenshots/4.png";
import img5 from "../assets/img/app-screenshots/5.png";
import img6 from "../assets/img/app-screenshots/6.png";

function Home(props) {
  const [openPlayer_1, setOpenPlayer_1] = useState(false);
  // const [currentActiveKey, setCurrentActiveKey] = useState("0");

  // function toggleCurrentActiveKey(number) {
  //   if (number === currentActiveKey) {
  //     setCurrentActiveKey(undefined);
  //   } else {
  //     setCurrentActiveKey(number);
  //   }
  // }

  return (
    <div>
      {/* Navbar start */}
      <Header />
      {/* Navbar end */}
      {/* Home section start */}
      <section class="home d-flex align-items-center">
        <div class="effect-wrap">
          <FaIcons.FaPlus className="effect effect-1" />
          <FaIcons.FaPlus className="effect effect-2" />
          <FaIcons.FaCircleNotch className="effect effect-3" />
        </div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-7 ">
              <div class="home-text">
                <h1>
                  Crie seus simulados e estude pelo celular de onde estiver.
                </h1>
                <p>
                  A plataforma JR Simulator permite que você tenha
                  funcionalidades de simulação de prova igual a uma prova de
                  certificação. Com contabilidade de tempo, nota e histórico de
                  tentativa.
                </p>
                <p style={{ marginTop: "10px" }}>
                  Indicado para certificações em TI e provas de concursos.
                </p>
                <div class="home-btn">
                  <a
                    href="https://play.google.com/store?hl=pt_BR&gl=US"
                    class="btn btn-1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FaIcons.FaGooglePlay
                      style={{ fontSize: "30px", marginRight: "10px" }}
                    />
                    download app
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setOpenPlayer_1(true);
                      console.log("XXX");
                    }}
                    class="btn btn-1 video-play-btn"
                  >
                    <FaIcons.FaPlay />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-5 text-center">
              <div class="home-img">
                {/* <div class="circle"></div> */}
                <img src={img4} alt="app"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home section end */}
      {/* Features section start */}
      <section id="features" class="features section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Principais <span>Funcionalidades</span>
                  {/* <span>features</span> */}
                </h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="features-carousel row justify-content-center">
              <div class="feature-item col-md-3">
                <div class="icon">
                  <FaIcons.FaCode />
                </div>
                <h3>Crie e edite qualquer simulado</h3>
                <p>
                  Faça e modifique seu simulado configurando perguntas e
                  respostas da forma que quiser.
                </p>
              </div>
              <div class="feature-item col-md-3">
                <div class="icon">
                  <FaIcons.FaEdit />
                </div>
                <h3>Histórico de performance</h3>
                <p>
                  Acompanhe a evolução de sua performance em cada tentativa.
                </p>
              </div>
              <div class="feature-item col-md-3">
                <div class="icon">
                  <FaIcons.FaPaintBrush />
                </div>
                <h3>Embaralhar perguntas e respostas</h3>
                <p>
                  Embaralhe perguntas e respostas para ter uma experiência mais
                  desafiadora.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features section end */}
      {/* Fun facts section section start */}
      {/* <section class="fun-facts section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-5 d-flex align-items-center justify-content-center">
              <div class="fun-facts-img">
                <img src={img2} alt="app"></img>
              </div>
            </div>
            <div class="col-lg-6 col-md-7">
              <div class="section-title">
                <h2>
                  fun <span>facts</span>{" "}
                </h2>
              </div>
              <div class="fun-facts-text">
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                  ipuluimipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                  ipuluim
                </p>
                <div class="row">
                  <div class="col-sm-6">
                    <div class="fun-facts-item style-1">
                      <h3>4000</h3>
                      <span>downloads</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="fun-facts-item style-2">
                      <h3>200</h3>
                      <span>likes</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="fun-facts-item style-3">
                      <h3>500</h3>
                      <span>5 start rating</span>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="fun-facts-item style-4">
                      <h3>150</h3>
                      <span>awards</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* Fun facts  section end */}
      {/* Video popup start */}

      <div class class={openPlayer_1 ? "video-popup open" : "video-popup"}>
        <div class="video-popup-inner">
          <div class="video-popup-close">
            <FaIcons.FaTimes
              onClick={() => {
                setOpenPlayer_1(false);
              }}
            />
          </div>
          <div class="iframe-box">
            <iframe
              id="player-1"
              src="https://www.youtube.com/embed/aBCkkWJfhY8"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      {/* Video popup end */}
      {/* App screenshots Section start */}
      <section id="telas" class="screenshots section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Telas do <span>Aplicativo</span>
                </h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="screenshot-item">
              <img src={img1} alt="app"></img>
            </div>
            <div class="screenshot-item">
              <img src={img2} alt="app"></img>
            </div>
            <div class="screenshot-item">
              <img src={img3} alt="app"></img>
            </div>
            <div class="screenshot-item">
              <img src={img4} alt="app"></img>
            </div>
            <div class="screenshot-item">
              <img src={img5} alt="app"></img>
            </div>
            <div class="screenshot-item">
              <img src={img6} alt="app"></img>
            </div>
          </div>
        </div>
      </section>
      {/* App screenshots Section end */}
      {/* How it works  Section start */}
      <section id="howitworks" class="how-it-works section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Como <span>começar</span> ?
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6">
              <div class="how-it-works-item line-right">
                <div class="step">1</div>
                <h3>Crie o simulado</h3>
                <p>
                  Clique <a href="/examBuilder">aqui</a> e defina suas perguntas
                  e respostas.
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="how-it-works-item line-right">
                <div class="step">2</div>
                <h3>Baixe o arquivo ".jr"</h3>
                <p>
                  Após terminar de criar o simulado, clique em Download para
                  baixar o arquivo ".jr"
                </p>
              </div>
            </div>
            <div class="col-lg-4 col-md-6">
              <div class="how-it-works-item">
                <div class="step">3</div>
                <h3>Importe o arquivo no app</h3>
                <p>Importe o arquivo ".jr" no app e de o play.</p>
              </div>
            </div>
            {/* <div class="col-lg-3 col-md-6">
              <div class="how-it-works-item ">
                <div class="step">4</div>
                <h3>order</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {/* How it works  Section end */}
      {/* Faq  Section start */}
      {/* <section class="faq section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  frequently <span>asked</span> queries
                </h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-lg-10">
              <Accordion defaultActiveKey="0">
                <Card>
                  <Card.Header
                    className={currentActiveKey === "0" ? "active" : null}
                    onClick={() => {
                      toggleCurrentActiveKey("0");
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey="0"
                    >
                      Click me!
                      {currentActiveKey === "0" ? (
                        <FaIcons.FaMinus className="icon-minus" />
                      ) : (
                        <FaIcons.FaPlus className="icon-plus" />
                      )}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body>Hello! I'm the body</Card.Body>
                  </Accordion.Collapse>
                </Card>
                <Card>
                  <Card.Header
                    className={currentActiveKey === "1" ? "active" : null}
                    onClick={() => {
                      toggleCurrentActiveKey("1");
                    }}
                  >
                    <Accordion.Toggle
                      as={Card.Header}
                      variant="link"
                      eventKey="1"
                    >
                      Click me!
                      {currentActiveKey === "1" ? (
                        <FaIcons.FaMinus className="icon-minus" />
                      ) : (
                        <FaIcons.FaPlus className="icon-plus" />
                      )}
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="1">
                    <Card.Body>Hello! I'm another body</Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </div>
          </div>
        </div>
      </section> */}
      {/* Faq  Section end */}
      {/* Footer  Section start */}
      <footer class="footer section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-12 social">
              <a
                href="https://www.facebook.com/JR-Simulator-105038411741180"
                rel="noreferrer"
                target="_blank"
              >
                <FaIcons.FaFacebook />
              </a>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <p class="copyright-text">&copy;2021 @ JR Simulator</p>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer  Section end */}
      {/* Toggle theme start */}
      {/* Toggle theme end */}
    </div>
  );
}
export default Home;
