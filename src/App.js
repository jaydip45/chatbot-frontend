import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ChatWidget from "./components/ChatWidget";
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminProtectedRoute from './admin/AdminProtectedRoute';

function App() {
   return (
      <Router>
         <Routes>
            {/* User chatbot main route */}
            <Route path="/" element={<ChatWidget />} />

            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
               path="/admin/*"
               element={
                  <AdminProtectedRoute>
                     <AdminDashboard />
                  </AdminProtectedRoute>
               }
            />

            {/* Redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" />} />
         </Routes>
      </Router>
   );
}

export default App;
