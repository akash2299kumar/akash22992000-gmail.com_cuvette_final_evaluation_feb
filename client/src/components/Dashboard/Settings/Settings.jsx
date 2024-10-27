import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Settings.module.css";
import NameIcon from "../../../assets/NameIcon.svg";
import EmailIcon from "../../../assets/EmailIcon.svg";
import LockIcon from "../../../assets/LockIcon.svg";
import ViewIcon from "../../../assets/ViewIcon.svg";
import axios from "axios";

const ChangePassword = () => {
  const navigate = useNavigate();
  const Name = localStorage.getItem("name");
  const [formData, setFormData] = useState({
    name: "",
    email:"",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const { name, email,  oldPassword, newPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!oldPassword || !newPassword) {
  //     setError("All fields are required");
  //     return;
  //   }

  //   console.log("change password :", localStorage);
  //   try {
  //     const token = localStorage.getItem("token");
  //     axios.defaults.headers.common["Authorization"] = token;
  //     console.log(token);
  //     if (!token) {
  //       console.log("Token missing");
  //       return;
  //     }

  //     const response = await axios.post("http://localhost:5001/api/users/updateprofile", formData);
  //     console.log(response.data);

  //     toast.success("Password changed successfully!");
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error:", error);

  //     setError("Password change failed. Please try again later.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure at least one field is provided for the update
    if (!name && !email && (!oldPassword || !newPassword)) {
      setError("At least one field must be provided for update");
      return;
    }
  
    console.log("change password :", localStorage);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("Token missing");
        return;
      }
      axios.defaults.headers.common["Authorization"] = token;
  
      // Create request body based on which fields are filled
      const requestBody = {};
      if (name) requestBody.name = name;
      if (email) requestBody.email = email;
      if (oldPassword && newPassword) {
        requestBody.oldPassword = oldPassword;
        requestBody.newPassword = newPassword;
      }
  
      console.log("Request Body:", requestBody);
  
      const response = await axios.post("http://localhost:5001/api/users/updateprofile", requestBody);
      console.log(response.data);
  
      toast.success("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data.message : "Profile update failed. Please try again later.");
    }
  };
  

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerContent}>
        <ToastContainer />
        <div className={styles.text}>
          <h2>Settings</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={NameIcon} alt="" className={styles.icon} />
              <div className={styles.inpuText}>
                <input
                  type="name"
                  id="name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={EmailIcon} alt="" className={styles.icon} />
              <div className={styles.inpuText}>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                
                placeholder="Email"
              />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
               type={showPassword ? "text" : "password"}
                id="oldPassword"
                name="oldPassword"
                value={oldPassword}
                onChange={handleChange}
                
                placeholder="Old Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword(!showPassword)}
              >
                <img src={ViewIcon} alt="" />
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputContainer}>
              <img src={LockIcon} alt="" className={styles.icon} />
              <input
                type={showPassword1 ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={handleChange}
                
                placeholder=" New Password"
              />
              <div
                className={styles.viewIcon}
                onClick={() => setShowPassword1(!showPassword1)}
              >
                <img src={ViewIcon} alt="" className={styles.viewIcon} />
              </div>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
