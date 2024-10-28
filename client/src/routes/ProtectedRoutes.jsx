import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      axios.defaults.headers.common["Authorization"] = token;

      const response = await axios.post("https://akash22992000-gmail-com-cuvette-final-evaluation-feb-server.vercel.app/api/users/get-user-by-id");

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return <div>{user !== null && children}</div>;
}

export default ProtectedRoute;
