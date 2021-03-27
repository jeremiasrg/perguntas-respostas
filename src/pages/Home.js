import React, { useState } from "react";
import PageBase from "../pages/PageBase";
import Form from "../components/communs/Form";
import { Col, Container, Row, Modal, Button, Image } from "react-bootstrap";
import InputText from "../components/communs/input/InputText";

export default (props) => {
  const [nome, setNome] = useState();

  function onSave() {}
  return (
    <PageBase titulo="Novo teste">
      <div>
        <Form showCancelButton={false} onSave={onSave}>
          <Container>
            <Row>
              <Col md="12">
                <InputText
                  value={nome}
                  onChange={(valor) => setNome(valor)}
                  required={false}
                  label="Nome"
                ></InputText>
              </Col>
            </Row>
          </Container>
        </Form>
      </div>
    </PageBase>
  );
};
