import React from "react";
import { Modal } from "react-bootstrap";

import "./styles.css";

export default function SPModal(props) {
  const { showModal, formik, setShowModal, module } = props;
  return (
    <React.Fragment>
      <Modal
        backdrop="static"
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        centered>
        <div className="p-3 form-section">
          <Modal.Header closeButton>
            <div className="text-center">
              {module === "shop" ? (
                <h3 className="text-success">Shops</h3>
              ) : (
                <h3 className="text-success">Products</h3>
              )}
            </div>
          </Modal.Header>
          {module === "shop" ? (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  placeholder="Enter Shop Name"
                  onChange={formik.handleChange}
                  className={
                    formik.touched.name && Boolean(formik.errors.name)
                      ? "is-invalid primary-input-field form-control"
                      : "form-control primary-input-field"
                  }
                />
              </div>

              <div className="form-group mb-4">
                <textarea
                  rows="4"
                  type="text"
                  name="description"
                  value={formik.values.description}
                  placeholder="Describe your shop"
                  onChange={formik.handleChange}
                  className={
                    formik.touched.description &&
                      Boolean(formik.errors.description)
                      ? "is-invalid form-control"
                      : "form-control"
                  }
                  style={{ boxShadow: "var(--shadow" }}
                />
              </div>
              <button type="submit" className="primary-button btn">
                Submit
              </button>
            </form>
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group mb-4">
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  placeholder="Enter Product Name"
                  onChange={formik.handleChange}
                  className={
                    formik.touched.name && Boolean(formik.errors.name)
                      ? "is-invalid primary-input-field form-control"
                      : "form-control primary-input-field"
                  }
                />
              </div>

              <div className="form-group mb-4">
                <input
                  type="text"
                  name="price"
                  placeholder="Enter Price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  className={
                    formik.touched.price && Boolean(formik.errors.price)
                      ? "is-invalid primary-input-field form-control"
                      : "form-control primary-input-field"
                  }
                />
              </div>
              <button type="submit" className="primary-button btn">
                Submit
              </button>
            </form>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
}
