import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";
import { AuthAdminCredentials } from "../../server/admin/auth";
import { toast } from "react-toastify";
// import { isUserAuthenticated } from "../../helpers/api/apiCore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { loginUser } from "../../redux/actions";

interface UserData {
  userName: string;
  password: string;
}

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const schemaResolver = yupResolver(
    yup.object().shape({
      userName: yup.string().required(t("Please enter userName")),
      password: yup.string().required(t("Please enter Password")),
    })
  );
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["userName"], formData["password"]));
  };

  // const onSubmit = async (formData: UserData) => {
  //   try {
  //     const response = await AuthAdminCredentials(formData);
  //     if (response.status && response.data?.token) {
  //       localStorage.setItem("token", response.data.token);
  //       isUserAuthenticated();
  //       toast.success("Login successful! Redirecting...");
  //       navigate("/");
  //     } else {
  //       toast.error(response.message || "Login failed. Please try again.");
  //     }
  //   } catch (error: any) {
  //     console.error("Login Error:", error.response?.data || error.message);
  //     toast.error(error.response?.data?.message || "Something went wrong.");
  //   }
  // };

  return (
    <>
      <AuthLayout
        helpText={t("Enter your User name and password to access admin panel.")}
      >
        <VerticalForm<UserData> onSubmit={onSubmit} resolver={schemaResolver}>
          <FormInput
            label={t("userName")}
            type="text"
            name="userName"
            placeholder="Enter your userName"
            containerClass={"mb-3"}
          />
          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder="Enter your password"
            containerClass={"mb-3"}
          ></FormInput>

          <div className="text-center d-grid">
            <Button variant="primary" type="submit">
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
