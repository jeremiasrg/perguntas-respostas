import React, { useEffect, useState } from "react";
import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import Form from "./Form";
import { strToUpperCase } from "../../base/helper";

export default function ModalForm(props) {
  function mountTitleEdit(data) {
    return data.edit && data.edit.title
      ? data.edit.title
      : `Editar ${strToUpperCase(data.context.substr(1))}`;
  }

  function mountTitleCreate(data) {
    return data.create && data.create.title
      ? data.create.title
      : `Cadastrar ${strToUpperCase(data.context.substr(1))}`;
  }

  return (
    <Modal
      size={props.size}
      centered
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.data.id
            ? mountTitleEdit(props.data)
            : mountTitleCreate(props.data)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Form
            onAfterSave={props.onClose}
            onCancel={props.onHide}
            data={props.data}
          ></Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
