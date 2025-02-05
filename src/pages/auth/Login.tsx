import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Navigate, Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

// actions
import { resetAuth, loginUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";
import { AuthAdminCredentials } from "../../server/admin/auth";
import { toast } from "react-toastify";


interface UserData {
  userName: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p>
          <Link to={"/auth/forget-password"} className="text-white-50 ms-1">
            {t("Forgot your password?")}
          </Link>
        </p>
        <p className="text-white-50">
          {t("Don't have an account?")}{" "}
          <Link to={"/auth/register"} className="text-white ms-1">
            <b>{t("Sign Up")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

/* social links */
const SocialLinks = () => {
  const socialLinks = [
    {
      variant: "primary",
      icon: "facebook",
    },
    {
      variant: "danger",
      icon: "google",
    },
    {
      variant: "info",
      icon: "twitter",
    },
    {
      variant: "secondary",
      icon: "github",
    },
  ];
  return (
    <>
      <ul className="social-list list-inline mt-3 mb-0">
        {(socialLinks || []).map((item, index: number) => {
          return (
            <li key={index} className="list-inline-item">
              <Link
                to="#"
                className={classNames(
                  "social-list-item",
                  "border-" + item.variant,
                  "text-" + item.variant
                )}
              >
                <i className={classNames("mdi", "mdi-" + item.icon)}></i>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  form validation schema
  */
  const schemaResolver = yupResolver(
    yup.object().shape({
      userName: yup.string().required(t("Please enter userName")),
      password: yup.string().required(t("Please enter Password")),
    })
  );

  /*
  handle form submission
  */
  const onSubmit = async (formData: UserData) => {
    try {
      const response = await AuthAdminCredentials(formData);
      if (response.status && response.data?.token) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful! Redirecting...");
        navigate("/");
      } else {
        toast.error(response.message || "Login failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };
  const location = useLocation();
  //
  // const redirectUrl = location.state && location.state.from ? location.state.from.pathname : '/';
  const redirectUrl = location?.search?.slice(6) || "/";

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl}></Navigate>}

      <AuthLayout
        helpText={t(
          "Enter your email address and password to access admin panel."
        )}
        bottomLinks={<BottomLink />}
      >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ userName: "test", password: "test" }}
        >
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
            <Button variant="primary" type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>

        <div className="text-center">
          <h5 className="mt-3 text-muted">{t("Sign in with")}</h5>
          <SocialLinks />
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
