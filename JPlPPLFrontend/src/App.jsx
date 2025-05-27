import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Componentes/ProtectedRoute/ProtectedRoute";

// Components (original names/paths)
import Navbar from "./Componentes/Navbar/Navbar";
import Cursor from "./Componentes/Cursor/Cursor";
import Footer from "./Componentes/Footers/Footer";
import "./Componentes/Cursor/Cursor.css";

// Pages (original names/paths)
import Homepage from "./Componentes/Homepage";
import ContactUs from "./Componentes/ContactUs/ContactUs";
import Regiter from "./Componentes/RegisterForm/Register";
import Guideline from "./Componentes/Guidelines/guideline";
import AdminLogin from "./Componentes/Admin/Adminlogin/Adminlogin";
import ContestLogin from "./Componentes/Contest/ContestLogin/Contestlogin";
import AdminHomepage from "./Componentes/Admin/AdminHome/Adminhomepage";
import Addqueform from "./Componentes/Admin/Addque/Addqueform";
import AddQuizForm from "./Componentes/Admin/AddQuiz/AddQuizForm";
import Allquestions from "./Componentes/Admin/ViewQue/AllQuestions";
import ParticipantsList from "./Componentes/Admin/Viewparticipant/viewparticipant";
import ContestHomepage from "./Componentes/Contest/ContestHome/ContestHomepage";
import ContestQuiz from "./Componentes/Contest/ContestQuiz/ContestQuiz";
import Guideline from "./Componentes/Guidelines/guideline";
import ParticipantsList from "./Componentes/Admin/Viewparticipant/viewparticipant";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Toaster position="top-center" />
      </div>
      <Router>
        <Navbar />
        <Cursor />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Regiter />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/contestlogin" element={<ContestLogin />} />
          <Route path="/contesthomepage" element={<ContestHomepage />} />
          <Route path="/add-question" element={<Addqueform />} />
          <Route path="/addquiz" element={<AddQuizForm />} />
          <Route path="/allquestions" element={<Allquestions />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhomepage" element={<AdminHomepage />} />
          <Route path="/contestquiz" element={<ContestQuiz />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/Participants" element={<ParticipantsList />} />
          {/* New Route for  */}
          <Route path="/code/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />

          {/* Fallback Route */}
          <Route path="*" element={<Homepage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;