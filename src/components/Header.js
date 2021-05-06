import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";

import { i18n } from "../translate/i18n";

function Header(props) {
  const [navbarShrink, setNavbarShrink] = useState(false);
  const [navbarShowLinks, setNavbarShowLinks] = useState(false);

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (document.documentElement.scrollTop > 30) {
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
          <FaIcons.FaRegCheckSquare />
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
                {i18n.t("links.home")}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#features">
                {i18n.t("links.features")}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#telas">
                {i18n.t("links.screens")}
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/#howitworks">
                {i18n.t("links.howToStart")}
              </a>
            </li>
            <li class="nav-item">
              <Link to="/examBuilder" className="nav-link">
                {i18n.t("links.examBuilder")}
              </Link>
            </li>

            {/* <li class="nav-item">
              <a class="nav-link" href="#contato">
                Contato
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Header;
