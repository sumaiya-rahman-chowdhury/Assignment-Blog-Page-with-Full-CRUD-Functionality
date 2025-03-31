import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlogForm from "./pages/Post";
import PageDetails from "./pages/PageDetails";
import Edit from "./pages/Edit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/blog/:id" element={<BlogDetail />} /> */}
        <Route path="/blog/post" element={<BlogForm/>}/>
        <Route path="/blogs/:id" element={<PageDetails/>} />
        <Route path="/blogs/edit/:id" element={<Edit/>} />
      </Routes>
    </>
  );
}

export default App;
