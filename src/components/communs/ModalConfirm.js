import { Col, Container, Modal, Row, Button } from "react-bootstrap";
import React from "react";

export default function ModalConfirm(props) {
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar ação</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Tem certeza que deseja executar esta ação?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.onClose ? props.onClose : () => {}}
        >
          Cancelar
        </Button>
        <Button variant="danger" onClick={props.onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
