import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post(process.env.REACT_APP_API_URL +'/api/auth/login', values, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          });
        const token = response.data.result.accessToken;
        localStorage.setItem('token', token);
        navigate('/feedback');
      } catch (error) {
        if (error.response.status === 422) {
            setErrors(error.response.data.errors);
          }
        setErrors({ login: error.response.data.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={`form-control ${errors.email ? 'is-invalid' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-danger">{formik.errors.email}</div>
          )}
        </div>
        <div className={`form-control ${errors.password ? 'is-invalid' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-danger">{formik.errors.password}</div>
          )}
        </div>
        {formik.errors.login && <div className="text-danger">{formik.errors.login}</div>}
        <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;