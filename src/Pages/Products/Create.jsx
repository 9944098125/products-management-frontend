import React from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import AlertModal from '../../Components/Modal'
import SPModal from "../../Components/SPModal";
import "./styles.css";
import { createProduct, getProducts } from '../../Redux/Actions/products'



export default function CreateProduct() {
    const params = useParams()
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem("pma-user"));
    const userId = user.id;
    const [showModal, setShowModal] = React.useState(false);

    const AlertState = useSelector((state) => state.alert)

    const openModal = () => {
        setShowModal(true);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
        },
        validate: (values) => {
            let errors = {};
            if (!values.name) errors.name = "Shop Name is required...";
            if (!values.price)
                errors.price = "Describe about your shop...";
            return errors;
        },
        onSubmit: (values) => {
            const body = {
                name: values.name,
                price: values.price,
            };
            setShowModal(false)
            dispatch(createProduct(body, params.id, userId))
        },
    });

    React.useEffect(() => {
        if (AlertState.type === 'success') {
            dispatch(getProducts(params.id))
        }
    }, [AlertState, dispatch, params.id])

    return (
        <React.Fragment>
            {user?.is_admin ? (
                <button
                    onClick={openModal}
                    style={{
                        height: "50px",
                        width: "50px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        right: "15px",
                        bottom: "10px",
                    }}
                    className="btn btn-success p-5 rounded-circle">
                    <h1>+</h1>
                </button>
            ) : null}
            {AlertState.message && <AlertModal show={true} />}
            <SPModal
                module="product"
                formik={formik}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        </React.Fragment>
    );
}
