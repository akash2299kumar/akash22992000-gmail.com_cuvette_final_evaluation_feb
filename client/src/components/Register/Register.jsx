import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Register.module.css";
import EmailIcon from "../../assets/EmailIcon.svg";
import LockIcon from "../../assets/LockIcon.svg";
import NameIcon from "../../assets/NameIcon.svg";
import ViewIcon from "../../assets/ViewIcon.svg";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);


  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/users/register", formData);
      console.log(response.data);
     
      toast.success("User registered successfully!");
      navigate("/login");
    } catch (error) {
    
     
      setError("Registration failed. Please try again later.");
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <ToastContainer />
        <div className={styles.text}>
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={NameIcon} alt="" className={styles.icon} />
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
                placeholder="Name"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={EmailIcon} alt="" className={styles.icon} />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
                type={showPassword2 ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <div className={styles.viewIcon}>
                <img
                  src={ViewIcon}
                  alt=""
                  className={styles.viewIcon}
                  onClick={() => setShowPassword2(!showPassword2)}
                />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={ViewIcon} alt="" />
              </div>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Register
          </button>
        </form>
        <div className={styles.linkContainer}>
          <div className={styles.accountText}>Have an account ?</div>
          <div className={styles.link}>
            <Link to="/login" className={styles.login}>
              <div>Login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
