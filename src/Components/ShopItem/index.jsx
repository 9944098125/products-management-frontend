import React from "react";
import { Link } from "react-router-dom";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";

import "./styles.css";
import { deleteShop, getShops, updateShop } from "../../Redux/Actions/shops";
import AlertModal from "../Modal";
import SPModal from "../SPModal";

export default function ShopItem(props) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("pma-user"));
  const AlertState = useSelector((state) => state.alert);

  const [showEditModal, setShowEditModal] = React.useState(false);

  const deleteUserShop = (shopId) => {
    dispatch(deleteShop(shopId, user?.id));
  };

  const updateUserShop = () => {
    setShowEditModal(true);
  };

  const formik = useFormik({
    initialValues: {
      name: props.shop[1],
      description: props.shop[2],
    },
    onSubmit: (values) => {
      const body = {
        name: values.name,
        description: values.description,
      };
      setShowEditModal(false)
      dispatch(updateShop(body, props.shop[0], user?.id))
    },
  });

  React.useEffect(() => {
    if (AlertState.type === 'success') {
      dispatch(getShops());
    }
  }, [dispatch, AlertState.type])

  return (
    <React.Fragment>
      {AlertState.message && <AlertModal show={true} />}
      <div className="shop-item d-flex align-items-center justify-content-between w-100 rounded">
        <Link
          to={`/shops/${props.shop[0]}`}
          style={{ textDecoration: "none", color: "inherit" }}>
          <h4 className="shop-name">{props.shop[1]}</h4>
          <p className="shop-desc">{props.shop[2]}</p>
        </Link>
        {user?.is_admin ? (
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={updateUserShop}
              className="btn btn-primary px-3 py-2">
              <AiFillEdit />
            </button>
            <SPModal
              module="shop"
              formik={formik}
              showModal={showEditModal}
              setShowModal={setShowEditModal}
            />
            <button
              onClick={() => deleteUserShop(props.shop[0])}
              className="del-btn btn btn-danger px-3 py-2">
              <AiTwotoneDelete />
            </button>
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
}
