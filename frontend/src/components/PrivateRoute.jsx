// PrivateRoute.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const PrivateRoute = ({ Component }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return <Component />;
};

export default PrivateRoute;
