import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Login";
import SessionSync from "./pages/SessionSync";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/sync" element={<SessionSync />} />
    </Routes>
  );
}

export default App;
