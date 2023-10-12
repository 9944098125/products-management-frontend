import React from "react";
import { Form as RBForm, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

function RegistrationForm(props) {
  const { formik, isTrader, handleToggleTrader } = props;
  const RegistrationState = useSelector((state) => state.registration);

  return (
    <React.Fragment>
      <div className="form-section">
        <form onSubmit={formik.handleSubmit}>
          <div className="row align-items-center gap-3 mb-4">
            <div className="form-group col-md">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter Your Name Here..."
                className={
                  formik.touched.name && Boolean(formik.errors.name)
                    ? "form-control primary-input-field is-invalid"
                    : "form-control primary-input-field"
                }
              />
              {formik.touched.name && Boolean(formik.errors.name) && (
                <p className="invalid-feedback">{formik.errors.name}</p>
              )}
            </div>

            <div className="form-group col-md">
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter Your Email Here..."
                className={
                  formik.touched.email && Boolean(formik.errors.email)
                    ? "form-control primary-input-field is-invalid"
                    : "form-control primary-input-field"
                }
              />
              {formik.touched.email && Boolean(formik.errors.email) && (
                <p className="invalid-feedback">{formik.errors.email}</p>
              )}
            </div>
          </div>

          <div className="row align-items-center gap-3 mb-4">
            <div className="form-group col-md">
              <input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Enter Your Password Here..."
                className={
                  formik.touched.password && Boolean(formik.errors.password)
                    ? "form-control primary-input-field is-invalid"
                    : "form-control primary-input-field"
                }
              />
              {formik.touched.password && Boolean(formik.errors.password) && (
                <p className="invalid-feedback">{formik.errors.password}</p>
              )}
            </div>

            <div className="form-group col-md">
              <input
                type="password"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                placeholder="Confirm Your Password Here..."
                className={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                    ? "form-control primary-input-field is-invalid"
                    : "form-control primary-input-field"
                }
              />
              {formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword) && (
                  <p className="invalid-feedback">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center px-4">
            <div className="d-flex align-items-center justify-content-center gap-5 py-3 mb-3 px-3 col-md">
              <RBForm.Check
                type="radio"
                name="isAdminRadio"
                label="Trader"
                value="true"
                checked={isTrader}
                onChange={handleToggleTrader}
              />
              <RBForm.Check
                type="radio"
                name="isAdminRadio"
                label="Customer"
                value="false"
                checked={!isTrader}
                onChange={handleToggleTrader}
              />
            </div>
          </div>
          <button type="submit" className="btn primary-button">
            Register
            {RegistrationState.loading && <Spinner animation="border" />}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default RegistrationForm;
