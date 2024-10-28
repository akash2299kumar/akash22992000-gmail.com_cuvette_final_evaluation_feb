import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import styles from "./Login.module.css";
import EmailIcon from "../../assets/EmailIcon.svg";
import LockIcon from "../../assets/LockIcon.svg";
import ViewIcon from "../../assets/ViewIcon.svg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
     
      const response = await axios.post("https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/users/login", formData);

      if (response.data.success===true) {
       
        const token = response.data.token;
        
        const name = response.data.name;

      
        localStorage.setItem("token", token);
        localStorage.setItem("name", name);

       
        navigate("/");
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
    
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <div className={styles.text}>
          <h2>Login</h2>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
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
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={ViewIcon} alt="" className={styles.viewIcon} />
              </div>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            Login
          </button>
        </form>
        <div className={styles.linkContainer}>
          <div className={styles.accountText}>Don't have an account?</div>
          <div className={styles.link}>
            <Link to="/register" className={styles.register}>
              <div>Register</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
