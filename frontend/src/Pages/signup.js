import { useState } from "react";
import styles from "../CSS/Signup.module.css";
import TextInput from "../Components/TextInput/TextInput";
import signupSchema from "../Components/schemas/SignupSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/internal";
import { Loader } from "../Components/Loader/Loader";
import axios from 'axios';

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isLoading,SetIsLoading]=useState(false)
  const handleSignup = async () => {
    setIsButtonClicked(true);
    SetIsLoading(true);
    const data = {
      name: values.name,
      role: values.role,
      password: values.password,
      confirmPassword: values.confirmPassword,
      email: values.email,
      number: values.number,
    };

    const response = await signup(data);

    if (response.status === 201) {
      alert("Sign up successfull! You can now login")
      if(data.role==="restaurant owner"){
        axios.get(`http://localhost:8000/rating/${data.name}`)
      .then(response => {
        
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
      
    
       
      navigate("/login");
      SetIsLoading(false);
    } else if (response.code === "ERR_BAD_REQUEST") {
      // display error message
      setError(response.response.data.message);
      SetIsLoading(false);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
      number: "",
    },

    validationSchema: signupSchema,
  });

  return (
    <div className={styles.signupWrapper}>
      <div className={styles.signupHeader}>Sign Up</div>
    

      <TextInput 
        className={styles.input}
        type="text"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Name/Restaurant Name"
        error={errors.name && touched.name ? 1 : undefined}
        errormessage={errors.name}
      />

      <TextInput
        className={styles.input}
        type="text"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />

      <TextInput
        className={styles.input}
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />

      <TextInput
        className={styles.input}
        type="password"
        name="confirmPassword"
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Confirm password"
        error={
          errors.confirmPassword && touched.confirmPassword ? 1 : undefined
        }
        errormessage={errors.confirmPassword}
      />
      <TextInput
        className={styles.input}
        type="text"
        name="number"
        value={values.number}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Number"
        error={errors.number && touched.number ? 1 : undefined}
        errormessage={errors.number}
      />
      <select
        name="role"
        value={values.role}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.role && touched.role ? 1 : undefined}
      >
        <option value="" label="Select a role" />
        <option value="admin" label="Admin" />
        <option value="user" label="User" />
        <option value="restaurant owner" label="Restaurant Owner" />
      </select>
      {errors.role && touched.role && <div>{errors.role}</div>}

      <button
        className={`${styles.signupButton} ${
          isButtonClicked ? styles.clickedButton : ""
        }`}
        onClick={handleSignup}
        disabled={
          !values.role ||
          !values.password ||
          !values.name ||
          !values.confirmPassword ||
          !values.email ||
          !values.number ||
          errors.number ||
          errors.role ||
          errors.password ||
          errors.confirmPassword ||
          errors.name ||
          errors.email
        }
      >
        Sign Up
      </button>

      <span className={styles.sp}>
        Already have an account?{" "}
        <button className={styles.login} onClick={() => navigate("/login")}>
          Log In
        </button>
      </span>

      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      {isLoading && <Loader text="please wait" />}
    </div>
  );
};
