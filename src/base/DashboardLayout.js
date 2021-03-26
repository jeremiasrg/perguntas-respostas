import React, { useEffect, useState } from "react";
import DashboardLayout from "./DashboardLayout.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { useHistory } from "react-router-dom";
// import Avatar from "../components/Avatar";
// import Notificacoes from "../components/Notificacoes";
// import Ofertar from "../components/Ofertar";
// import * as TokenUtils from "./utils/tokenUtils";

export default (props) => {
  const history = useHistory();

  const [sidebar, setSidebar] = useState();

  useEffect(() => {
    // checkToken();

    let s = localStorage.getItem("sidebar");
    console.log("recuperei :" + !s);

    if (s !== undefined) {
      setSidebar(s === "true");
    } else {
      setSidebar(true);
    }
  }, []);

  const showSidebar = () => {
    localStorage.setItem("sidebar", !sidebar);
    console.log("Atualizando para: " + !sidebar);

    setSidebar(!sidebar);
  };

  // function checkToken() {
  //   let token = TokenUtils.getAppToken();

  //   if (token === undefined || token === null) {
  //     history.push("/");
  //   }
  // }
  return (
    <>
      {props.titulo !== undefined ? (
        <>
          <input type="checkbox" checked={!sidebar} id="sidebar-toggle" />
          <div class="sidebar">
            <div class="sidebar-header">
              <h3 class="brand">
                <FaIcons.FaBrain className="brand-icon"></FaIcons.FaBrain>
                <span className="brand-text">Study</span>
              </h3>
              <label className="sidebar-toggle" for="sidebar-toggle">
                <AiIcons.AiOutlineMenu
                  onClick={showSidebar}
                ></AiIcons.AiOutlineMenu>
              </label>
            </div>
            <div class="sidebar-menu">
              <ul>
                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/home" ? "active" : ""
                    }
                    to="/home"
                  >
                    <div className="menu-title">Início</div>
                    <FiIcons.FiHome />
                    <span>Início</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/dashboard" ? "active" : ""
                    }
                    to="/dashboard"
                  >
                    <div className="menu-title">Dashboard</div>
                    <FiIcons.FiActivity />
                    <span>Dashboard</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/membros" ? "active" : ""
                    }
                    to="/membros"
                  >
                    <div className="menu-title">Membros</div>
                    <RiIcons.RiUserStarLine />
                    <span>Membros</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/publicacao" ? "active" : ""
                    }
                    to="/publicacao"
                  >
                    <div className="menu-title">Publicação</div>
                    <FiIcons.FiSend />
                    <span>Publicação</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/gestao" ? "active" : ""
                    }
                    to="/gestao"
                  >
                    <div className="menu-title">Gestão</div>
                    <FiIcons.FiFolderMinus />
                    <span>Gestão</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/financas" ? "active" : ""
                    }
                    to="/financas"
                  >
                    <div className="menu-title">Finanças</div>
                    <RiIcons.RiCoinsLine />
                    <span>Finanças</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/contasDigitais"
                        ? "active"
                        : ""
                    }
                    to="/contasDigitais"
                  >
                    <div className="menu-title">Contas Digitais</div>
                    <BiIcons.BiCreditCard />
                    <span>Contas Digitais</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/relatorios" ? "active" : ""
                    }
                    to="/relatorios"
                  >
                    <div className="menu-title">Relatórios</div>
                    <FiIcons.FiPieChart />
                    <span>Relatórios</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/agenda" ? "active" : ""
                    }
                    to="/agenda"
                  >
                    <div className="menu-title">Agenda</div>
                    <FiIcons.FiCalendar />
                    <span>Agenda</span>
                  </Link>
                </li>

                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/harpa" ? "active" : ""
                    }
                    to="/harpa"
                  >
                    <FiIcons.FiMusic />
                    <div className="menu-title">Harpa Cristã</div>
                    <span>Harpa Cristã</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/biblia" ? "active" : ""
                    }
                    to="/biblia"
                  >
                    <div className="menu-title">Bíblia Sagrada</div>
                    <BiIcons.BiBible />
                    <span>Bíblia Sagrada</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link
                    className={
                      window.location.pathname === "/configuracoes"
                        ? "active"
                        : ""
                    }
                    to="/configuracoes"
                  >
                    <div className="menu-title">Configurações</div>
                    <FiIcons.FiSettings />
                    <span>Configurações</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div
              className={
                sidebar
                  ? "espaco-fixo-usuario-logado"
                  : "espaco-fixo-usuario-logado retraido"
              }
            >
              {/* <Avatar
                foto={TokenUtils.getFotoUsuarioLogado()}
                name={TokenUtils.getNameUserFromAppToken()}
                subText={TokenUtils.getFuncaoUserFromAppToken()}
              /> */}
            </div>
          </div>

          <div class="main-content">
            <header>
              <div className="espaco-fixo-associacao">
                <div className="badge-associacao">
                  <BiIcons.BiChurch className="icon" />
                  <div className="texto">
                    {/* {TokenUtils.getNameAssociacaoFromAppToken()} */}
                  </div>
                  <div className="sub_texto" style={{ display: "none" }}>
                    Matriz- Rua das laranjeiras 124. SP
                  </div>
                </div>
              </div>

              <div className="espaco-fixo-menu-superior">
                {/* <Notificacoes></Notificacoes> */}

                {/* <Ofertar /> */}
                <Link to="/configuracoes" className="menu-bars">
                  <FiIcons.FiSettings />
                </Link>
                <Link
                  to="#"
                  className="menu-bars"
                  onClick={() => {
                    // TokenUtils.destroyAppToken();
                    // history.push("/");
                  }}
                >
                  <FiIcons.FiLogOut />
                </Link>
              </div>
            </header>

            <main>
              <h2 class="page-title">{props.titulo}</h2>
              {props.children}
            </main>
          </div>
        </>
      ) : null}

      {props.titulo === undefined ? <>{props.children}</> : null}
    </>
  );
};
