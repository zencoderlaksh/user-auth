import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "../components/Registration";
import Login from "../components/Login";
import Home from "../components/Home";
import ErrorBoundary from "../ErrorBoundary";

const Approutes = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Registration />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default Approutes;
