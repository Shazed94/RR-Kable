import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Admin from "./Components/Admin/Admin";
import AddCategory from "./Pages/Category/AddCategory";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Form from "./Pages/Form/Form";
import MainDashboard from "./Pages/Main-Dashboard/MainDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="dashboard1" element={<MainDashboard />} />
            <Route path="form" element={<Form />} />
            <Route path="add-category" element={<AddCategory />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
