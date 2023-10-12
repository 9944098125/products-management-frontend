import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { getShops } from "../../Redux/Actions/shops";
import ShopItem from "../../Components/ShopItem";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!localStorage.getItem("pma-isAuthenticated")) {
      navigate("/login", { replace: true });
    }
    dispatch(getShops())
  }, [navigate, dispatch]);

  const ShopsState = useSelector((state) => state.shops);

  return (
    <React.Fragment>
      <div className="container-fluid">
        {ShopsState?.shops &&
          ShopsState.shops.map((shop, idx) => (
            <ShopItem shop={shop} key={idx} />
          ))}
      </div>
    </React.Fragment>
  );
}
