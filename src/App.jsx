
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ErrorPage from "./Pages/ErrorPage";
import Details from "./Pages/Details";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  function ProtectedRoute({ isAuthenticated, children }) {
    if (!isAuthenticated) {
      navigate("/login");
    }
    return children;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={!!token}>
            <Home></Home>
          </ProtectedRoute>
        }
      ></Route>
      <Route path="/books/:id" element={<Details></Details>}></Route>

      <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
