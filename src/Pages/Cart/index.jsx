import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemFromCart } from "../../Redux/Actions/cart";

export default function Cart() {
    const dispatch = useDispatch();

    const CartItems = useSelector((state) => state.cart.cart);

    const deleteProduct = (productId) => {
        dispatch(removeItemFromCart(productId));
    };

    return (
        <React.Fragment>
            <div className="container-fluid p-4">
                {CartItems ? (
                    CartItems.map((product, idx) => (
                        <div

                            key={idx}
                            className={`d-flex align-items-center justify-content-between`}>
                            <h5>{idx + 1}</h5>
                            <h4>
                                ({product[1]} - {product[2]}) x {product[4]}
                            </h4>
                            <button
                                onClick={() => deleteProduct(product[0])}
                                className="btn btn-danger">
                                -
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="d-flex-justify-content-center align-items-center">
                        No Items in Cart
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}
