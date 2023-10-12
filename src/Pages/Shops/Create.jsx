import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import SPModal from "../../Components/SPModal";
import "./styles.css";
import { createShop, getShops } from "../../Redux/Actions/shops";
import AlertModal from '../../Components/Modal'

export default function CreateShop() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("pma-user"));
  const userId = user.id;
  const [showModal, setShowModal] = React.useState(false);

  const AlertState = useSelector((state) => state.alert)

  const openModal = () => {
    setShowModal(true);
  };
  const ShopsState = useSelector((state) => state.shops)

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) errors.name = "Shop Name is required...";
      if (!values.description)
        errors.description = "Describe about your shop...";
      return errors;
    },
    onSubmit: (values) => {
      const body = {
        name: values.name,
        description: values.description,
      };
      setShowModal(false)
      dispatch(createShop(body, userId));
    },
  });

  React.useEffect(() => {
    if (AlertState.type === 'success') {
      dispatch(getShops())
    }
  }, [dispatch, ShopsState.shops, AlertState.type])

  return (
    <React.Fragment>
      {user?.is_admin ? (
        <button onClick={openModal} className="btn btn-warning">
          Create Shop
        </button>
      ) : null}
      {AlertState.message && <AlertModal show={true} />}
      <SPModal
        module="shop"
        formik={formik}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </React.Fragment>
  );
}
