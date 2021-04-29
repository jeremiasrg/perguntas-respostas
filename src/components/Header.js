import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

function Header(props) {
  const [navbarShrink, setNavbarShrink] = useState(false);
  const [navbarShowLinks, setNavbarShowLinks] = useState(false);

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.documentElement.scrollTop > 90) {
      setNavbarShrink(true);
      console.log("true");
    } else {
      setNavbarShrink(false);
      console.log("false");
    }
  }

  return (
    <nav
      class={
        navbarShrink
          ? "navbar navbar-shrink navbar-expand-lg fixed-top"
          : "navbar  navbar-expand-lg fixed-top"
      }
    >
      <div class="container">
        {/* <!-- Brand --> */}
        <a class="navbar-brand" href="/">
          JR Simulator
        </a>

        {/* <!-- Toggler/collapsibe Button --> */}
        <button
          onClick={() => {
            setNavbarShowLinks(!navbarShowLinks);
          }}
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <FaIcons.FaBars />
        </button>

        {/* <!-- Navbar links --> */}
        <div
          class={
            navbarShowLinks
              ? "collapse navbar-collapse show"
              : "collapse navbar-collapse"
          }
          id="collapsibleNavbar"
        >
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="/">
                Início
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#features">
                Funcionalidades
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#telas">
                Telas
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#howitworks">
                Como começar
              </a>
            </li>
            <li class="nav-item">
              <Link to="/examBuilder" className="nav-link">
                Crie um simulado
              </Link>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#contato">
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
