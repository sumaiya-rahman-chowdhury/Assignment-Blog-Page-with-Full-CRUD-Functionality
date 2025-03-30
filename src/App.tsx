import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogForm from "./pages/Post";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/blog/:id" element={<BlogDetail />} /> */}
        <Route path="/blog/post" element={<BlogForm/>}/>
      </Routes>
    </>
  );
}

export default App;
