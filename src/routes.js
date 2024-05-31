import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import EditAddress from "./Pages/EditAddress";

function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/edit/:id" element={<EditAddress/>} />
        </Routes>
    </Router>
  );
}

export default MyRoutes;