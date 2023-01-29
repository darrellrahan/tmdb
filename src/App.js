import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SingleData from "./pages/SingleData";

const App = () => (
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path=":type/:id" element={<SingleData />} />
    </Route>
  </Routes>
);

export default App;
