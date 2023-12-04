import { useState } from "react";
import styles from "../CSS/Login.module.css";
import TextInput from "../Components/TextInput/TextInput";
import loginSchema from "../Components/schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../api/internal";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Components/Loader/Loader";


export const Login=()=> {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [isLoading,SetIsLoading]=useState(false)

  const [error, setError] = useState("");
  const [isButtonClicked,setIsButtonClicked]=useState(false)

  const handleLogin = async () => {
    SetIsLoading(true)

    const data = {
      email: values.email,
      password: values.password,
    };

    const response = await login(data);

    if (response.status === 200) {
      
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        name: response.data.user.name,
        role:response.data.user.role,
        auth: response.data.auth,
      };

      dispatch(setUser(user));
      if (user.role==="admin") {
        navigate("/admin/")
      } else if (user.role==="restaurant owner") {
        navigate("/restaurantHome")
        
      } else {

         navigate("/");
      }
      SetIsLoading(false)
    } else if (response.code === "ERR_BAD_REQUEST") {
      SetIsLoading(false)
      setError(response.response.data.message);
    }
  };
  const handleButtonClick= ()=>{
    setIsButtonClicked(true)
    handleLogin()
  }

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: loginSchema,
  });

  return (
    <div className={styles.container}>
    <div className={styles.loginWrapper}>
      <div className={styles.loginHeader}>Food Meter</div>
      <TextInput
        type="text"
        value={values.email}
        name="email"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Email"
        error={errors.email && touched.email ? 1 : undefined}
        errormessage={errors.email}
      />
      <TextInput
        type="password"
        name="password"
        value={values.password}
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Password"
        error={errors.password && touched.password ? 1 : undefined}
        errormessage={errors.password}
      />
       <button
      className={`${styles.logInButton} ${isButtonClicked ? styles.clickedButton : ''}`}
      onClick={handleButtonClick}
      disabled={!values.email || !values.password || errors.email || errors.password}
    >
      Login
    </button>
    <div className={styles.reg}>
      <span>
        Don't have an account?{" "}
        <button
          className={styles.createAccount}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </span>
      </div>
      {error !== "" ? <p className={styles.errorMessage}>{error}</p> : ""}
      {isLoading && <Loader text="please wait" />}
    </div>
    </div>
  );
}