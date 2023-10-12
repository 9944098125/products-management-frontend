import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./styles.css";
import RegistrationForm from "./RegistrationForm";
import { registration } from "../../Redux/Actions/registration";
import AlertModal from "../../Components/Modal";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      " Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character", // eslint-disable-line
    ),
  confirmPassword: Yup.string()
    .required("Confirm Your Password")
    .oneOf([Yup.ref("password"), null], "Your Passwords are not matching"),
});

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        email: values.email,
        password: values.password,
        is_admin: isTrader,
      };
      dispatch(registration(body));
    },
  });

  const AlertState = useSelector((state) => state.alert);

  const [isTrader, setIsTrader] = React.useState(false);

  const handleToggleTrader = (e) => {
    setIsTrader(e.target.value === "true");
  };

  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [navigate, AlertState.type]);

  return (
    <React.Fragment>
      <div className="container-fluid primary-bg d-flex flex-column align-items-center justify-content-center">
        <div className="col-10 col-md-8 col-lg-7 h-100 glass-effect py-4 px-4 rounded">
          <div className="w-100 d-flex flex-column align-items-center mb-3">
            <h3>Registration</h3>
            <h6>
              Already have an account ? Please <Link to="/login">Login</Link>
            </h6>
          </div>
          {AlertState.message && <AlertModal show={true} />}
          <RegistrationForm
            formik={formik}
            isTrader={isTrader}
            handleToggleTrader={handleToggleTrader}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
