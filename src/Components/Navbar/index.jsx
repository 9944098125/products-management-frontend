import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "../../Redux/Actions/login";
import "./styles.css";
import CreateShop from "../../Pages/Shops/Create";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = localStorage.getItem('pma-user') !== undefined && JSON.parse(localStorage.getItem("pma-user"));
  //   console.log(user);
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <React.Fragment>
      <div className="w-100 bg-success d-flex align-items-center justify-content-between p-3">
        <h3 className="text-white">Products Management App</h3>
        <div className="d-flex align-items-center gap-5">
          <h4 className="text-white user-name">{user?.name.split(" ")[0]}</h4>
          {user?.is_admin ? (
            <CreateShop />
          ) : (
            <Link to='/cart' style={{ textDecoration: 'none', color: 'inherit' }}>
              <button className="btn btn-warning">
                Cart
              </button>
            </Link>
          )}
          <button onClick={logoutUser} className="btn btn-dark text-white">
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
