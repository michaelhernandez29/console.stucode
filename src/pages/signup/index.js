import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { Alert, Button, TextField } from "@mui/material";
import * as Yup from "yup";

import AuthLayout from "../../components/authlayout/index.js";
import UserService from "../../services/userService.js";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Formato inválido")
    .required("Este campo es obligatorio"),
  password: Yup.string().required("Este campo es obligatorio"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const initialValues = { name: "", email: "", password: "" };

  const handleFormSubmit = async (values) => {
    try {
      await UserService.register(values);
      navigate("/signin");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout>
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
              required
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
