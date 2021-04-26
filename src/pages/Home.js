import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/home.css";
import * as FaIcons from "react-icons/fa";
import { Button, Accordion, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";

import img1 from "../assets/img/app-screenshots/1.png";
import img2 from "../assets/img/app-screenshots/2.png";
import img3 from "../assets/img/app-screenshots/3.png";

export default (props) => {
  const [openPlayer_1, setOpenPlayer_1] = useState(false);
  const [currentActiveKey, setCurrentActiveKey] = useState("0");

  function toggleCurrentActiveKey(number) {
    if (number === currentActiveKey) {
      setCurrentActiveKey(undefined);
    } else {
      setCurrentActiveKey(number);
    }
  }

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
                <h1>Crie seus simulados e estude pelo celular onde quiser.</h1>
                <p>
                  O App XPTO permite que voce tenha funcionalidades de simulação
                  de prova igual a uma situação real. Com contabilidade de
                  tempo, nota e histórico de tentativa.
                </p>
                <div class="home-btn">
                  <a href="#" class="btn btn-1">
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
                <div class="circle"></div>
                <img src={img1} alt="app"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Home section end */}

      {/* Features section start */}
      <section class="features section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  Funcionalidades
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
                <h3>Histórico</h3>
                <p>
                  Possui historico de tentativas. Você poderá acompanhar sua
                  evoluçao nos estudos
                </p>
              </div>
              <div class="feature-item col-md-3">
                <div class="icon">
                  <FaIcons.FaEdit />
                </div>
                <h3>Auto install</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                  ipuluim{" "}
                </p>
              </div>
              <div class="feature-item col-md-3">
                <div class="icon">
                  <FaIcons.FaPaintBrush />
                </div>
                <h3>Pixel perfect design</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                  ipuluim{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section end */}

      {/* Fun facts section section start */}
      <section class="fun-facts section-padding">
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
      </section>
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
              src="https://www.youtube.com/embed/an0_u96ac8A"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
      {/* Video popup end */}
      {/* App screenshots Section start */}

      <section class="fun-facts section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  app <span>screenshots</span>
                </h2>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="screenshots-carousel">
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
                <img src={img3} alt="app"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* App screenshots Section end */}
      {/* How it works  Section start */}
      <section class="how-it-works section-padding">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-8">
              <div class="section-title">
                <h2>
                  how it <span>works</span>
                </h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="how-it-works-item line-right">
                <div class="step">1</div>
                <h3>download</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="how-it-works-item line-right">
                <div class="step">2</div>
                <h3>create profile</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="how-it-works-item line-right">
                <div class="step">3</div>
                <h3>search product</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="how-it-works-item ">
                <div class="step">4</div>
                <h3>order</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* How it works  Section end */}
      {/* Faq  Section start */}
      <section class="faq section-padding">
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
      </section>

      {/* Faq  Section end */}
      {/* Footer  Section start */}

      <footer class="footer section-padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6">
              <div class="footer-col">
                <h3>About us</h3>
                <p>
                  Loren ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim ipuluim
                </p>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer-col">
                <h3>Company</h3>
                <ul>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">terms & condition</a>
                  </li>
                  <li>
                    <a href="#">latest blogs</a>
                  </li>
                  <li>
                    <a href="#">app services</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer-col">
                <h3>quick links</h3>
                <ul>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">terms & condition</a>
                  </li>
                  <li>
                    <a href="#">latest blogs</a>
                  </li>
                  <li>
                    <a href="#">app services</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6">
              <div class="footer-col">
                <h3>social pages</h3>
                <ul>
                  <li>
                    <a href="#">privacy policy</a>
                  </li>
                  <li>
                    <a href="#">terms & condition</a>
                  </li>
                  <li>
                    <a href="#">latest blogs</a>
                  </li>
                  <li>
                    <a href="#">app services</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12">
              <p class="copyright-text">&copy;2021 @ The XPTO</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Footer  Section end */}

      {/* Toggle theme start */}

      {/* Toggle theme end */}
    </div>
  );
};
