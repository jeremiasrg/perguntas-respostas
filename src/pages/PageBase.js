import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as AiIcons from "react-icons/ai";
import { useHistory } from "react-router-dom";
// import Titulo from "../components/Titulo";
import DashboardLayout from "../base/DashboardLayout";
import { Col, Container, Row, Toast } from "react-bootstrap";
// import * as TokenUtils from "../base/utils/tokenUtils";

export default (props) => {
  const history = useHistory();

  useEffect(() => {
    // checkToken();
  }, []);

  // function checkToken() {
  //   let token = TokenUtils.getAppToken();

  //   if (token === undefined || token === null) {
  //     history.push("/");
  //   }
  // }
  return (
    <DashboardLayout titulo={props.titulo}>{props.children}</DashboardLayout>
  );
};
