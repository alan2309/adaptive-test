import React from "react";
import { Modal, Button } from "react-bootstrap";

function ConfirmDialogBox({
  showConfirmDialogBox,
  setShowConfirmDialogBox,
  confirm_no,
  confirm_yes,
  arg,
  msg,
}) {
  function confirmYes(e) {
    confirm_yes(arg);
    setShowConfirmDialogBox(false);
  }
  function confirmNo(e) {
    confirm_no();
    setShowConfirmDialogBox(false);
  }
  return (
    <Modal
      id="Login_page"
      show={showConfirmDialogBox}
      backdrop="static"
      keyboard={false}
      style={{}}
      centered
    >
      <Modal.Body
        style={{ textAlign: "center", padding: "20px 20px 15px 20px" }}
      >
        {msg}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={confirmYes}>
          Yes
        </Button>
        <Button variant="primary" onClick={confirmNo}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmDialogBox;
