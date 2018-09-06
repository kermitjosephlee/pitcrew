import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

const RiderAssist = props => (
  <div class="bg-rider">
    <Modal show={props.show} onHide={props.onHide} className="sweet-loading">
      <Modal.Header>
        <Modal.Title>Message</Modal.Title>
      </Modal.Header>

      <Modal.Body>Help is on the Way!</Modal.Body>

      <Modal.Footer />
    </Modal>
  </div>
);

export default RiderAssist;
