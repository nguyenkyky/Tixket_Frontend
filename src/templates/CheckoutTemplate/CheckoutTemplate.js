import React from "react";
import { redirect, Navigate } from "react-router-dom";
import { USER_LOGIN } from "../../util/settings/config";
import { render } from "@testing-library/react";
import { useEffect } from "react";

const CheckoutTemplate = ({ childComponent }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (!localStorage.getItem(USER_LOGIN)) {
    return <Navigate to="/login" />;
  }
  return <div>{childComponent}</div>;
};

export default CheckoutTemplate;
