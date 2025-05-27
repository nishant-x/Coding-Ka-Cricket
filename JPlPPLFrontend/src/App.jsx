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
import Analytics from "./Componentes/Admin/Analytics/Analytics";
import Home from "./CodeEditor/Home";
import EditorPage from "./CodeEditor/EditorPage";

const App = () => {
  return (
    <AuthProvider>
      <div>
        <Toaster position="top-center" />
      </div>
      <Router>
        <Navbar />
        {/* <Cursor /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/register" element={<Regiter />} />
          <Route path="/guideline" element={<Guideline />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/contestlogin" element={<ContestLogin />} />

          {/* Admin Protected Routes */}
          <Route 
            path="/adminhomepage" 
            element={
              <ProtectedRoute allowedRoles={['admin']} redirectTo="/adminlogin">
                <AdminHomepage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/allquestions" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Allquestions />
              </ProtectedRoute>
            } 
          />
          <Route
           path="/analytics" 
           element={
           <ProtectedRoute allowedRoles={['admin']}>
                <Analytics />
            </ProtectedRoute>} />
          <Route 
            path="/add-question" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Addqueform />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/addquiz" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AddQuizForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/Participants" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ParticipantsList />
              </ProtectedRoute>
            } 
          />

          {/* Contest Protected Routes */}
          <Route 
            path="/contesthomepage" 
            element={
              <ProtectedRoute allowedRoles={['user']} redirectTo="/contestlogin">
                <ContestHomepage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/contestquiz" 
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ContestQuiz />
              </ProtectedRoute>
            } 
          />

          {/* Code Editor Routes */}
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