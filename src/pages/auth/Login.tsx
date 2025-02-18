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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
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
  const { userLoggedIn, user, loading } = useSelector(
    (state: RootState) => state.Auth
  );
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["userName"], formData["password"]));
  };
  useEffect(() => {
    if (userLoggedIn && user) {
      navigate("/"); // ✅ Redirect to Dashboard
    }
  }, [userLoggedIn, user, navigate]); // Run when these values change

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
          
          <div className="text-center mt-3">
            <Link to="/auth/forget-password" className="text-muted">
              {t("Forgot Password?")}
            </Link>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};

export default Login;
