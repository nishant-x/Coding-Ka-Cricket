import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Componentes/Navbar/Navbar";
import Homepage from "./Componentes/Homepage";
import ContactUs from "./Componentes/ContactUs/ContactUs";
import Footer from "./Componentes/Footers/Footer";
import Regiter from "./Componentes/RegisterForm/Register";
import Cursor from "./Componentes/Cursor/Cursor";
import './Componentes/Cursor/Cursor.css';
// import Compiler from "./Componentes/Compiler/CodeEditor";
import Addqueform from "./Componentes/Admin/Addque/Addqueform";
import ContestHomepage from "./Componentes/Contest/ContestHome/ContestHomepage";
import AdminLogin from "./Componentes/Admin/Adminlogin/Adminlogin";
import AdminHomepage from "./Componentes/Admin/Adminhome/Adminhomepage";
import Allquestions from "./Componentes/Admin/ViewQue/AllQuestions";
import ContestQuize from "./Componentes/Contest/ContestQuize/ContestQuize";
import ContestLogin from "./Componentes/Contest/ContestLogin/Contestlogin";
import AddQuizForm from "./Componentes/Admin/AddQuiz/AddQuizForm";


const App = () => {
  return (
    <>
      {/* <Compiler /> */}
      {/* <ContestLogin /> */}

      <Router>
        <Navbar />
        <Cursor />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Regiter />} />
          <Route path="/contestlogin" element={<ContestLogin/>} />
          <Route path="/contesthomepage" element={<ContestHomepage/>} />
          <Route path="/add-question" element={<Addqueform/>} />
          <Route path="/addquiz" element={<AddQuizForm/>} />
          <Route path="/allquestions" element={<Allquestions/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/adminhomepage" element={<AdminHomepage/>} />
          <Route path="/contestquize" element={<ContestQuize/>} />
        </Routes>
      <Footer/>
      </Router>
      


    </>
  );
};

export default App;


