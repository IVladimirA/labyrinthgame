import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, Login, Registration, NotFound } from "./pages";
import { useDispatch } from "react-redux";
import { fetchAuthMe } from "./redux/slices/auth";
import React from "react";
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
