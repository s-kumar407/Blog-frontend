import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Footer from "./BigComponents/Footer";
import Header from "./BigComponents/Header";
import Homepage from "./BigComponents/Homepage";
import Blogpage from "./BigComponents/Blogpage";
import LogIn from "./BigComponents/Login";
import Signup from "./BigComponents/Signup";
import Updateblog from "./BigComponents/Updateblog";
import UpdateSingleBlog from "./BigComponents/UpdateSingleBlog";
import PrivateComponent from "./BigComponents/PrivateComponent";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="relative">
      <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Homepage />} />
          <Route element={<PrivateComponent />}>
           
            <Route path="/blogpage" element={<Blogpage />} />
            <Route path="/updateblog" element={<Updateblog />} />
            <Route
              path="/updateSingleblog/:blogId"
              element={<UpdateSingleBlog />}
            />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
