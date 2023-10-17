import { useState } from "react";
import styles from "../CSS/Signup.module.css";
import TextInput from "../Components/TextInput/TextInput";
import signupSchema from "../Components/schemas/SignupSchema";
import { useFormik } from "formik";
import { setUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../api/internal";


export const  SignUp=()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      role:values.role,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
    };

    const response = await signup(data);

    if (response.status === 201) {
      // setUser
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        role: response.data.user.role,
        auth: response.data.auth,
      };

      dispatch(setUser(user));

      // redirect homepage
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: signupSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Create an account</div>
      <TextInput
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        type="text"
        name="role"
        value={values.role}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="role"
        error={errors.role && touched.role ? 1 : undefined}
        errormessage={errors.role}
      />

      <TextInput
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <TextInput
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />

      <button
        className={styles.signupButton}
        onClick={handleSignup}
        disabled={
          !values.role ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          errors.role ||
          errors.password ||
          errors.confirmPassword ||
          errors.name ||
          errors.email
        }
      >
        Sign Up
      </button>

      <span>
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>

      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
    </div>
  );
}
