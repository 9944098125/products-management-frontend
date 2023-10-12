import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai";
import { useFormik } from "formik";

import { deleteProduct, getProducts, updateProduct } from "../../Redux/Actions/products";
import { addItemToCart } from '../../Redux/Actions/cart'
import "./styles.css";
import CreateProduct from "../Products/Create";
import SPModal from "../../Components/SPModal";

function EachShop() {
  const dispatch = useDispatch();
  const params = useParams();
  const user = JSON.parse(localStorage.getItem("pma-user"));
  const ProductsState = useSelector((state) => state.products);
  const [showEditModal, setShowEditModal] = React.useState({
    bool: false,
    id: 0,
  });

  React.useEffect(() => {
    dispatch(getProducts(params.id));
  }, [params.id, dispatch]);

  const product =
    ProductsState.products?.filter(
      (product) => product[0] === showEditModal?.id,
    );

  const formik = useFormik({
    initialValues: {
      name: product[0] ? product[0][1] : '',
      price: product[0] ? product[0][2] : '',
    },
    onSubmit: (values) => {
      const body = {
        name: values.name,
        price: values.price
      }
      dispatch(updateProduct(body, params.id, user?.id, showEditModal?.id))
      setShowEditModal({ bool: false })
    },
    enableReinitialize: true,
  });

  const editProduct = (productId) => {
    setShowEditModal({ bool: true, id: productId });
  };

  const deleteOneProduct = (productId) => {
    dispatch(deleteProduct(params.id, user?.id, productId))
  }

  const addProductToCart = (product) => {
    dispatch(addItemToCart(product))
  }

  return (
    <React.Fragment>
      <div className="container-fluid p-4 d-flex justify-content-center align-items-center flex-wrap gap-5">
        <CreateProduct />
        {ProductsState?.products?.map((product, idx) => (
          <div key={idx} className="product-item">
            <h4 className="product-name">{product[1]}</h4>
            <h6 className="price text-success">{product[2]}</h6>
            {user?.is_admin ? (
              <div className="d-flex align-items-center justify-content-between px-4">
                <button
                  onClick={() => {
                    editProduct(product[0]);
                  }}
                  className="btn btn-warning">
                  <AiFillEdit color="white" />
                </button>
                <SPModal
                  module="product"
                  formik={formik}
                  showModal={showEditModal.bool}
                  setShowModal={setShowEditModal}
                />
                <button onClick={() => deleteOneProduct(product[0])} className="btn btn-danger">
                  <AiTwotoneDelete color="white" />
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-end">
                <button onClick={() => addProductToCart(product)} className="btn btn-success">+</button>
              </div>
            )}
            <CreateProduct params={params} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

export default EachShop;
