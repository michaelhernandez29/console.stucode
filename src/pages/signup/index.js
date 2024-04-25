import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Formik } from "formik";
import { Alert, Button, TextField } from "@mui/material";
import * as Yup from "yup";

import AuthLayout from "../../components/authlayout/index.js";
import AuthService from "../../services/authService.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid format").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignUp = () => {
  const [error, setError] = useState("");
  const initialValues = { name: "", email: "", password: "" };

  const handleFormSubmit = async (values) => {
    try {
      await AuthService.register(values);
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
              label="Name"
              variant="filled"
              name="name"
              fullWidth
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              sx={{ mb: 2 }}
            />
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
              }}
            >
              Registrarse
            </Button>
            <Button
              component={Link}
              to="/signin"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              ¿Ya tienes una cuenta? Acceder
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignUp;
