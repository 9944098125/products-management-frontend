import React from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";

import "./styles.css";

export default function AlertModal({ show }) {
  // taking the show value for modal from props
  // and taking the alert state from reducer
  const AlertState = useSelector((state) => state.alert);

  return (
    <React.Fragment>
      {/* when success happens success modal is shown or else failure modal */}
      {AlertState.type === "success" ? (
        <Modal
          style={{
            borderRadius: "12px",
          }}
          size="sm"
          centered
          show={show}>
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div className="modal-upper-part-success">
              <img
                src="https://www.shutterstock.com/image-vector/check-icon-260nw-491675362.jpg"
                alt=""
                height={70}
                width={70}
              />
            </div>
            <div className="modal-text">$$ Success $$</div>
          </Modal.Title>
          <Modal.Body>
            <div className="modal-message">{AlertState.message}</div>
          </Modal.Body>
        </Modal>
      ) : (
        <Modal
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          size="sm"
          centered
          show={show}>
          <Modal.Title
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div className="modal-upper-part-error">
              <img
                src="https://cdn.pixabay.com/photo/2013/07/12/12/17/cancel-145513_640.png"
                alt=""
                height={70}
                width={70}
              />
            </div>
            <div className="modal-text">**Error**</div>
          </Modal.Title>
          <Modal.Body>
            <div className="modal-message">{AlertState.message}</div>
          </Modal.Body>
        </Modal>
      )}
    </React.Fragment>
  );
}
