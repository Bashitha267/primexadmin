import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { AddEvent } from './pages/AddEvent';
import { AddGraphicDesign } from './pages/AddGraphicDesign';
import { AddWebProject } from './pages/AddWebProject';
import { Dashboard } from './pages/Dashboard';
import { Login } from './pages/Login';

function App() {
  return (
    <AuthProvider>
      <Router basename="/admin">
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-web-project"
      element={
        <ProtectedRoute>
          <AddWebProject />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-event"
      element={
        <ProtectedRoute>
          <AddEvent />
        </ProtectedRoute>
      }
    />
    <Route
      path="/add-graphic-design"
      element={
        <ProtectedRoute>
          <AddGraphicDesign />
        </ProtectedRoute>
      }
    />
  </Routes>
</Router>
    </AuthProvider>
  );
}

export default App;