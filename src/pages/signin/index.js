import React, { useState } from "react";
import { Form, Formik } from "formik";
import { Alert, Button, TextField } from "@mui/material";
import * as Yup from "yup";

import HttpClient from "../../lib/axios.js";
import AuthLayout from "../../components/authlayout/index.js";
import AuthService from "../../services/authService.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignIn = () => {
  const [error, setError] = useState("");
  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (values) => {
    try {
      setError("");
      const response = await AuthService.login(values);
      const token = response.data;
      HttpClient.setAuthorizationToken(token);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout title="Sign Up">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="filled"
              name="email"
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              variant="filled"
              name="password"
              fullWidth
              required
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{ mb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignIn;
