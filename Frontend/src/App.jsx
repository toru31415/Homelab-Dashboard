import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import ProtectedRoute from './Components/Protected_Route.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}