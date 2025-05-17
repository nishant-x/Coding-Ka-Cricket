import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ContactUs from "./Componentes/ContactUs/ContactUs";
import Cursor from "./Componentes/Cursor/Cursor";
import "./Componentes/Cursor/Cursor.css";
import Footer from "./Componentes/Footers/Footer";
import Homepage from "./Componentes/Homepage";
import Navbar from "./Componentes/Navbar/Navbar";
import Regiter from "./Componentes/RegisterForm/Register";
// import Compiler from "./Componentes/Compiler/CodeEditor";
import { Toaster } from "react-hot-toast";
import EditorPage from "./CodeEditor/EditorPage";
import Home from "./CodeEditor/Home";
import Addqueform from "./Componentes/Admin/Addque/Addqueform";
import AddQuizForm from "./Componentes/Admin/AddQuiz/AddQuizForm";
import AdminHomepage from "./Componentes/Admin/Adminhome/Adminhomepage";
import AdminLogin from "./Componentes/Admin/Adminlogin/Adminlogin";
import Allquestions from "./Componentes/Admin/ViewQue/AllQuestions";
import ContestHomepage from "./Componentes/Contest/ContestHome/ContestHomepage";
import ContestLogin from "./Componentes/Contest/ContestLogin/Contestlogin";
import ContestQuiz from "./Componentes/Contest/ContestQuiz/ContestQuiz";

const App = () => {
  return (
    <>
      {/* <Compiler /> */}
      {/* <ContestLogin /> */}
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <Router>
        <Navbar />
        <Cursor />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Regiter />} />
          <Route path="/contestlogin" element={<ContestLogin />} />
          <Route path="/contesthomepage" element={<ContestHomepage />} />
          <Route path="/add-question" element={<Addqueform />} />
          <Route path="/addquiz" element={<AddQuizForm />} />
          <Route path="/allquestions" element={<Allquestions />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/contestquiz" element={<ContestQuiz />} />

          {/* New Route for  */}
          <Route path="/code/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
