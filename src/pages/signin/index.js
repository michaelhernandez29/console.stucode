import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import * as Yup from "yup";

import HttpClient from "../../lib/axios.js";
import AuthLayout from "../../components/authlayout/index.js";
import UserService from "../../services/userService.js";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Formato inválido")
    .required("El correo es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // TODO: Implement remember me funcionality
  // const [remember, setRemember] = useState(false);
  const initialValues = { email: "", password: "" };

  const handleFormSubmit = async (values) => {
    try {
      setError("");
      const response = await UserService.login(values);
      const token = response.data;
      HttpClient.setAuthorizationToken(token);
      setError("");
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout title="Bienvenido de nuevo!">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, touched, errors, handleChange, handleBlur }) => (
          <Form onSubmit={handleSubmit}>
            <TextField
              label="Correo"
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
              label="Contraseña"
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
            <FormControlLabel
              control={<Checkbox />}
              label="Recuérdame"
              sx={{ mb: 2 }}
            />
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Acceder a StuCode
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: 2,
              }}
            >
              ¿No tienes cuenta? Regístrate
            </Button>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default SignIn;
